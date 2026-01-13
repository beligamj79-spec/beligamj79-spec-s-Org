import React from 'react';
import { Icons } from './Icons';
import { Metric, TrafficItem } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const metrics: Metric[] = [
  { label: 'Packets Analyzed', value: '1,240,582', change: '+12%', trend: 'up', color: 'accent-green', percent: 75 },
  { label: 'Threats Detected', value: '42', change: '+5%', trend: 'up', color: 'accent-red', percent: 25 },
  { label: 'Detection Accuracy', value: '99.8%', change: 'STABLE', trend: 'stable', color: 'primary', percent: 99 },
  { label: 'Active Alerts', value: '12', change: '+2 New', trend: 'up', color: 'accent-amber', percent: 40 },
];

const trafficData: TrafficItem[] = [
  { timestamp: '14:02:45', source: '192.168.1.104', destination: '10.0.0.5', protocol: 'TCP', confidence: 98 },
  { timestamp: '14:02:42', source: '172.16.254.1', destination: '192.168.1.45', protocol: 'HTTP', confidence: 99 },
  { timestamp: '14:02:40', source: '192.168.1.45', destination: 'INTERNAL_CORE', protocol: 'SQL', confidence: 95 },
  { timestamp: '14:02:38', source: '10.0.0.12', destination: '192.168.1.104', protocol: 'UDP', confidence: 88 },
];

