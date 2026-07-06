import { useState } from 'react';
import { Lock, Mail, Phone, Link2 } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Avatar from '@/components/Avatar';
import { PageHeader } from '@/components/PageHeader';

export function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    title: 'Senior Product Design',
    department: 'Design & User Experience',
    about: 'Passionate about crafting clean interfaces.',
    phone: '+91 98765 43210',
    email: 'employee@tarento.com',
    linkedin: 'linkedin.com/in/janedoe',
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Profile" subtitle="Manage your digital business card details and contact information." />

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <Card padding="md">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-navy-700">Company details</h2>
                <p className="text-sm text-mid-gray">Managed centrally by your administrator</p>
              </div>
              <div className="rounded-full bg-slate-100 p-2 text-slate-500">
                <Lock size={16} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-light-gray bg-white p-4">
                <div className="text-sm text-navy-500 mb-2">Company Logo</div>
                <div className="h-28 w-full rounded-xl border border-dashed border-light-gray bg-off-white flex items-center justify-center text-sm text-mid-gray">
                  Logo preview
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-600">Company Name</label>
                <input className="mt-2 w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700" value="Tarento Technologies" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-600">Website</label>
                <input className="mt-2 w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700" value="www.tarento.com" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-600">Office Address</label>
                <textarea className="mt-2 w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700 min-h-[120px] resize-none" value="123 Tech Park, Innovation Drive, Silicon Valley, CA 94043" readOnly />
              </div>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name={profile.name} size="xl" />
              <div>
                <h2 className="text-lg font-semibold text-navy-700">Your details</h2>
                <span className="text-sm text-mid-gray">Update your personal details for your admin profile.</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" value={profile.name} onChange={() => {}} disabled />
              <Input label="Job Title" value={profile.title} onChange={() => {}} disabled />
            </div>
            <Input label="Department" value={profile.department} onChange={() => {}} disabled />
            <Input label="About" value={profile.about} onChange={(value) => handleChange('about', value)} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-navy-600"><Phone size={16} /><span>Phone</span></div>
                  <Input label="" value={profile.phone} onChange={() => {}} disabled />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-navy-600"><Mail size={16} /><span>Email</span></div>
                <Input label="" value={profile.email} onChange={() => {}} disabled />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-navy-600"><Link2 size={16} /><span>LinkedIn</span></div>
              <Input label="" value={profile.linkedin} onChange={() => {}} disabled />
            </div>

            <div className="flex justify-end">
              <Button variant="primary" type="button">Save changes</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
