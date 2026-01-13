export interface LogEntry {
  id: string;
  timestamp: string;
  sourceIp: string;
  targetIp: string;
  location: string;
  type: 'SQL Injection' | 'Nmap Scan' | 'Brute Force' | 'DDoS Attempt' | 'Anomaly';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  confidence: number;
  status: 'Blocked' | 'Logged' | 'Flagged' | 'Monitoring';
  payload?: string;
  userAgent?: string;
  method?: string;
  uri?: string;
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: 'primary' | 'accent-red' | 'accent-green' | 'accent-amber';
  percent: number;
}

export interface TrafficItem {
  timestamp: string;
  source: string;
  destination: string;
  protocol: 'TCP' | 'UDP' | 'HTTP' | 'SQL';
  confidence: number;
}
