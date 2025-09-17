import dynamic from "next/dynamic";

// Create a loading placeholder that matches the structure of the client component
function LoadingNewsTicker() {
  return (
    <div className="bg-destructive text-destructive-foreground py-2.5">
      <div className="container flex items-center gap-4 overflow-hidden">
        <div className="bg-background/20 animate-pulse w-24 h-7 rounded-sm" />
        <div className="flex gap-4">
          <div className="bg-background/20 animate-pulse w-48 h-5 rounded-sm" />
          <div className="bg-background/20 animate-pulse w-64 h-5 rounded-sm" />
          <div className="bg-background/20 animate-pulse w-40 h-5 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

// Dynamic import with matching loading component
const BreakingNewsTickerClient = dynamic(
  () => import("./BreakingNewsTickerClient").then((mod) => mod.BreakingNewsTickerClient),
  {
    ssr: false,
    loading: () => <LoadingNewsTicker />,
  }
);

export function BreakingNewsTicker() {
  return <BreakingNewsTickerClient />;
}
