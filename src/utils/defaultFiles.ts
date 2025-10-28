export const getDefaultFiles = () => ({
  '/src/App.tsx': `import React, { useState } from 'react';
import './styles.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Welcome to CipherStudio Counter</h1>

        <p className="count">{count}</p>

        <div className="button-row">
          <button onClick={() => setCount(prev => prev + 1)}>
            +
          </button>

          <button onClick={() => setCount(prev => prev - 1)}>
            –
          </button>

          <button className="reset" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;`,

  '/src/styles.css': `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body {
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.app {
  text-align: center;
}

.card {
  background: #eaf3ff;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
  width: 500px;
}

.title {
  color: #0066ff;
  font-size: 1.7rem;
  margin-bottom: 1.4rem;
}

.count {
  font-size: 3.4rem;
  font-weight: bold;
  color: #0044cc;
  margin-bottom: 1.4rem;
  transition: transform 0.2s ease-in-out;
}

.count:active {
  transform: scale(1.1);
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  padding: 12px;
  font-size: 1.2rem;
  background: #0066ff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.07);
}

.reset {
  background: #ff4c4c;
}
`,

  '/src/index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

  '/public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CipherStudio App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,

  '/package.json': `{
  "name": "cipherstudio-app",
  "version": "1.0.0",
  "main": "src/index.tsx",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}`,

  '/tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}`
});
