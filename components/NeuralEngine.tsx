import React, { useEffect, useRef } from 'react';
import { Icons } from './Icons';

export const NeuralEngine: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto">
      {/* Top Header specific to Neural Engine */}
      <div className="border-b border-border-dark bg-[#17191c] px-8 py-6 sticky top-0 z-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-primary text-xs font-mono uppercase tracking-[0.3em]">Module Diagnostic</p>
            <h1 className="text-3xl font-black leading-tight tracking-tight uppercase text-white">Neural Engine Performance</h1>
            <div className="flex items-center gap-2 text-cyber-green text-sm mt-1">
              <Icons.Check size={16} />
              <span>System Healthy • Inference Active • GPU Acceleration Enabled</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded h-10 px-6 bg-[#273d45] text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors border border-transparent hover:border-white/20">
              Adjust Thresholds
            </button>
            <button className="flex items-center justify-center rounded h-10 px-6 bg-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-primary/80 transition-colors shadow-[0_0_15px_rgba(27,120,152,0.3)]">
              Retrain Model
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard 
            icon={<Icons.Brain className="text-primary" />} 
            status="ACTIVE" 
            title="Random Forest Classifier" 
            sub="ensemble_id: rf_v24_984" 
          />
          <MetricCard 
            icon={<Icons.Target className="text-primary" />} 
            status="Delta: +0.2%" 
            title="98.4% Accuracy" 
            sub="OVERALL PREDICTION PRECISION" 
          />
          <MetricCard 
            icon={<Icons.Zap className="text-primary" />} 
            status="Load: 2.1ms avg" 
            title="0.42ms Latency" 
            sub="REAL-TIME INFERENCE SPEED" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Confusion Matrix */}
          <div className="lg:col-span-5 flex flex-col rounded bg-surface-dark border border-border-dark overflow-hidden">
            <h3 className="px-5 py-4 border-b border-border-dark text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 bg-[#1f252c]">
              <Icons.Dashboard size={14} /> Confusion Matrix Visualization
            </h3>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-2 aspect-square max-w-[320px] mx-auto">
                <MatrixCell value="1,242" label="True Neg (Normal)" color="primary-light" />
                <MatrixCell value="14" label="False Pos" color="red" />
                <MatrixCell value="8" label="False Neg" color="red" />
                <MatrixCell value="453" label="True Pos (Attack)" color="primary" highlight />
              </div>
              
              <div className="mt-6 flex justify-between gap-4 text-center border-t border-white/5 pt-4">
                <StatBox value="96.8%" label="Recall" />
                <StatBox value="97.2%" label="F1 Score" />
                <StatBox value="98.1%" label="Precision" />
              </div>
            </div>
          </div>

          {/* Feature Importance & Latency */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex-1 rounded bg-surface-dark border border-border-dark flex flex-col">
              <h3 className="px-5 py-4 border-b border-border-dark text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 bg-[#1f252c]">
                <Icons.Chart size={14} /> Feature Importance Weighting
              </h3>
              <div className="p-6 space-y-5">
                <FeatureBar label="dst_port" value={42.4} />
                <FeatureBar label="protocol_type" value={28.1} opacity={0.7} />
                <FeatureBar label="duration" value={15.5} opacity={0.5} />
                <FeatureBar label="src_bytes" value={14.0} opacity={0.3} />
              </div>
            </div>

            <div className="h-32 rounded bg-surface-dark border border-border-dark p-6 flex items-center justify-between gap-8 relative overflow-hidden">
               <div className="flex-1 z-10">
                 <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Training Speed</h4>
                 <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-black text-white">0.08ms</span>
                   <span className="text-[10px] text-cyber-green uppercase font-mono bg-cyber-green/10 px-1 rounded">Optimized</span>
                 </div>
               </div>
               <div className="w-px h-full bg-white/10 z-10"></div>
               <div className="flex-1 z-10">
                 <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Real-time Inference</h4>
                 <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-black text-white">0.42ms</span>
                   <span className="text-[10px] text-primary uppercase font-mono bg-primary/10 px-1 rounded">Current Log</span>
                 </div>
               </div>
               
               {/* Decorative BG curve */}
               <svg className="absolute right-0 bottom-0 w-64 h-full text-primary/10" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path d="M0 100 C 50 0 150 0 200 100" fill="currentColor" />
               </svg>
            </div>
          </div>
        </div>

        {/* Live Terminal */}
        <div className="rounded bg-[#0c1214] border border-border-dark overflow-hidden flex flex-col h-80 relative shadow-2xl">
           <div className="scanline absolute inset-0 pointer-events-none opacity-20 z-20"></div>
           <div className="px-5 py-3 bg-[#151d20] border-b border-border-dark flex items-center justify-between shrink-0">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Live Inference Feed [Zeek Log Stream]</h3>
             </div>
             <div className="flex gap-4">
               <span className="text-[10px] font-mono text-white/40">Stream: eth0</span>
               <span className="text-[10px] font-mono text-white/40">Packets/s: 1.4k</span>
             </div>
           </div>
           
           <div ref={terminalRef} className="flex-1 p-5 font-mono text-xs overflow-y-auto space-y-2">
             <LogLine time="14:22:01.03" src="192.168.1.42" dst="10.0.0.5" port="443" status="NORMAL (99.2%)" color="green" />
             <LogLine time="14:22:01.45" src="192.168.1.15" dst="8.8.8.8" port="53" status="NORMAL (99.8%)" color="green" />
             <div className="flex gap-4 bg-cyber-red/10 border-l-2 border-cyber-red px-2 py-1 -mx-2">
               <span className="text-cyber-red/60">[14:22:02.11]</span>
               <span className="text-white font-bold">172.16.0.25 -{'>'} 10.0.0.100</span>
               <span className="text-white">TCP port: 22, 80, 445</span>
               <span className="text-cyber-red ml-auto font-bold animate-pulse">ATTACK: NMAP SCAN (98.4%)</span>
             </div>
             <LogLine time="14:22:02.15" src="192.168.1.42" dst="10.0.0.5" port="443" status="NORMAL (98.9%)" color="green" />
             <LogLine time="14:22:02.50" src="192.168.1.10" dst="192.168.1.1" port="ICMP" status="NORMAL (100%)" color="green" />
             <LogLine time="14:22:03.12" src="10.0.0.12" dst="10.0.0.1" port="80" status="NORMAL (99.1%)" color="green" />
             <div className="flex gap-4 animate-pulse mt-4">
               <span className="text-white/40">[14:22:03.48]</span>
               <span className="text-primary">SCANNING PACKET HEADER...</span>
               <span className="text-white/20">waiting for feature extraction...</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// Sub-components for Neural Engine to keep file clean

const MetricCard = ({ icon, status, title, sub }: any) => (
  <div className="flex flex-col gap-3 rounded bg-surface-dark border border-border-dark p-5 backdrop-blur-sm">
    <div className="flex items-center justify-between">
      {icon}
      <span className="px-2 py-0.5 text-[10px] bg-primary/10 text-primary font-bold rounded border border-primary/20">{status}</span>
    </div>
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-bold uppercase tracking-tight text-white">{title}</h2>
      <p className="text-white/50 text-xs font-mono uppercase">{sub}</p>
    </div>
  </div>
);

const MatrixCell = ({ value, label, color, highlight }: any) => (
  <div className={`
    rounded flex flex-col items-center justify-center p-4 border
    ${highlight 
      ? 'bg-primary border-primary shadow-[0_0_15px_rgba(27,120,152,0.5)]' 
      : color === 'red' 
      ? 'bg-cyber-red/10 border-cyber-red/30' 
      : 'bg-primary/10 border-primary/30'}
  `}>
    <span className={`text-2xl font-bold ${highlight ? 'text-white' : color === 'red' ? 'text-cyber-red' : 'text-white'}`}>{value}</span>
    <span className={`text-[10px] uppercase font-bold ${highlight ? 'text-white/90' : color === 'red' ? 'text-cyber-red/80' : 'text-primary'}`}>{label}</span>
  </div>
);

const StatBox = ({ value, label }: any) => (
  <div className="flex-1 first:border-r-0 border-r last:border-r-0 border-white/10">
    <p className="text-xl font-bold text-white">{value}</p>
    <p className="text-[10px] uppercase text-white/40">{label}</p>
  </div>
);

const FeatureBar = ({ label, value, opacity = 1 }: any) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-mono mb-1 text-white">
      <span>{label}</span>
      <span className="text-primary">{value}%</span>
    </div>
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
      <div 
        className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(27,120,152,0.5)]" 
        style={{ width: `${value}%`, opacity }}
      ></div>
    </div>
  </div>
);

const LogLine = ({ time, src, dst, port, status, color }: any) => (
  <div className="flex gap-4 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-white/40">[{time}]</span>
    <span className="text-white">{src} -{'>'} {dst}</span>
    <span className="text-white">port: {port}</span>
    <span className={`ml-auto ${color === 'green' ? 'text-cyber-green' : 'text-white'}`}>CLASSIFICATION: {status}</span>
  </div>
);
