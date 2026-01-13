import React, { useState } from 'react';
import { Icons } from './Icons';
import { LogEntry } from '../types';

// Mock Data
const logData: LogEntry[] = [
  { id: '1', timestamp: '2023-10-24 14:22:01.403', sourceIp: '192.168.1.105', targetIp: '10.0.0.12', type: 'SQL Injection', severity: 'Critical', confidence: 98, status: 'Blocked', payload: "id=1' OR '1'='1", method: "POST", uri: "/api/v1/user/search", location: "Internal" },
  { id: '2', timestamp: '2023-10-24 14:21:55.210', sourceIp: '45.12.33.10', targetIp: '192.168.1.40', type: 'Nmap Scan', severity: 'High', confidence: 92, status: 'Logged', location: "External" },
  { id: '3', timestamp: '2023-10-24 14:20:12.888', sourceIp: '10.0.0.42', targetIp: '10.0.0.1', type: 'Brute Force', severity: 'Medium', confidence: 85, status: 'Flagged', location: "Internal" },
  { id: '4', timestamp: '2023-10-24 14:18:44.002', sourceIp: '172.16.254.1', targetIp: '192.168.1.5', type: 'DDoS Attempt', severity: 'Critical', confidence: 95, status: 'Blocked', location: "DMZ" },
  { id: '5', timestamp: '2023-10-24 14:15:30.112', sourceIp: '192.168.1.112', targetIp: '192.168.1.20', type: 'Anomaly', severity: 'Low', confidence: 72, status: 'Monitoring', location: "Internal" },
];

