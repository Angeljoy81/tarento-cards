import { Card } from '@/components/Card';
import { PageHeader } from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import { Users, Eye, BarChart3 } from 'lucide-react';

export function AdminDashboardPage() {
  const visitsData = [
    { day: 'Mon', primary: 2000, secondary: 1200 },
    { day: 'Tue', primary: 3000, secondary: 2500 },
    { day: 'Wed', primary: 2500, secondary: 2000 },
    { day: 'Thu', primary: 8000, secondary: 6000 },
    { day: 'Fri', primary: 12000, secondary: 10000 },
    { day: 'Sat', primary: 18000, secondary: 16000 },
    { day: 'Sun', primary: 15000, secondary: 14000 },
  ];
  const maxVisits = Math.max(...visitsData.map((d) => Math.max(d.primary, d.secondary)));

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
          <div className="h-80 rounded-lg border border-slate-100 p-4">
            <div className="mb-4 flex items-center gap-4 text-xs text-navy-600">
              <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-[#0f1724]" />Primary</div>
              <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-[#16a34a]" />Secondary</div>
            </div>
            <div className="grid h-62.5 grid-cols-7 items-end gap-3">
              {visitsData.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-2">
                  <div className="flex h-52.5 items-end gap-1">
                    <div
                      className="w-3 rounded-t bg-[#0f1724]"
                      style={{ height: `${(item.primary / maxVisits) * 100}%` }}
                      title={`Primary: ${item.primary}`}
                    />
                    <div
                      className="w-3 rounded-t bg-[#16a34a]"
                      style={{ height: `${(item.secondary / maxVisits) * 100}%` }}
                      title={`Secondary: ${item.secondary}`}
                    />
                  </div>
                  <span className="text-xs text-mid-gray">{item.day}</span>
                </div>
              ))}
            </div>
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
