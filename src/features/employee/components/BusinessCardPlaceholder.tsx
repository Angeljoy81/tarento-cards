import { CreditCard } from "lucide-react";

import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";

export default function BusinessCardPlaceholder() {
  return (
    <Card className="flex min-h-[180px] w-full max-w-sm items-center justify-center border-dashed bg-off-white">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
          <Icon
            icon={CreditCard}
            size={24}
            tone="secondary"
          />
        </div>

        <h3 className="text-base font-semibold text-navy-500">
          Business Card Preview
        </h3>

        <p className="mx-auto mt-2 max-w-64 text-sm text-mid-gray">
          This is where the public digital business card will appear.
        </p>
      </div>
    </Card>
  );
}
