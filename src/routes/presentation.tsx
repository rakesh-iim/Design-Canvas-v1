import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/presentation")({
  head: () => ({ meta: [{ title: "Client presentation — Verdana Studio" }] }),
  component: Presentation,
});

const slides = [
  { title: "Skyline Balcony Retreat", sub: "Mehta Residence · Mumbai", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85" },
  { title: "The vision", sub: "A serene retreat above the city.", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1920&q=85" },
  { title: "Layered planting", sub: "Areca palms, monstera & jasmine vines.", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=85" },
  { title: "Materials & finishes", sub: "Teak deck · matte concrete · brushed brass.", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85" },
];

function Presentation() {
  const [i, setI] = useState(0);
  const [slider, setSlider] = useState(50);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="fixed inset-0 bg-foreground text-background overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-background/60">Verdana · Presentation</div>
          <div className="font-display text-lg">{slides[i].title}</div>
        </div>
        <Link to="/workspace" className="h-9 w-9 rounded-full grid place-items-center bg-background/10 hover:bg-background/20 backdrop-blur">
          <X className="h-4 w-4" />
        </Link>
      </div>

      {/* Slide */}
      <div className="absolute inset-0">
        {i === 2 ? (
          <BeforeAfter value={slider} onChange={setSlider} />
        ) : (
          <img src={slides[i].img} alt={slides[i].title} className="h-full w-full object-cover animate-fade-in" key={i} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/40 pointer-events-none" />
      </div>

      <div className="absolute bottom-0 inset-x-0 z-20 p-10 max-w-3xl">
        <div className="font-display text-5xl lg:text-6xl leading-[1.05] animate-slide-up">{slides[i].title}</div>
        <p className="text-background/70 mt-3 text-lg">{slides[i].sub}</p>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setI(Math.max(0, i - 1))} className="text-background hover:bg-background/15"><ChevronLeft className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon" onClick={() => setPlaying(!playing)} className="text-background hover:bg-background/15">{playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</Button>
        <Button variant="ghost" size="icon" onClick={() => setI(Math.min(slides.length - 1, i + 1))} className="text-background hover:bg-background/15"><ChevronRight className="h-5 w-5" /></Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} className={cn("h-1 rounded-full transition-all", idx === i ? "w-8 bg-background" : "w-4 bg-background/40 hover:bg-background/60")} />
        ))}
      </div>
    </div>
  );
}

function BeforeAfter({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="relative h-full w-full select-none">
      <img src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1920&q=85" alt="Before" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=85" alt="After" className="h-full w-full object-cover" />
      </div>
      <div className="absolute top-0 bottom-0" style={{ left: `${value}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-background" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background grid place-items-center text-foreground shadow-2xl">
          <ChevronLeft className="h-3 w-3" /><ChevronRight className="h-3 w-3" />
        </div>
      </div>
      <input
        type="range" min={0} max={100} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
      <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-foreground/60 text-background text-[10px] uppercase tracking-widest">Before</div>
      <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-background/80 text-foreground text-[10px] uppercase tracking-widest">After</div>
    </div>
  );
}