const donutData = [
  { name: 'Normal', value: 84.2, color: '#1b7898' },
  { name: 'SQL Injections', value: 9.1, color: '#fa5f38' },
  { name: 'Nmap Scans', value: 6.7, color: '#f59e0b' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="h-16 border-b border-border-dark flex items-center justify-between px-8 bg-background-light dark:bg-background-dark shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse shadow-[0_0_8px_#0bda57]"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-green">System Status: SECURE</span>
          </div>
          <div className="h-4 w-px bg-border-dark"></div>
          <div className="flex gap-4 text-[10px] uppercase tracking-tighter text-[#97b9c4]">
            <div className="flex flex-col">
              <span>CPU Usage</span>
              <span className="text-white font-mono">14%</span>
            </div>
            <div className="flex flex-col">
              <span>RAM Load</span>
              <span className="text-white font-mono">2.4GB</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-[#97b9c4] uppercase">Current Timestamp</p>
            <p className="text-sm font-bold tracking-tight font-mono">2023-10-27 14:02:45</p>
          </div>
          <button className="w-10 h-10 flex items-center justify-center bg-surface-dark border border-border-dark rounded-lg hover:border-primary transition-colors text-white">
            <Icons.Bell size={18} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="bg-surface-dark border border-border-dark p-6 rounded-lg relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icons.Analytics size={48} />
              </div>
              <p className="text-sm font-medium text-[#97b9c4] mb-1">{m.label}</p>
              <h3 className={`text-3xl font-bold tracking-tight mb-2 ${
                m.color === 'accent-red' ? 'text-accent-red' : 
                m.color === 'accent-green' ? 'text-accent-green' : 
                m.color === 'accent-amber' ? 'text-accent-amber' : 'text-white'
              }`}>{m.value}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${
                  m.color === 'accent-red' ? 'text-accent-red' : 
                  m.color === 'accent-green' ? 'text-accent-green' : 
                  m.color === 'accent-amber' ? 'text-accent-amber' : 'text-[#97b9c4]'
                }`}>{m.change}</span>
                <div className="h-1 flex-1 bg-border-dark rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      m.color === 'accent-red' ? 'bg-accent-red' : 
                      m.color === 'accent-green' ? 'bg-accent-green' : 
                      m.color === 'accent-amber' ? 'bg-accent-amber' : 'bg-primary'
                    }`} 
                    style={{ width: `${m.percent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[420px]">
          {/* Traffic Table */}
          <div className="lg:col-span-2 bg-surface-dark border border-border-dark rounded-lg flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-border-dark flex justify-between items-center bg-[#1f252c]">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Icons.Router className="text-primary" size={20} />
                Network Traffic Stream
              </h2>
              <span className="px-2 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded animate-pulse">LIVE FEED</span>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#1f252c] border-b border-border-dark z-10">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold uppercase text-[#97b9c4] tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase text-[#97b9c4] tracking-wider">Source IP</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase text-[#97b9c4] tracking-wider">Destination IP</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase text-[#97b9c4] tracking-wider text-center">Protocol</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase text-[#97b9c4] tracking-wider">AI Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark/50">
                  {trafficData.map((item, i) => (
                    <tr key={i} className={`hover:bg-primary/5 transition-colors group ${item.protocol === 'SQL' ? 'bg-accent-red/5' : ''}`}>
                      <td className="px-6 py-4 text-xs font-mono text-[#97b9c4]">{item.timestamp}</td>
                      <td className="px-6 py-4 text-sm font-medium font-mono">{item.source}</td>
                      <td className={`px-6 py-4 text-sm font-medium font-mono ${item.destination === 'INTERNAL_CORE' ? 'text-accent-red' : ''}`}>{item.destination}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase border ${
                          item.protocol === 'SQL' ? 'bg-accent-red/20 text-accent-red border-accent-red/30' : 
                          item.protocol === 'HTTP' ? 'bg-border-dark text-[#97b9c4] border-transparent' :
                          'bg-border-dark text-[#97b9c4] border-transparent'
                        }`}>
                          {item.protocol}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1 bg-border-dark rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${item.protocol === 'SQL' ? 'bg-accent-red' : 'bg-primary'}`} 
                              style={{ width: `${item.confidence}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-bold ${item.protocol === 'SQL' ? 'text-accent-red' : 'text-white'}`}>{item.confidence}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Classification Donut */}
          <div className="bg-surface-dark border border-border-dark rounded-lg flex flex-col p-6">
            <h2 className="text-lg font-bold mb-4 text-white">Threat Classification</h2>
            <div className="flex-1 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#1f252c', borderColor: '#375762', color: '#fff' }}
                     itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-white">84%</span>
                <span className="text-[10px] text-[#97b9c4] uppercase font-bold tracking-widest">Normal</span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
               {donutData.map((d, i) => (
                 <div key={i} className="flex items-center justify-between text-xs">
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                     <span className="text-[#97b9c4]">{d.name}</span>
                   </div>
                   <span className="font-bold text-white">{d.value}%</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Alert Journal */}
        <div className="bg-surface-dark border border-border-dark rounded-lg">
           <div className="px-6 py-4 border-b border-border-dark flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Icons.Alert className="text-accent-red" size={20} />
                Security Alert Journal
              </h2>
              <button className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Export Logs</button>
           </div>
           
           <div className="divide-y divide-border-dark/50">
              <AlertItem 
                severity="Critical" 
                title="SQLmap Injection Attempt" 
                time="14:02:30"
                description={<>High-confidence SQL injection payload detected from <span className="text-white font-mono">192.168.1.45</span> targeted at endpoint <span className="text-primary font-mono">/api/v1/users</span>.</>}
                actions={true}
              />
              <AlertItem 
                severity="High" 
                title="Nmap Stealth Scan (SYN)" 
                time="13:58:12"
                description={<>Sequential port probing detected across range <span className="text-white font-mono">80-443, 8080</span>. Source: <span className="text-white font-mono">172.16.254.1</span>.</>}
                actions={false}
              />
              <AlertItem 
                severity="Medium" 
                title="Unusual Outbound Traffic" 
                time="13:45:05"
                description={<>Workstation <span className="text-white font-mono">192.168.1.104</span> initiating 50+ concurrent connections to unknown external IP.</>}
                actions={false}
              />
           </div>
        </div>

      </div>
    </div>
  );
};

const AlertItem: React.FC<{severity: string, title: string, time: string, description: React.ReactNode, actions: boolean}> = ({ severity, title, time, description, actions }) => {
  const colorClass = severity === 'Critical' ? 'accent-red' : severity === 'High' ? 'accent-amber' : 'primary';
  const bgClass = severity === 'Critical' ? 'bg-accent-red' : severity === 'High' ? 'bg-accent-amber' : 'bg-primary';
  const textClass = severity === 'Critical' ? 'text-accent-red' : severity === 'High' ? 'text-accent-amber' : 'text-primary';
  
  return (
    <div className="p-6 flex gap-6 hover:bg-white/5 transition-colors group">
      <div className="flex flex-col items-center gap-2">
        <div className={`w-10 h-10 ${severity === 'Critical' ? 'bg-accent-red/20 critical-glow' : `bg-${colorClass}/20`} border border-${colorClass} rounded-lg flex items-center justify-center ${textClass}`}>
           {severity === 'Critical' ? <Icons.Alert size={20} /> : <Icons.Target size={20} />}
        </div>
        <div className="h-full w-px bg-border-dark group-last:hidden"></div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
           <div>
             <span className={`px-2 py-0.5 ${bgClass} ${severity === 'High' ? 'text-black' : 'text-white'} text-[10px] font-bold rounded uppercase tracking-tighter`}>{severity}</span>
             <h4 className="text-md font-bold mt-1 text-white">{title}</h4>
           </div>
           <span className="text-xs text-[#97b9c4] font-mono">{time}</span>
        </div>
        <p className="text-sm text-[#97b9c4] leading-relaxed max-w-3xl mb-2">{description}</p>
        
        {actions && (
          <div className="mt-3 flex gap-3">
             <button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded hover:opacity-90">ISOLATE SOURCE</button>
             <button className="px-4 py-1.5 border border-border-dark text-white text-xs font-bold rounded hover:bg-border-dark">VIEW PAYLOAD</button>
          </div>
        )}
      </div>
    </div>
  );
}
