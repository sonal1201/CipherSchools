import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Moon, Sun, CodeIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assest/chiperlogo.png';
import { Highlighter } from './ui/highlighter';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-[#0a0a0a] dark:to-gray-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={logo} alt="CipherStudio" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-black dark:text-white">
                <span className="text-[#30b1e4]">Cipher</span>Studio
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-white" />
                ) : (
                  <Moon className="w-5 h-5 text-black" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="hidden sm:inline-flex text-gray-900 dark:text-gray-100"
              >
                Sign In
              </Button>
              
              <Button
                onClick={() => navigate('/register')}
                className="bg-[#30b1e4] hover:bg-[#2091c4]"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Full Height */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center hover:scale-105 transition ease-in-out duration-300 gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-8">
              
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Browser-based React IDE
              </span>
              
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6">
              Code {""}
             <Highlighter action="highlight"   color="#87CEFA">
             React
              </Highlighter> 
              {" "}
               Apps
              <br />
              <span className="bg-gradient-to-r from-[#30b1e4] to-[#1e8bb8] bg-clip-text text-transparent">
                In Your Browser
               
                 
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10">
              Build, preview, and share React applications instantly. No installation required. 
              Start coding in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-[#30b1e4] hover:bg-[#2091c4] text-white px-8 py-6 text-lg group"
              >
                Start Coding Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
            
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Landing;

