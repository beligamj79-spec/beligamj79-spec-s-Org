import React from 'react';
import { Icons } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex h-screen w-full font-display bg-background-dark text-white overflow-hidden selection:bg-primary selection:text-white">
      {/* Sidebar */}
      <aside className="w-16 md:w-20 flex flex-col items-center py-6 border-r border-border-dark bg-[#121d21] z-20">
        <div className="mb-10 text-primary">
          <Icons.Shield size={32} strokeWidth={2.5} />
        </div>
        
        <nav className="flex flex-col gap-8 flex-1 w-full px-2">
          <NavItem 
            icon={<Icons.Dashboard size={24} />} 
            isActive={activeTab === 'dashboard'} 
            onClick={() => onTabChange('dashboard')}
            tooltip="Dashboard"
          />
          <NavItem 
            icon={<Icons.Logs size={24} />} 
            isActive={activeTab === 'logs'} 
            onClick={() => onTabChange('logs')}
            tooltip="Security Logs"
          />
          <NavItem 
            icon={<Icons.Neural size={24} />} 
            isActive={activeTab === 'neural'} 
            onClick={() => onTabChange('neural')}
            tooltip="Neural Engine"
          />
          <NavItem 
            icon={<Icons.Settings size={24} />} 
            isActive={activeTab === 'settings'} 
            onClick={() => onTabChange('settings')}
            tooltip="Settings"
          />
        </nav>

        <div className="mt-auto">
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 p-0.5 overflow-hidden hover:border-primary transition-colors cursor-pointer">
            <img 
              className="rounded-full w-full h-full object-cover" 
              src="https://picsum.photos/100/100" 
              alt="User" 
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  tooltip: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, isActive, onClick, tooltip }) => (
  <button
    onClick={onClick}
    title={tooltip}
    className={`
      flex items-center justify-center p-3 rounded-lg w-full transition-all duration-300 group relative
      ${isActive 
        ? 'bg-primary/10 text-primary digital-glow' 
        : 'text-[#97b9c4] hover:text-white hover:bg-white/5'
      }
    `}
  >
    {icon}
    {isActive && (
      <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full" />
    )}
  </button>
);
