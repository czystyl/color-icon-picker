import Example from './example';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-emerald-950 to-slate-900 shadow-2xl" />
      </div>

      <div className="text-center space-y-4 z-10 animate-fade-in pt-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-emerald-600 to-green-600 dark:from-blue-500 dark:via-emerald-500 dark:to-green-500 bg-clip-text text-transparent transition-all duration-500 hover:scale-[1.02]">
          Color Icon Picker
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Using Lucide Icons, Tailwind CSS, Shadcn UI, Fuzzy Search, and
          <span className="inline-block">Tanstack Virtual List</span>
        </p>
      </div>

      <div className="mt-8 w-full max-w-xl mx-auto shadow-[0_0_50px_-12px] shadow-emerald-500/20 rounded-xl hover:shadow-[0_0_60px_-12px] hover:shadow-emerald-500/30 hover:scale-[1.01] transition-all duration-300">
        <Example />
      </div>

      <footer className="relative w-full max-w-3xl mx-auto px-6 py-4 flex items-center justify-center gap-3 rounded-lg bg-zinc-900/50 dark:bg-muted/50 backdrop-blur-sm border border-zinc-800/50 dark:border-border/50 shadow-lg hover:shadow-xl shadow-emerald-500/10 hover:bg-zinc-900/60 dark:hover:bg-muted/60 transition-all duration-500 mt-auto">
        <span className="text-sm font-medium text-zinc-400 dark:text-muted-foreground">
          Toggle theme
        </span>
        <ModeToggle />
      </footer>
    </div>
  );
}
