export function DashboardHeader({ name }: { name: string }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-sm">
      <div>
        <h1 className="text-sm text-[#8888a0]">
          Welcome back,{" "}
          <span className="text-[#e4e4ec] font-medium">{name}</span>
        </h1>
      </div>
      <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">
        {name.charAt(0).toUpperCase()}
      </div>
    </header>
  );
}
