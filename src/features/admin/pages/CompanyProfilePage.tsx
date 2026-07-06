import { Card } from '@/components/Card';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';

export function CompanyProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Profile"
        subtitle="These details appear on every employee's digital business card. Ensure information is accurate and reflects the current corporate brand guidelines."
      />

      <Card padding="lg">
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-navy-700">Brand Identity</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-xl border border-light-gray bg-off-white p-4">
                <div className="text-sm font-medium text-navy-500">Company Logo</div>
                <div className="h-32 rounded-xl bg-white border border-dashed border-light-gray flex items-center justify-center text-sm text-mid-gray">Logo preview</div>
                <button type="button" className="mt-2 text-sm font-medium text-teal-500 hover:underline">Replace Logo</button>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-navy-600">Company Name</label>
                <input className="w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700" value="Tarento Technologies" readOnly />

                <label className="block text-sm font-medium text-navy-600">Website URL</label>
                <input className="w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700" value="https://www.tarento.com/" readOnly />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-navy-700">Location Details</h2>
            <div className="rounded-xl border border-light-gray bg-white p-4 text-sm text-navy-700">
              IBC Knowledge Park, Bannerghatta Main Road, Bangalore, Karnataka 560029
            </div>
            <div className="h-48 rounded-xl bg-gray-50 border border-light-gray" />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-navy-700">Corporate Identity</h2>
            <label className="block text-sm font-medium text-navy-600">About / Company Motto</label>
            <textarea className="w-full min-h-[160px] rounded-button border border-light-gray bg-white p-4 text-sm text-navy-700" defaultValue="{ {DATA:DOCUMENT:DOCUMENT_3} }" />
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t border-light-gray">
            <Button variant="secondary" type="button">Discard Changes</Button>
            <Button variant="primary" type="button">Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
