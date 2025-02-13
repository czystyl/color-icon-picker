import Example from './example';
import { ModeToggle } from '@/components/mode-toggle';
import { getRandomIcon } from '@/lib/get-random-item';

export default function Home() {
  const defaultIconColor = getRandomIcon();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground transition-all duration-700 overflow-x-hidden">
      {/* Sophisticated static background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-emerald-50/50 to-green-50/50 dark:from-blue-950/50 dark:via-emerald-950/50 dark:to-green-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-800/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-100/20 via-transparent to-transparent dark:from-emerald-800/10" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>

      <div className="text-center space-y-4 z-10 animate-fade-in pt-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-emerald-600 to-green-600 dark:from-blue-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent transition-all duration-500 hover:scale-[1.02]">
          Color Icon Picker
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Using Lucide Icons, Tailwind CSS, Shadcn UI, Fuzzy Search, and
          <span className="inline-block">Tanstack Virtual List</span>
        </p>
      </div>

      <div className="z-10 w-full max-w-xl mx-auto p-6 rounded-xl border border-border/10 bg-card/30 shadow-sm backdrop-blur-md transition-all duration-500 hover:border-border/25 hover:bg-card/40 hover:shadow-lg group">
        <div className="relative">
          {/* Sophisticated subtle glow effect */}
          <div className="absolute -inset-[100px] bg-gradient-to-r from-blue-500/[0.03] via-emerald-500/[0.03] to-green-500/[0.03] opacity-0 group-hover:opacity-100 blur-[120px] transition-all duration-1000 -z-10" />
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/[0.04] via-emerald-500/[0.04] to-green-500/[0.04] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 -z-10" />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-300/[0.03] via-emerald-300/[0.03] to-green-300/[0.03] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
          <div className="relative z-20">
            <Example defaultIconColor={defaultIconColor} />
          </div>
        </div>
      </div>

      <footer className="relative w-full max-w-3xl mx-auto px-6 py-4 flex items-center justify-center gap-3 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/50 shadow-sm hover:bg-muted/60 transition-all duration-500 mt-auto">
        <span className="text-sm font-medium text-muted-foreground">
          Toggle theme
        </span>
        <ModeToggle />
      </footer>
    </div>
  );
}
