import Link from "next/link";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div>
      <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href='/' className="hover:underline">হোম</Link>
            <span>▶</span>
            <span className="text-indigo-400">{title}</span>
          </div>
        </div>
      </header>
    </div>
  );
}
