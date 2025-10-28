import React, { useState } from 'react';
import { 
  File, 
  Folder, 
  Plus, 
  Trash2, 
  Edit3, 
  FolderOpen,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  Info,
  FileCode2,
  Braces,
  Palette,
  Globe,
  FileJson,
  Image,
  FileText
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { Button } from './ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from './ui/Dialog';
import { Input } from './ui/Input';
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

interface FolderStructure {
  [key: string]: {
    type: 'folder';
    children: string[];
  } | {
    type: 'file';
  };
}

const FileExplorer: React.FC = () => {
  const { files, activeFile, setActiveFile, createFile, deleteFile, renameFile, currentProject } = useProject();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/src', '/public']));
  const [createInFolder, setCreateInFolder] = useState<string>('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      let path = newFileName.startsWith('/') ? newFileName : `/${newFileName}`;
      
      // If creating in a specific folder
      if (createInFolder) {
        path = `${createInFolder}/${newFileName}`;
      }
      
      createFile(path, '');
      setNewFileName('');
      setShowCreateModal(false);
      setCreateInFolder('');
      setActiveFile(path);
      
      // Auto-expand parent folders
      const parts = path.split('/').filter(Boolean);
      const newExpanded = new Set(expandedFolders);
      let currentPath = '';
      parts.slice(0, -1).forEach(part => {
        currentPath += '/' + part;
        newExpanded.add(currentPath);
      });
      setExpandedFolders(newExpanded);
    }
  };

  const openCreateModal = (folderPath?: string) => {
    setCreateInFolder(folderPath || '');
    setNewFileName('');
    setShowCreateModal(true);
  };

  const handleDeleteClick = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFileToDelete(path);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (fileToDelete) {
      deleteFile(fileToDelete);
      setFileToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const startRename = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingFile(path);
    setRenameValue(path.substring(1)); // Remove leading slash
  };

  const handleRename = (oldPath: string) => {
    if (renameValue.trim() && renameValue !== oldPath.substring(1)) {
      const newPath = renameValue.startsWith('/') ? renameValue : `/${renameValue}`;
      renameFile(oldPath, newPath);
    }
    setRenamingFile(null);
    setRenameValue('');
  };

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (fileName: string) => {
    // React/TypeScript files
    if (fileName.endsWith('.tsx')) {
      return <FileCode2 className="w-3.5 h-3.5 text-[#61dafb]" />;
    } else if (fileName.endsWith('.ts')) {
      return <FileCode2 className="w-3.5 h-3.5 text-[#3178c6]" />;
    } 
    // JavaScript files
    else if (fileName.endsWith('.jsx')) {
      return <FileCode2 className="w-3.5 h-3.5 text-[#f7df1e]" />;
    } else if (fileName.endsWith('.js')) {
      return <FileCode2 className="w-3.5 h-3.5 text-[#f7df1e]" />;
    }
    // Styles
    else if (fileName.endsWith('.css') || fileName.endsWith('.scss') || fileName.endsWith('.sass')) {
      return <Palette className="w-3.5 h-3.5 text-[#563d7c]" />;
    }
    // HTML
    else if (fileName.endsWith('.html')) {
      return <Globe className="w-3.5 h-3.5 text-[#e34c26]" />;
    }
    // JSON
    else if (fileName.endsWith('.json')) {
      return <Braces className="w-3.5 h-3.5 text-[#ffd700]" />;
    }
    // Config files
    else if (fileName === 'package.json' || fileName === 'tsconfig.json') {
      return <FileJson className="w-3.5 h-3.5 text-[#ffd700]" />;
    }
    // Images
    else if (fileName.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/i)) {
      return <Image className="w-3.5 h-3.5 text-[#a855f7]" />;
    }
    // Markdown
    else if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
      return <FileText className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />;
    }
    // Default
    return <File className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />;
  };

  // Build folder structure
  const buildFolderStructure = (): FolderStructure => {
    const structure: FolderStructure = {};
    
    // Filter out unwanted root-level files that should only be in /src
    const unwantedRootFiles = ['/App.tsx', '/index.tsx', '/styles.css'];
    const allFiles = Object.keys(files).filter(filePath => 
      !unwantedRootFiles.includes(filePath)
    );

    allFiles.forEach(filePath => {
      const parts = filePath.split('/').filter(Boolean);
      let currentPath = '';

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;
        currentPath += '/' + part;

        if (!structure[currentPath]) {
          if (isLast) {
            structure[currentPath] = { type: 'file' };
          } else {
            structure[currentPath] = { type: 'folder', children: [] };
          }
        }

        if (!isLast) {
          const item = structure[currentPath];
          if (item.type === 'folder') {
            const nextPath = currentPath + '/' + parts[index + 1];
            if (!item.children.includes(nextPath)) {
              item.children.push(nextPath);
            }
          }
        }
      });
    });

    return structure;
  };

  const structure = buildFolderStructure();
  
  // Filter out unwanted root-level files for display
  const unwantedRootFiles = ['/App.tsx', '/index.tsx', '/styles.css'];
  const visibleFiles = Object.keys(files).filter(filePath => 
    !unwantedRootFiles.includes(filePath)
  );
  
  const rootFolders = Object.keys(structure)
    .filter(path => path.split('/').filter(Boolean).length === 1)
    .sort();

  const renderFileTree = (path: string, level: number = 0): JSX.Element | null => {
    const item = structure[path];
    if (!item) return null;

    const fileName = path.split('/').filter(Boolean).pop() || '';
    const isExpanded = expandedFolders.has(path);

    if (item.type === 'folder') {
      return (
        <div key={path}>
          <div
            className="px-3 py-1.5 flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-950 group relative"
            style={{ paddingLeft: `${12 + level * 16}px` }}
          >
            <div className="flex items-center gap-1.5 flex-1" onClick={() => toggleFolder(path)}>
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-3.5 h-3.5 text-blue-500" />
              ) : (
                <Folder className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              )}
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                {fileName}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                openCreateModal(path);
              }}
              className="opacity-0 group-hover:opacity-100 h-6 w-6"
              title="New file in this folder"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          {isExpanded && item.children.map(childPath => renderFileTree(childPath, level + 1))}
        </div>
      );
    } else {
      // File
      if (renamingFile === path) {
        return (
          <div key={path} className="px-2 py-1 flex items-center gap-1" style={{ paddingLeft: `${12 + level * 16}px` }}>
            <input
              type="text"
              value={renameValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRenameValue(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') handleRename(path);
                if (e.key === 'Escape') {
                  setRenamingFile(null);
                  setRenameValue('');
                }
              }}
              className="flex-1 px-2 py-1 text-xs bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
              autoFocus
            />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRename(path)}
                      className="h-6 w-6"
                    >
                      <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setRenamingFile(null);
                        setRenameValue('');
                      }}
                      className="h-6 w-6"
                    >
                      <X className="w-3 h-3" />
                    </Button>
          </div>
        );
      }

      return (
        <div
          key={path}
          onClick={() => setActiveFile(path)}
          className={`px-3 py-1.5 flex items-center justify-between cursor-pointer group ${
            activeFile === path
              ? 'bg-gray-100 dark:bg-gray-900'
              : 'hover:bg-gray-50 dark:hover:bg-gray-950'
          }`}
          style={{ paddingLeft: `${28 + level * 16}px` }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getFileIcon(fileName)}
            <span className={`text-xs truncate ${
              activeFile === path
                ? 'text-gray-900 dark:text-white font-medium'
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              {fileName}
            </span>
          </div>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e: React.MouseEvent) => startRename(path, e)}
              className="h-6 w-6"
              title="Rename"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e: React.MouseEvent) => handleDeleteClick(path, e)}
              className="h-6 w-6 hover:text-red-600 dark:hover:text-red-400"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                {currentProject?.name || 'Project'}
              </h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openCreateModal()}
            className="h-7 w-7"
            title="New File"
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {visibleFiles.length === 0 ? (
          <div className="p-3 text-center text-gray-500 dark:text-gray-500 text-xs">
            No files yet
          </div>
        ) : (
          <div className="py-1">
            {rootFolders.map(folderPath => renderFileTree(folderPath))}
          </div>
        )}
      </div>

      {/* Create File Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {createInFolder ? `New File in ${createInFolder}` : 'New File'}
            </DialogTitle>
          </DialogHeader>
          
          <DialogBody className="space-y-4">
            {createInFolder && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-md">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-900 dark:text-blue-100">
                  Creating in: <span className="font-mono font-semibold">{createInFolder}</span>
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                File Name
              </label>
              <Input
                value={newFileName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFileName(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') handleCreateFile();
                }}
                placeholder={createInFolder ? "Component.tsx" : "src/Component.tsx"}
                autoFocus
              />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-800">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">💡 Tips:</p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                <li>Use <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">/</code> for nested paths: <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">components/Button.tsx</code></li>
                <li>Folders are created automatically</li>
                <li>Include file extension: .tsx, .ts, .css, .json</li>
              </ul>
            </div>
          </DialogBody>
          
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setShowCreateModal(false);
                setNewFileName('');
                setCreateInFolder('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFile}
              disabled={!newFileName.trim()}
            >
              Create File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={deleteDialogOpen} 
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setFileToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-mono font-semibold text-gray-900 dark:text-white">{fileToDelete}</span>?
              <br />
              <span className="text-red-600 dark:text-red-400">This action cannot be undone.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteDialogOpen(false);
              setFileToDelete(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FileExplorer;

