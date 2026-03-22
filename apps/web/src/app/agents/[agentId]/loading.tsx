import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";

export default function AgentDetailLoading() {
  return (
    <DashboardLayout>
      <div className="p-5 sm:p-8 max-w-[900px]">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="bg-surface-panel rounded-card border border-border-soft p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
          <Skeleton className="h-4 w-72 mb-3" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-surface-panel rounded-card border border-border-soft p-5">
            <Skeleton className="h-5 w-32 mb-4" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
          <div className="bg-surface-panel rounded-card border border-border-soft p-5">
            <Skeleton className="h-5 w-32 mb-4" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
