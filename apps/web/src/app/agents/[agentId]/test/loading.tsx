import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";

export default function AgentTestLoading() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="shrink-0 border-b border-border-soft bg-surface-panel px-5 py-4">
          <div className="max-w-[900px] mx-auto flex items-center gap-3">
            <Skeleton className="h-4 w-12" />
            <div className="h-4 w-px bg-border-soft" />
            <div>
              <Skeleton className="h-4 w-40 mb-1" />
              <Skeleton className="h-3 w-56" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </DashboardLayout>
  );
}
