"use client";

interface CreatePageHeaderProps {
  title: string;
  subtitle: string;
}

export function CreatePageHeader({ title, subtitle }: CreatePageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-purple-200">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-purple-200">0 credits</span>
        <button className="bg-purple-900/50 hover:bg-purple-900/70 px-4 py-2 rounded-lg transition-colors">
          Upgrade
        </button>
      </div>
    </div>
  );
}