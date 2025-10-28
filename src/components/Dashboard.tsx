import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Folder, Trash2, Calendar, Moon, Sun, TrendingUp, AlertTriangle, LogOut, User } from 'lucide-react';
import { getAllProjects, deleteProject } from '../utils/storage';
import { Project } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../contexts/ProjectContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from './ui/Dialog';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { createNewProject } = useProject();

  const loadProjects = async () => {
    const allProjects = await getAllProjects();
    setProjects(Object.values(allProjects).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Get recent projects (most recent 6)
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  const displayProjects = showAllProjects ? projects : recentProjects;

  const handleCreateProject = async () => {
    if (projectName.trim()) {
      const project = await createNewProject(projectName, projectDescription);
      setShowCreateModal(false);
      setProjectName('');
      setProjectDescription('');
      navigate(`/ide/${project.id}`);
    }
  };

  const handleDeleteClick = (projectId: string, projectName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectToDelete({ id: projectId, name: projectName });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (projectToDelete) {
      await deleteProject(projectToDelete.id);
      loadProjects();
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setLogoutDialogOpen(false);
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <Sidebar 
        projects={projects} 
        onCreateProject={() => setShowCreateModal(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] h-14 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {showAllProjects ? 'All Projects' : 'Recent Projects'}
            </h1>
            {!showAllProjects && projects.length > 6 && (
              <Badge variant="secondary" className="text-xs">
                {projects.length - 6} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-900">
              <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {user?.name || user?.email}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 " />
              ) : (
                <Moon className="w-4 h-4 text-black" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogoutClick}
              title="Logout"
              className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
        {/* Projects Grid */}
        {displayProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4">
              <Folder className="w-8 h-8 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No projects yet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center max-w-sm">
              Get started by creating your first React project
            </p>
            <Button size="lg" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayProjects.map((project) => (
              <Card
                key={project.id}
                onClick={() => navigate(`/ide/${project.id}`)}
                className="group relative  hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[40px]">
                        {project.description || 'No description'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e: React.MouseEvent) => handleDeleteClick(project.id, project.name, e)}
                      className="ml-2 opacity-100 text-zinc-600 rounded hover:text-red-600 dark:text-white  dark:hover:text-red-500  "
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className='mt-0.5'>{formatRelativeTime(project.updatedAt)}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="w-[1px] h-full bg-gradient-to-b from-blue-100 via-blue-400 to-[#2cb1e4] duration-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom absolute right-0 top-0"></div>
              </Card>
              ))}
            </div>

            {/* View All/Less Button */}
            {projects.length > 6 && (
              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowAllProjects(!showAllProjects)}
                >
                  {showAllProjects ? 'Show Less' : `View All ${projects.length} Projects`}
                </Button>
              </div>
            )}
          </>
        )}
        </main>
      </div>

      {/* Create Project Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          
          <DialogBody className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Name
              </label>
              <Input
                value={projectName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
                placeholder="my-awesome-project"
                autoFocus
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                value={projectDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProjectDescription(e.target.value)}
                placeholder="What are you building?"
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-gray-950 dark:focus:ring-gray-300 resize-none transition-all placeholder:text-gray-500"
              />
            </div>
          </DialogBody>
          
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setShowCreateModal(false);
                setProjectName('');
                setProjectDescription('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateProject}
              disabled={!projectName.trim()}
            >
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500" />
              </div>
              <AlertDialogTitle>Delete Project</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">"{projectToDelete?.name}"</span>? This action cannot be undone. All files and code in this project will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Logout Confirmation Alert Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-orange-600 dark:text-orange-500" />
              </div>
              <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              Are you sure you want to logout? You'll need to sign in again to access your projects.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelLogout}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLogout} className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;

