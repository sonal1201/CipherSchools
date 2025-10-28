import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project } from '../types';
import { saveProject, getProject } from '../utils/storage';
import { getDefaultFiles } from '../utils/defaultFiles';

interface ProjectContextType {
  currentProject: Project | null;
  files: Record<string, string>;
  activeFile: string;
  setActiveFile: (path: string) => void;
  updateFile: (path: string, content: string) => void;
  createFile: (path: string, content?: string) => void;
  deleteFile: (path: string) => void;
  renameFile: (oldPath: string, newPath: string) => void;
  loadProject: (projectId: string) => Promise<void>;
  createNewProject: (name: string, description: string) => Promise<Project>;
  saveCurrentProject: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL;

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [activeFile, setActiveFile] = useState<string>('/src/App.tsx');

  const updateFile = (path: string, content: string) => {
    setFiles(prev => ({ ...prev, [path]: content }));
  };

  const createFile = (path: string, content: string = '') => {
    setFiles(prev => ({ ...prev, [path]: content }));
  };

  const deleteFile = (path: string) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[path];
      return newFiles;
    });
    
    if (activeFile === path) {
      const remainingFiles = Object.keys(files).filter(f => f !== path);
      setActiveFile(remainingFiles[0] || '');
    }
  };

  const renameFile = (oldPath: string, newPath: string) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      newFiles[newPath] = newFiles[oldPath];
      delete newFiles[oldPath];
      return newFiles;
    });
    
    if (activeFile === oldPath) {
      setActiveFile(newPath);
    }
  };

  const loadProject = async (projectId: string) => {
    const project = await getProject(projectId);
    if (project) {
      setCurrentProject(project);
      setFiles(project.files);
      const firstFile = Object.keys(project.files).find(f => f.includes('App.tsx')) || Object.keys(project.files)[0];
      setActiveFile(firstFile || '/src/App.tsx');
    }
  };

  const createNewProject = async (name: string, description: string): Promise<Project> => {
    try {
      // Create project directly in MongoDB via API
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name,
          description,
          files: getDefaultFiles()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const { project } = await response.json();
      
      setCurrentProject(project);
      setFiles(project.files);
      setActiveFile('/src/App.tsx');
      
      return project;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  };

  const saveCurrentProject = async () => {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        files,
        updatedAt: new Date().toISOString(),
      };
      setCurrentProject(updatedProject);
      await saveProject(updatedProject);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    if (currentProject) {
      const timer = setTimeout(async () => {
        const updatedProject = {
          ...currentProject,
          files,
          updatedAt: new Date().toISOString(),
        };
        await saveProject(updatedProject);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [files, currentProject]);

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        files,
        activeFile,
        setActiveFile,
        updateFile,
        createFile,
        deleteFile,
        renameFile,
        loadProject,
        createNewProject,
        saveCurrentProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