export const SecurityLogs: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(logData[0]);

  return (
    <div className="flex h-full relative">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="p-8 pb-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Security Incident Logs & Analysis</h2>
              <p className="text-slate-400 max-w-2xl">Real-time threat detection and AI classification based on Zeek network logs for academic research.</p>
            </div>
            <div className="flex gap-2 bg-panel-dark p-1 rounded-lg border border-border-dark">
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white bg-primary rounded">Live Feed</button>
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Archived</button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap gap-3 items-center">
            <FilterButton icon={<Icons.Logs size={18} />} label="Last 24 Hours" />
            <FilterButton icon={<Icons.Target size={18} />} label="Attack: Nmap, SQLi" highlight />
            <FilterButton icon={<Icons.Alert size={18} />} label="Severity: Critical / High" warning />
            
            <div className="ml-auto flex items-center gap-4">
              <div className="h-10 w-px bg-border-dark"></div>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-5 py-2 rounded font-bold text-sm transition-all shadow-lg shadow-primary/10">
                <Icons.Download size={16} />
                Export Logs
              </button>
            </div>
          </div>
        </header>

        {/* Log Table */}
        <div className="flex-1 p-8 pt-4 overflow-auto">
          <div className="bg-panel-dark border border-border-dark rounded-xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1c2c31]/50 border-b border-border-dark">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Timestamp</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Source IP</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Traffic Trend</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Attack Type</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-center">AI Confidence</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark/50">
                {logData.map((log) => (
                  <tr 
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`
                      cursor-pointer transition-all group
                      ${selectedLog?.id === log.id 
                        ? 'bg-primary/10 border-l-4 border-l-primary digital-glow' 
                        : 'hover:bg-primary/5 border-l-4 border-l-transparent'}
                    `}
                  >
                    <td className="px-6 py-5 font-mono text-xs text-slate-400">{log.timestamp}</td>
                    <td className="px-6 py-5 font-mono text-sm text-white">{log.sourceIp}</td>
                    <td className="px-6 py-5">
                      {/* Fake Sparkline SVG */}
                      <div className="w-20 h-6">
                         <svg className="w-full h-full fill-none stroke-2" viewBox="0 0 100 30">
                           <path 
                             d={generateSparklinePath(log.id)} 
                             className={selectedLog?.id === log.id ? 'stroke-primary' : 'stroke-slate-600'} 
                           />
                         </svg>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold border ${
                         log.type === 'SQL Injection' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                         log.type === 'Nmap Scan' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                         log.type === 'Brute Force' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                         'bg-blue-500/10 text-blue-500 border-blue-500/20'
                       }`}>
                         {log.type}
                       </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-16 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: `${log.confidence}%` }}></div>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">{log.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="flex items-center gap-2 text-xs font-bold text-slate-300">
                        <span className={`w-2 h-2 rounded-full ${log.status === 'Blocked' ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`}></span>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Icons.ChevronRight size={16} className={`${selectedLog?.id === log.id ? 'text-primary' : 'text-slate-600'} group-hover:translate-x-1 transition-transform`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedLog && (
        <aside className="w-[400px] bg-background-dark border-l border-border-dark flex flex-col z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
           <div className="p-6 border-b border-border-dark flex justify-between items-center bg-[#15181b]">
             <div className="flex items-center gap-2">
               <Icons.Alert size={18} className="text-red-500" />
               <h3 className="font-bold text-white uppercase tracking-wider text-sm">Incident Detail</h3>
             </div>
             <button onClick={() => setSelectedLog(null)} className="p-1 hover:bg-slate-700 rounded-full transition-colors">
               <Icons.Close size={18} className="text-slate-400" />
             </button>
           </div>

           <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
              {/* Summary */}
              <div className="bg-panel-dark/50 border border-border-dark p-5 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Source Identifier</p>
                    <p className="font-mono text-xl text-white">{selectedLog.sourceIp}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Threat Level</p>
                    <p className="text-sm font-bold text-white uppercase">{selectedLog.severity}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t border-border-dark/50">
                   <div className="flex justify-between text-xs">
                     <span className="text-slate-400">Target IP</span>
                     <span className="text-white font-mono">{selectedLog.targetIp}</span>
                   </div>
                   <div className="flex justify-between text-xs">
                     <span className="text-slate-400">Method</span>
                     <span className="text-white font-mono">{selectedLog.method || 'N/A'}</span>
                   </div>
                </div>
              </div>

              {/* Code Snippet */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <Icons.Terminal size={14} /> Raw Zeek Log Snippet
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">http.log</span>
                </div>
                <div className="bg-[#0b0d0e] p-4 rounded border border-border-dark/50 overflow-x-auto">
                  <pre className="font-mono text-[11px] leading-relaxed text-emerald-500/80">
{`{
  "ts": ${selectedLog.timestamp},
  "uid": "CH861s1p69JpY6CDej",
  "id.orig_h": "${selectedLog.sourceIp}",
  "id.resp_h": "${selectedLog.targetIp}",
  "method": "${selectedLog.method || 'TCP'}",
  "uri": "${selectedLog.uri || 'N/A'}",
  "payload": "${selectedLog.payload || 'ENCRYPTED'}",
  "status_code": 200
}`}
                  </pre>
                </div>
              </div>

              {/* AI Reasoning */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-3">
                  <Icons.Brain size={14} className="text-primary" /> AI Classification Reasoning
                </h4>
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                  <ul className="text-sm text-slate-300 space-y-3">
                    <li className="flex gap-2">
                       <Icons.Check size={16} className="text-primary mt-0.5" />
                       <span>High confidence based on signature matching and behavioral heuristic analysis.</span>
                    </li>
                    <li className="flex gap-2">
                       <Icons.Check size={16} className="text-primary mt-0.5" />
                       <span>Source IP geolocation correlates with known botnet subnets.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
               <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <Icons.Zap size={14} /> Recommended Response
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center gap-2 p-4 rounded border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 transition-colors">
                      <Icons.Lock className="text-red-500" size={24} />
                      <span className="text-xs font-bold text-white uppercase">Isolate Source</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 rounded border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
                      <Icons.Eye className="text-primary" size={24} />
                      <span className="text-xs font-bold text-white uppercase">Reinforce Watch</span>
                    </button>
                  </div>
               </div>
           </div>

           <div className="p-6 border-t border-border-dark flex gap-3 bg-[#15181b]">
             <button className="flex-1 bg-primary text-white font-bold py-3 rounded-lg text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors">Full Forensics</button>
             <button className="px-4 bg-panel-dark border border-border-dark text-slate-400 hover:text-white rounded-lg transition-colors">
               <Icons.Share size={20} />
             </button>
           </div>
        </aside>
      )}
    </div>
  );
};

const FilterButton = ({ icon, label, highlight, warning }: {icon: React.ReactNode, label: string, highlight?: boolean, warning?: boolean}) => (
  <div className={`
    flex items-center gap-2 bg-panel-dark border px-3 py-2 rounded group cursor-pointer transition-colors
    ${highlight 
      ? 'border-primary/50 text-white' 
      : warning
      ? 'border-accent-red/50 text-white'
      : 'border-border-dark text-slate-400 hover:border-primary hover:text-white'}
  `}>
    <span className={`${highlight ? 'text-primary' : warning ? 'text-accent-red' : 'text-slate-400'} group-hover:text-primary transition-colors`}>{icon}</span>
    <span className="text-sm">{label}</span>
  </div>
);

// Simple util for random paths
function generateSparklinePath(seed: string) {
  // Hardcoded for demo stability, but could be random
  if(seed === '1') return "M0,25 L10,22 L20,28 L30,10 L40,15 L50,5 L60,12 L70,20 L80,2 L90,15 L100,25";
  if(seed === '2') return "M0,20 L20,20 L40,15 L60,18 L80,22 L100,20";
  return "M0,15 L10,25 L30,5 L50,20 L70,10 L90,15 L100,20";
}
