import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SecurityLogs } from './components/SecurityLogs';
import { NeuralEngine } from './components/NeuralEngine';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'logs' && <SecurityLogs />}
      {activeTab === 'neural' && <NeuralEngine />}
      {activeTab === 'settings' && (
        <div className="flex items-center justify-center h-full text-[#97b9c4] flex-col gap-4">
          <div className="p-8 border border-border-dark rounded-lg bg-surface-dark text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Settings Module Locked</h2>
            <p>Access requires Administrator Privileges (Level 5).</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
