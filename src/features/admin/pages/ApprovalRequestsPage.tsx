import { Card } from '@/components/Card';
import { PageHeader } from '@/components/PageHeader';

export function ApprovalRequestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Approval Requests" subtitle="Review and approve requests from employees." />
      <Card padding="md">
        <div className="text-mid-gray">No pending approval requests.</div>
      </Card>
    </div>
  );
}
