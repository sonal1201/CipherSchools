// Clear old localStorage projects when switching to MongoDB
export const clearOldLocalStorageProjects = () => {
  const PROJECTS_KEY = 'cipherstudio_projects';
  
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (data) {
      const projects = JSON.parse(data);
      
      // Check if any project has old timestamp IDs
      const hasOldProjects = Object.keys(projects).some(id => {
        // Old IDs are timestamps (13 digits), MongoDB IDs are 24 hex chars
        return !/^[0-9a-fA-F]{24}$/.test(id);
      });
      
      if (hasOldProjects) {
        console.log('Clearing old localStorage projects...');
        localStorage.removeItem(PROJECTS_KEY);
      }
    }
  } catch (error) {
    console.error('Error clearing old projects:', error);
  }
};

