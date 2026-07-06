import { Card } from '@/components/Card';
import { PageHeader } from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import { Users, Eye, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Where people have scanned your card in the last 30 days." />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total employees" value="128" trend={{ direction: 'up', value: '+12%' }} icon={Users} />
        <StatCard label="Card visits" value="2,845" trend={{ direction: 'up', value: '+8%' }} icon={Eye} />
        <StatCard label="Team growth" value="18%" trend={{ direction: 'up', value: '+3%' }} icon={BarChart3} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card padding="md">
          <h2 className="text-lg font-semibold text-navy-700 mb-4">Card visits over time</h2>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <AreaChart
                data={[
                  { day: 'Mon', primary: 2000, secondary: 1200 },
                  { day: 'Tue', primary: 3000, secondary: 2500 },
                  { day: 'Wed', primary: 2500, secondary: 2000 },
                  { day: 'Thu', primary: 8000, secondary: 6000 },
                  { day: 'Fri', primary: 12000, secondary: 10000 },
                  { day: 'Sat', primary: 18000, secondary: 16000 },
                  { day: 'Sun', primary: 15000, secondary: 14000 },
                ]}
              >
                <defs>
                  <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f1724" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0f1724" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="primary" stroke="#0f1724" fillOpacity={1} fill="url(#colorPrimary)" />
                <Area type="monotone" dataKey="secondary" stroke="#16a34a" fillOpacity={1} fill="url(#colorSecondary)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md">
          <h2 className="text-lg font-semibold text-navy-700 mb-4">Audit logs</h2>
          <div className="space-y-3 text-sm text-navy-600">
            {[
              { id: 'a1', text: 'User Aditi Rao updated profile', time: '2 hours ago' },
              { id: 'a2', text: 'New employee Rajesh Kumar added', time: '6 hours ago' },
              { id: 'a3', text: 'Company profile logo changed', time: '1 day ago' },
              { id: 'a4', text: 'Employee Neha Singh removed', time: '3 days ago' },
            ].map((log) => (
              <div key={log.id} className="flex items-start justify-between gap-4">
                <div>{log.text}</div>
                <div className="text-xs text-mid-gray">{log.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
