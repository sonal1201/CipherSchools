import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg mx-4">
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <div 
      className={`relative bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg animate-scale-in ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export const DialogHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 px-6 py-4 border-b border-gray-200 dark:border-gray-800 ${className}`}>
      {children}
    </div>
  );
};

export const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 dark:text-gray-50 ${className}`}>
      {children}
    </h2>
  );
};

export const DialogDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      {children}
    </p>
  );
};

export const DialogBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export const DialogFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-200 dark:border-gray-800 ${className}`}>
      {children}
    </div>
  );
};

export const DialogClose: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none dark:ring-offset-gray-950 dark:focus:ring-gray-300"
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
};

