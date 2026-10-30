import { Skeleton } from "./Skeleton";

export function SkeletonCardProducto() {
  return (
    <article
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
    >
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-24" />
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
    </article>
  );
}
