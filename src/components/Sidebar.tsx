import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  Search, 
  Plus,
  ChevronRight
} from 'lucide-react';
import { Project } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

// React Icon Component
const ReactIcon = ({ className }: { className?: string }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

interface SidebarProps {
  projects: Project[];
  onCreateProject: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ projects, onCreateProject }: SidebarProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project: Project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="w-64 h-screen flex flex-col bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
         
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            <span className='text-[#30b1e4]'>Cipher</span>
            Studio
          </span>
        </div>
        
          <Button 
            onClick={onCreateProject} 
            className="w-full text-white "
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2 " />
            <span className='mt-0.5'>New Project</span>
          </Button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="pl-9 h-8 text-sm"
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2 px-2">
            <Folder className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-semibold mt-0.5 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Your Projects
            </span>
            <Badge variant="secondary" className="ml-auto mt-0.5 text-xs">
              {projects.length}
            </Badge>
          </div>
          
          {sortedProjects.length === 0 ? (
            <div className="py-8 px-2 text-center">
              <Folder className="w-8 h-8 text-gray-300 dark:text-gray-700 mx-auto mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No projects found' : 'No projects yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
               {sortedProjects.map((project) => (
                 <button
                   key={project.id}
                   onClick={() => navigate(`/ide/${project.id}`)}
                   className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-left group"
                 >
                   <div className="flex-shrink-0 w-7 h-7 rounded bg-gradient-to-br from-[#61dafb] to-[#0088cc] flex items-center justify-center">
                     <ReactIcon  className="w-5 h-5 text-white" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="text-md font-medium text-gray-900 dark:text-white truncate">
                       {project.name}
                     </div>
                     
                   </div>
                   <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </button>
               ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
   
    </div>
  );
};

export default Sidebar;

