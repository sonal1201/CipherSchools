import axios from 'axios';
import { Project, AppSettings } from '../types';

// Backend API URL - update this for production deployment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SETTINGS_KEY = 'cipherstudio_settings';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Project Storage - Now using backend API
export const saveProject = async (project: Project): Promise<void> => {
  try {
    // Check if it's a MongoDB ObjectID (24 hex characters)
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(project.id);
    
    if (isMongoId) {
      // MongoDB ID - existing project, update it
      await axios.put(`${API_URL}/projects/${project.id}`, {
        name: project.name,
        description: project.description,
        files: project.files,
      }, { headers: getAuthHeaders() });
    } else {
      // New project - create it in MongoDB
      await axios.post(`${API_URL}/projects`, {
        name: project.name,
        description: project.description,
        files: project.files,
      }, { headers: getAuthHeaders() });
    }
  } catch (error) {
    console.error('Failed to save project:', error);
    throw error;
  }
};

export const getProject = async (projectId: string): Promise<Project | null> => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`, { 
      headers: getAuthHeaders() 
    });
    return response.data.project;
  } catch (error) {
    console.error('Failed to get project:', error);
    return null;
  }
};

export const getAllProjects = async (): Promise<Record<string, Project>> => {
  try {
    const response = await axios.get(`${API_URL}/projects`, { 
      headers: getAuthHeaders() 
    });
    const projects = response.data.projects;
    
    // Convert array to record for backward compatibility
    const projectsRecord: Record<string, Project> = {};
    projects.forEach((project: Project) => {
      projectsRecord[project.id] = project;
    });
    
    return projectsRecord;
  } catch (error) {
    console.error('Failed to get all projects:', error);
    return {};
  }
};

export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/projects/${projectId}`, { 
      headers: getAuthHeaders() 
    });
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw error;
  }
};

// Settings Storage - Still using localStorage (user-specific settings)
export const saveSettings = (settings: AppSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const getSettings = (): AppSettings => {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : {
    theme: 'dark',
    autoSave: true,
    autoSaveInterval: 3000,
  };
};

