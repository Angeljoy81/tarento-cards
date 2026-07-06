import { useState } from 'react';
import { Card } from '@/components/Card';
import { PageHeader } from '@/components/PageHeader';
import Switch from '@/components/Switch';

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  phone: string;
  email: string;
  active: boolean;
}

const initialEmployees: Employee[] = [
  { id: '1', name: 'Aditi Rao', title: 'Senior UX Designer', department: 'Design', phone: '+91 98765 43212', email: 'aditi.rao@tarento.com', active: true },
  { id: '2', name: 'Rajesh Kumar', title: 'Software Engineer', department: 'Engineering', phone: '+91 98765 43213', email: 'rajesh.kumar@tarento.com', active: true },
  { id: '3', name: 'Neha Singh', title: 'Product Manager', department: 'Product', phone: '+91 98765 43214', email: 'neha.singh@tarento.com', active: true },
  { id: '4', name: 'Sonia Patel', title: 'HR Business Partner', department: 'People', phone: '+91 98765 43215', email: 'sonia.patel@tarento.com', active: true },
  { id: '5', name: 'Vishal Sharma', title: 'Sales Lead', department: 'Sales', phone: '+91 98765 43216', email: 'vishal.sharma@tarento.com', active: true },
];

export function EmployeeDirectoryPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const toggleActive = (id: string) => {
    setEmployees((current) => current.map((e) => (e.id === id ? { ...e, active: !e.active } : e)));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Employee Directory" subtitle="Browse and manage employee records." />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <Card padding="md">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-navy-700">Employees</h2>
              <p className="text-sm text-mid-gray">View, add, or remove employee records.</p>
            </div>

            <div className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.id} className="rounded-xl border border-light-gray bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-base font-semibold text-navy-700">{employee.name}</p>
                      <p className="text-sm text-mid-gray">{employee.title} · {employee.department}</p>
                    </div>
                    <div className="grid gap-2 text-sm text-navy-500 md:text-right">
                      <span>{employee.phone}</span>
                      <span>{employee.email}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Switch checked={employee.active} onChange={() => toggleActive(employee.id)} />
                      <span className="text-sm text-navy-600">{employee.active ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="space-y-4">
            <div className="text-sm font-semibold text-navy-700">Employees</div>
            <p className="text-sm text-mid-gray">Toggle active status for each employee. Adding/removing is disabled.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
