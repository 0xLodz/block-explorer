import { Entity } from "types";
import EntityHeader from "./EntityHeader";
import { LineLoader } from "./Loaders";
interface OverviewSkeletonProps {
  entity: Entity;
  title?: string;
  status?: "loading" | "error";
}

export default function OverviewSkeleton({
  entity,
  title,
  status = "loading",
}: OverviewSkeletonProps) {
  return (
    <div className="w-full shadow-warning border-2 border-dark-100">
      <EntityHeader entity={entity} title={title} />
      <div className="flex p-3 items-center justify-between bg-white-cream-100 font-semibold h-[56px]">
        {status === "error" ? (
          <p className="text-danger-100 font-bold text-sm">
            Error when fetching data. Please refresh the page
          </p>
        ) : (
          <LineLoader />
        )}
      </div>
    </div>
  );
}
