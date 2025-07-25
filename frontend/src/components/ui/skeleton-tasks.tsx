export function SkeletonTasks() {
  return (
    <div className="flex flex-col mt-25 items-center w-screen max-w-screen justify-center gap-6">
      <div className="w-full max-w-2xl p-4 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 shadow animate-pulse">
        <div className="h-8 w-1/3 mb-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="space-y-3">
          <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-6 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="w-full max-w-2xl p-4 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 shadow animate-pulse mt-6">
        <div className="h-8 w-1/3 mb-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="space-y-3">
          <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-6 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="w-full max-w-2xl p-4 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 shadow animate-pulse mt-6">
        <div className="h-8 w-1/3 mb-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="space-y-3">
          <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-6 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}
