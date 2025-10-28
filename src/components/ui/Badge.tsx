import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className = '' 
}) => {
  const variants = {
    default: 'bg-black text-white dark:bg-white dark:text-black',
    secondary: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
    destructive: 'bg-red-600 text-white dark:bg-red-700',
    outline: 'border border-gray-200 dark:border-gray-800',
  };

  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

