import Example from './example';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground transition-all duration-300 overflow-x-hidden">
      {/* Animated glow effect */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-green-500/20 blur-[100px] opacity-50 dark:opacity-30 animate-glow" />

      <div className="text-center space-y-4 z-10 animate-fade-in pt-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-emerald-600 to-green-600 dark:from-blue-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent animate-gradient hover:scale-[1.02] transition-transform duration-300">
          Color Icon Picker
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
          Using Lucide Icons, Tailwind CSS, Shadcn UI, Fuzzy Search, and
          <span className="inline-block">Tanstack Virtual List</span>
        </p>
      </div>

      <div className="z-10 w-full max-w-xl mx-auto p-6 rounded-xl border-2 border-border/20 bg-card/40 shadow-lg backdrop-blur-md transition-all duration-700 hover:border-border/80 hover:bg-card/70 hover:shadow-2xl animate-fade-in-up group">
        <div className="relative">
          <span className="absolute -inset-8 bg-gradient-to-r from-blue-600/20 via-emerald-600/20 to-green-600/20 opacity-0 blur-[50px] transition-all duration-1000 group-hover:opacity-100 group-hover:blur-[100px] -z-10" />
          <div className="relative z-20">
            <Example />
          </div>
        </div>
      </div>

      <footer className="relative w-full max-w-3xl mx-auto px-6 py-4 flex items-center justify-center gap-3 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/50 shadow-sm hover:bg-muted/60 transition-all duration-300 animate-fade-in-up mt-auto">
        <span className="text-sm font-medium text-muted-foreground">
          Toggle theme
        </span>
        <ModeToggle />
      </footer>
    </div>
  );
}
