import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Settings,
  Moon,
  Sun,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';
import { 
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack
} from '@codesandbox/sandpack-react';
import { useProject } from '../contexts/ProjectContext';
import { useTheme } from '../contexts/ThemeContext';
import FileExplorer from './FileExplorer';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Separator } from './ui/Separator';
import { Spinner } from './ui/Spinner';

// Component that syncs Sandpack file changes with our state in real-time
const FileSync: React.FC = () => {
  const { sandpack } = useSandpack();
  const { updateFile } = useProject();
  const lastSyncRef = useRef<Record<string, string>>({});

  useEffect(() => {
    // Set up real-time file synchronization
    const syncInterval = setInterval(() => {
      const files = sandpack.files;
      Object.entries(files).forEach(([path, file]) => {
        const content = typeof file === 'string' ? file : file.code;
        
        // Only update if content has changed
        if (content !== undefined && lastSyncRef.current[path] !== content) {
          lastSyncRef.current[path] = content;
          updateFile(path, content);
        }
      });
    }, 500); // Sync every 500ms for smooth real-time updates

    return () => clearInterval(syncInterval);
  }, [sandpack, updateFile]);

  return null;
};

const IDE: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { 
    currentProject, 
    files, 
    activeFile,
    loadProject, 
    saveCurrentProject,
    setActiveFile 
  } = useProject();
  const { theme, toggleTheme, autoSave, toggleAutoSave } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openTabs, setOpenTabs] = useState<string[]>([]);

  // Filter out unwanted root-level files
  const unwantedRootFiles = ['/App.tsx', '/index.tsx', '/styles.css'];

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      loadProject(projectId);
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [projectId]);

  // Initialize open tabs with the active file
  useEffect(() => {
    if (activeFile && !openTabs.includes(activeFile) && !unwantedRootFiles.includes(activeFile)) {
      setOpenTabs([...openTabs, activeFile]);
    }
  }, [activeFile]);

  // Function to close a tab
  const handleCloseTab = (filePath: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab !== filePath);
    setOpenTabs(newTabs);
    
    // If closing the active tab, switch to another tab
    if (filePath === activeFile && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1]);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (window.innerWidth >= 768) {
        setShowFileExplorer(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSave = () => {
    saveCurrentProject();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Filter files for Sandpack
  const filteredFiles = Object.keys(files).reduce((acc, filePath) => {
    if (!unwantedRootFiles.includes(filePath)) {
      acc[filePath] = files[filePath];
    }
    return acc;
  }, {} as typeof files);

  if (!currentProject || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 font-medium">Loading your project...</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Getting everything ready</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#0a0a0a]">
      {/* Header - CodeSandbox style */}
      <header className="border-b border-gray-200 dark:border-gray-800 px-4 h-14 flex items-center justify-between z-10 bg-white dark:bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFileExplorer(!showFileExplorer)}
              className="md:hidden"
            >
              {showFileExplorer ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          )}
          
          <div className="flex items-center gap-2">
           
            <div>
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            <span className='text-[#30b1e4]'>Cipher</span>
            Studio
          </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <Badge variant="secondary" className="text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1 " />
              <span className='mt-0.5'>Saved</span>
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            title="Save Project"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline ml-1.5 mt-0.5">Save</span>
          </Button>
          
          <Separator orientation="vertical" className="h-5" />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            title="Settings"
          >
            <Settings className={`w-4 h-4 transition-transform ${showSettings ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-3 animate-slide-in">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={toggleAutoSave}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-black dark:peer-checked:bg-white transition-all"></div>
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white dark:bg-gray-900 rounded-full transition-transform peer-checked:translate-x-4"></div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Auto-save
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Saves every 2 seconds
                </p>
              </div>
            </label>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Main IDE Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer - Mobile Overlay */}
        {isMobile && showFileExplorer && (
          <div className="absolute inset-0 z-20 bg-black bg-opacity-50">
            <div className="w-64 h-full bg-white dark:bg-dark-900">
              <FileExplorer />
            </div>
          </div>
        )}
        
        {/* File Explorer - Desktop */}
        {(!isMobile || showFileExplorer) && (
          <div className={`${isMobile ? 'hidden' : 'w-64'} flex-shrink-0`}>
            <FileExplorer />
          </div>
        )}

        {/* Sandpack Editor & Preview */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Custom Tab Bar */}
          {openTabs.length > 0 && (
            <div className="flex items-center bg-gray-50 dark:bg-[#111] border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
              {openTabs.map((tabPath) => (
                <div
                  key={tabPath}
                  onClick={() => setActiveFile(tabPath)}
                  className={`
                    group flex items-center gap-2 px-3 py-2 text-sm cursor-pointer border-r border-gray-200 dark:border-gray-800 whitespace-nowrap
                    ${activeFile === tabPath 
                      ? 'bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }
                  `}
                >
                  <span className="text-xs">
                    {tabPath.split('/').pop()}
                  </span>
                  <button
                    onClick={(e) => handleCloseTab(tabPath, e)}
                    className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-0.5 transition-opacity"
                    title="Close"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <SandpackProvider
            template="react-ts"
            theme={theme === 'dark' ? 'dark' : 'light'}
            files={filteredFiles}
            options={{
              activeFile: activeFile,
              autoReload: true,
              recompileMode: 'immediate',
              recompileDelay: 0,
            }}
            customSetup={{
              dependencies: {
                'react': '^18.2.0',
                'react-dom': '^18.2.0',
              },
            }}
          >
            <SandpackLayout>
              <SandpackCodeEditor 
                showLineNumbers
                showInlineErrors
                wrapContent
                style={{ height: '100%' }}
              />
              <SandpackPreview 
                showOpenInCodeSandbox={false}
                showRefreshButton
                showRestartButton={false}
                style={{ height: '100%' }}
              />
            </SandpackLayout>
            <FileSync />
          </SandpackProvider>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] px-4 h-8 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <Badge variant="secondary" className="text-xs py-0 h-5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
            Live
          </Badge>
          {autoSave && (
            <Badge variant="outline" className="text-xs py-0 h-5">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse mr-1.5"></div>
              Auto-save
            </Badge>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default IDE;


