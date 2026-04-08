import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';

type ParticleKind = 'bubble' | 'star' | 'spark' | 'ring';

interface HeroParticle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  alpha: number;
  kind: ParticleKind;
  wobble: number;
  color: string;
}

interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    ctaPrimary: string;
    ctaSecondary: string;
    visualBadge: string;
    visuals: { title: string; subtitle: string; image: string }[];
  };
  categories: { title: string; description: string; slug: string }[];
  letters: { tamil: string; slug: string; label: string }[];
  popular: { name: string; meaning: string; description: string; gender: string }[];
  blog: { title: string; excerpt: string; readTime: string }[];
  affiliate: { title: string; description: string; link: string; image: string; tag: string }[];
  trust: { title: string; detail: string }[];
  cta: { title: string; subtitle: string; button: string };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  content: HomeContent | null = null;

  constructor(private http: HttpClient, private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Tamil Baby Names with Meaning | SEO-Friendly Name Finder');
    this.meta.updateTag({
      name: 'description',
      content: 'Find Tamil baby names with meaning, pronunciation, and cultural insights. Browse by letter, category, and popular lists.'
    });

    this.http.get<HomeContent>('assets/home-content.json').subscribe({
      next: (data) => (this.content = data),
      error: () => {
        this.content = null;
      }
    });
  }

  private ctx: CanvasRenderingContext2D | null = null;
  private particles: HeroParticle[] = [];
  private animationId = 0;
  private width = 0;
  private height = 0;
  private lastTime = 0;
  private reduceMotion = false;

  ngAfterViewInit(): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.setupCanvas();
    if (this.reduceMotion) {
      this.renderStaticFrame();
      return;
    }
    this.animationId = requestAnimationFrame(this.tick);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
    this.resetParticles();
    if (this.reduceMotion) {
      this.renderStaticFrame();
    }
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }
    this.ctx = canvas.getContext('2d');
    this.resizeCanvas();
    this.resetParticles();
  }

  private resizeCanvas(): void {
    if (!this.canvasRef) {
      return;
    }
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    this.width = width;
    this.height = height;
    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  private resetParticles(): void {
    const count = Math.min(110, Math.max(70, Math.floor((this.width * this.height) / 12000)));
    this.particles = Array.from({ length: count }, () => this.createParticle(true));
  }

  private createParticle(randomY = false): HeroParticle {
    const kinds: ParticleKind[] = ['bubble', 'bubble', 'bubble', 'bubble', 'star', 'spark', 'ring'];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    let radius = kind === 'bubble' ? this.randomRange(4, 16) : this.randomRange(8, 20);
    if (kind === 'bubble' && Math.random() > 0.7) {
      radius = this.randomRange(20, 38);
    }
    const palette = [
      '#f43f5e', '#fb7185', '#f472b6', '#ec4899',
      '#f97316', '#f59e0b', '#fbbf24', '#fde047',
      '#3b82f6', '#38bdf8', '#22d3ee', '#6366f1',
      '#8b5cf6', '#a855f7', '#34d399', '#22c55e'
    ];
    const color = palette[Math.floor(Math.random() * palette.length)];
    return {
      x: this.randomRange(0, this.width),
      y: randomY ? this.randomRange(0, this.height) : this.height + radius,
      radius,
      speedX: this.randomRange(-0.45, 0.45),
      speedY: this.randomRange(-0.85, -0.2),
      alpha: this.randomRange(0.6, 1),
      kind,
      wobble: this.randomRange(0, Math.PI * 2),
      color
    };
  }

  private tick = (time: number): void => {
    if (!this.ctx) {
      return;
    }
    const delta = time - this.lastTime || 16;
    this.lastTime = time;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'lighter';
    this.particles.forEach((particle, index) => {
      this.updateParticle(particle, delta);
      this.drawParticle(particle);
      if (particle.y + particle.radius < -40 || particle.x < -40 || particle.x > this.width + 40) {
        this.particles[index] = this.createParticle();
      }
    });
    this.ctx.restore();
    this.animationId = requestAnimationFrame(this.tick);
  };

  private renderStaticFrame(): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'lighter';
    this.particles.forEach((particle) => this.drawParticle(particle));
    this.ctx.restore();
  }

  private updateParticle(particle: HeroParticle, delta: number): void {
    particle.wobble += 0.002 * delta;
    particle.x += particle.speedX * delta * 0.06 + Math.sin(particle.wobble) * 0.12;
    particle.y += particle.speedY * delta * 0.06;
  }

  private drawParticle(particle: HeroParticle): void {
    if (!this.ctx) {
      return;
    }
    if (particle.kind === 'bubble') {
      const gradient = this.ctx.createRadialGradient(
        particle.x - particle.radius * 0.3,
        particle.y - particle.radius * 0.3,
        particle.radius * 0.2,
        particle.x,
        particle.y,
        particle.radius
      );
      gradient.addColorStop(0, this.applyAlpha(particle.color, particle.alpha));
      gradient.addColorStop(1, this.applyAlpha(particle.color, 0));
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
      return;
    }

    if (particle.kind === 'star') {
      const spikes = 5;
      const outerRadius = particle.radius * 0.9;
      const innerRadius = particle.radius * 0.45;
      const step = Math.PI / spikes;
      this.ctx.save();
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate(particle.wobble);
      this.ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = i * step;
        this.ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      this.ctx.closePath();
      this.ctx.fillStyle = this.applyAlpha(particle.color, particle.alpha);
      this.ctx.fill();
      this.ctx.restore();
      return;
    }

    if (particle.kind === 'ring') {
      this.ctx.save();
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate(particle.wobble * 0.4);
      this.ctx.strokeStyle = this.applyAlpha(particle.color, particle.alpha);
      this.ctx.lineWidth = 2.2;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, particle.radius * 0.7, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
      return;
    }

    this.ctx.save();
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.wobble * 0.6);
    this.ctx.fillStyle = this.applyAlpha(particle.color, particle.alpha);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, particle.radius * 0.4, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  private applyAlpha(color: string, alpha: number): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
