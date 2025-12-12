interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  connectionIndex?: number;
}

interface Wave {
  offset: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
}

interface Panel {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

export class AnimationEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationFrame: number | null = null;
  private startTime: number = 0;
  private currentTime: number = 0;
  private duration: number = 15000; // 15 seconds
  
  // Animation elements
  private particles: Particle[] = [];
  private waves: Wave[] = [];
  private panels: Panel[] = [];
  private sphereRotation: number = 0;
  
  // Camera
  private cameraZ: number = 0;
  private cameraRotationX: number = 0;
  private cameraRotationY: number = 0;
  
  // Color palette
  private colors = {
    deepBlue: '#0d2847',
    blue: '#1e4d7b',
    teal: '#2dd4bf',
    silver: '#94a3b8',
    white: '#f1f5f9',
    gradientStart: '#0a1628',
    gradientEnd: '#1e3a5f'
  };

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.initializeElements();
  }

  private initializeElements() {
    // Initialize waves
    for (let i = 0; i < 5; i++) {
      this.waves.push({
        offset: i * 120,
        amplitude: 80 + i * 20,
        frequency: 0.003 + i * 0.0005,
        speed: 0.5 + i * 0.2,
        phase: i * Math.PI / 3
      });
    }

    // Initialize particles (will be used in multiple stages)
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 500 - 250,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: 0,
        connectionIndex: i
      });
    }

    // Initialize panels
    const panelCount = 8;
    for (let i = 0; i < panelCount; i++) {
      this.panels.push({
        x: 0,
        y: 0,
        z: i * 150 - 300,
        width: 400,
        height: 300,
        rotation: (Math.random() - 0.5) * 0.3,
        opacity: 0
      });
    }
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
  }

  private easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  private getStageProgress(stageStart: number, stageEnd: number): number {
    if (this.currentTime < stageStart) return 0;
    if (this.currentTime > stageEnd) return 1;
    return (this.currentTime - stageStart) / (stageEnd - stageStart);
  }

  private drawGradientBackground(progress: number) {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    
    // Evolve gradient over time
    const hue1 = 210 + progress * 10;
    const hue2 = 200 + progress * 15;
    
    gradient.addColorStop(0, this.colors.gradientStart);
    gradient.addColorStop(0.5, `hsl(${hue1}, 45%, 15%)`);
    gradient.addColorStop(1, `hsl(${hue2}, 40%, 20%)`);
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Stage 1: Floating light waves (0-2.5s)
  private renderWaves(progress: number) {
    const fadeIn = Math.min(progress * 3, 1);
    const fadeOut = this.getStageProgress(2000, 2500);
    const opacity = fadeIn * (1 - this.easeInOutCubic(fadeOut));
    
    if (opacity <= 0) return;

    this.ctx.save();
    this.ctx.globalAlpha = opacity;
    
    const centerY = this.canvas.height / 2;
    
    this.waves.forEach((wave, index) => {
      this.ctx.beginPath();
      
      const gradient = this.ctx.createLinearGradient(0, centerY - wave.amplitude, 0, centerY + wave.amplitude);
      gradient.addColorStop(0, 'rgba(45, 212, 191, 0)');
      gradient.addColorStop(0.5, index % 2 === 0 ? 'rgba(45, 212, 191, 0.3)' : 'rgba(148, 163, 184, 0.3)');
      gradient.addColorStop(1, 'rgba(45, 212, 191, 0)');
      
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 2;
      
      for (let x = 0; x <= this.canvas.width; x += 5) {
        const time = this.currentTime * 0.001;
        const y = centerY + wave.offset + 
                  Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude * (1 - fadeOut * 0.5);
        
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      
      this.ctx.stroke();
      
      // Add glow
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = this.colors.teal;
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    });
    
    this.ctx.restore();
  }

  // Stage 2: Particles forming (2-5s)
  private renderParticles(stageProgress: number) {
    const fadeIn = this.getStageProgress(2000, 2500);
    const stable = this.getStageProgress(2500, 4500);
    const fadeOut = this.getStageProgress(4500, 5500);
    
    if (fadeIn === 0) return;

    const baseOpacity = this.easeOutQuad(fadeIn) * (1 - this.easeInOutCubic(fadeOut));
    
    this.ctx.save();
    
    // Update and draw particles
    this.particles.forEach((particle) => {
      // Transition from wave positions to coordinated motion
      if (fadeIn < 1) {
        const targetX = this.canvas.width / 2 + (particle.x - this.canvas.width / 2) * 0.8;
        const targetY = this.canvas.height / 2 + (particle.y - this.canvas.height / 2) * 0.8;
        particle.x += (targetX - particle.x) * 0.02;
        particle.y += (targetY - particle.y) * 0.02;
      } else {
        // Coordinated circular motion
        const angle = this.currentTime * 0.0005 + particle.connectionIndex! * 0.04;
        const radius = 200 + Math.sin(this.currentTime * 0.001 + particle.connectionIndex! * 0.1) * 50;
        const targetX = this.canvas.width / 2 + Math.cos(angle) * radius;
        const targetY = this.canvas.height / 2 + Math.sin(angle) * radius;
        
        particle.x += (targetX - particle.x) * 0.05;
        particle.y += (targetY - particle.y) * 0.05;
      }
      
      particle.opacity = baseOpacity;
      
      // Project 3D position
      const scale = 300 / (300 + particle.z);
      const screenX = particle.x * scale + this.canvas.width * (1 - scale) / 2;
      const screenY = particle.y * scale + this.canvas.height * (1 - scale) / 2;
      
      // Draw particle
      const gradient = this.ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, particle.size * 3 * scale);
      gradient.addColorStop(0, `rgba(45, 212, 191, ${particle.opacity})`);
      gradient.addColorStop(0.5, `rgba(148, 163, 184, ${particle.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(45, 212, 191, 0)`);
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, particle.size * 3 * scale, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    this.ctx.restore();
  }

  // Stage 3: Network formation (4.5-7.5s)
  private renderNetwork(stageProgress: number) {
    const fadeIn = this.getStageProgress(4500, 5500);
    const stable = this.getStageProgress(5500, 7000);
    const fadeOut = this.getStageProgress(7000, 7500);
    
    if (fadeIn === 0) return;

    const opacity = this.easeInOutQuad(fadeIn) * (1 - this.easeInOutCubic(fadeOut));
    
    this.ctx.save();
    this.ctx.globalAlpha = opacity;
    this.ctx.strokeStyle = this.colors.teal;
    this.ctx.lineWidth = 1;
    
    // Draw connections between nearby particles
    const connectionDistance = 120;
    
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      const scale1 = 300 / (300 + p1.z);
      const x1 = p1.x * scale1 + this.canvas.width * (1 - scale1) / 2;
      const y1 = p1.y * scale1 + this.canvas.height * (1 - scale1) / 2;
      
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const scale2 = 300 / (300 + p2.z);
        const x2 = p2.x * scale2 + this.canvas.width * (1 - scale2) / 2;
        const y2 = p2.y * scale2 + this.canvas.height * (1 - scale2) / 2;
        
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        
        if (distance < connectionDistance) {
          const lineOpacity = (1 - distance / connectionDistance) * opacity * 0.3;
          
          const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, `rgba(45, 212, 191, ${lineOpacity})`);
          gradient.addColorStop(0.5, `rgba(148, 163, 184, ${lineOpacity})`);
          gradient.addColorStop(1, `rgba(45, 212, 191, ${lineOpacity})`);
          
          this.ctx.strokeStyle = gradient;
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.stroke();
        }
      }
    }
    
    this.ctx.restore();
    
    // Still render particles
    this.renderParticles(stageProgress);
  }

  // Stage 4: Holographic panels (7-10s)
  private renderPanels(stageProgress: number) {
    const fadeIn = this.getStageProgress(7000, 7500);
    const stable = this.getStageProgress(7500, 9500);
    const fadeOut = this.getStageProgress(9500, 10000);
    
    if (fadeIn === 0) return;

    const baseOpacity = this.easeInOutQuad(fadeIn) * (1 - this.easeInOutCubic(fadeOut));
    
    this.ctx.save();
    
    // Update camera for depth
    this.cameraZ = -200 + fadeIn * 200;
    
    // Draw panels from back to front
    const sortedPanels = [...this.panels].sort((a, b) => a.z - b.z);
    
    sortedPanels.forEach((panel, index) => {
      const z = panel.z - this.cameraZ;
      if (z <= 0) return;
      
      const scale = 800 / z;
      const screenX = this.canvas.width / 2 + panel.x * scale;
      const screenY = this.canvas.height / 2 + panel.y * scale;
      const width = panel.width * scale;
      const height = panel.height * scale;
      
      panel.opacity = baseOpacity * 0.3;
      
      this.ctx.save();
      this.ctx.translate(screenX, screenY);
      this.ctx.rotate(panel.rotation * (1 - fadeOut));
      
      // Panel border
      this.ctx.strokeStyle = `rgba(45, 212, 191, ${panel.opacity})`;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(-width / 2, -height / 2, width, height);
      
      // Panel fill with gradient
      const gradient = this.ctx.createLinearGradient(-width / 2, -height / 2, width / 2, height / 2);
      gradient.addColorStop(0, `rgba(13, 40, 71, ${panel.opacity * 0.3})`);
      gradient.addColorStop(0.5, `rgba(45, 212, 191, ${panel.opacity * 0.1})`);
      gradient.addColorStop(1, `rgba(13, 40, 71, ${panel.opacity * 0.3})`);
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(-width / 2, -height / 2, width, height);
      
      // Abstract motion inside panels
      const time = this.currentTime * 0.001;
      for (let i = 0; i < 3; i++) {
        const lineY = -height / 2 + (height / 4) * (i + 1) + Math.sin(time * 2 + i) * 20;
        this.ctx.strokeStyle = `rgba(148, 163, 184, ${panel.opacity * 0.5})`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(-width / 2 + 20, lineY);
        this.ctx.lineTo(width / 2 - 20, lineY);
        this.ctx.stroke();
      }
      
      this.ctx.restore();
    });
    
    this.ctx.restore();
  }

  // Stage 5: Geometric corridor (9.5-12s)
  private renderCorridor(stageProgress: number) {
    const fadeIn = this.getStageProgress(9500, 10000);
    const stable = this.getStageProgress(10000, 11500);
    const fadeOut = this.getStageProgress(11500, 12000);
    
    if (fadeIn === 0) return;

    const baseOpacity = this.easeInOutQuad(fadeIn) * (1 - this.easeInOutCubic(fadeOut));
    
    this.ctx.save();
    
    // Camera moving through corridor
    this.cameraZ = -200 + (fadeIn * 300 + stable * 200);
    
    // Draw corridor panels
    for (let i = 0; i < 12; i++) {
      const z = i * 180 - 400 - this.cameraZ + stable * 200;
      if (z <= 50) continue;
      if (z > 2000) continue;
      
      const scale = 800 / z;
      const spacing = 250 * scale;
      
      // Left panel
      this.drawCorridorPanel(
        this.canvas.width / 2 - spacing,
        this.canvas.height / 2,
        200 * scale,
        200 * scale,
        baseOpacity * Math.min(1, 1000 / z),
        i
      );
      
      // Right panel
      this.drawCorridorPanel(
        this.canvas.width / 2 + spacing,
        this.canvas.height / 2,
        200 * scale,
        200 * scale,
        baseOpacity * Math.min(1, 1000 / z),
        i
      );
      
      // Particle streams
      if (stable > 0) {
        this.drawParticleStream(spacing, z, baseOpacity, i);
      }
    }
    
    this.ctx.restore();
  }

  private drawCorridorPanel(x: number, y: number, width: number, height: number, opacity: number, index: number) {
    this.ctx.save();
    this.ctx.translate(x, y);
    
    // Outer border
    this.ctx.strokeStyle = `rgba(45, 212, 191, ${opacity * 0.6})`;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(-width / 2, -height / 2, width, height);
    
    // Inner design
    this.ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.4})`;
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(-width / 2 + 10, -height / 2 + 10, width - 20, height - 20);
    
    // Diagonal lines
    this.ctx.beginPath();
    this.ctx.moveTo(-width / 2 + 10, -height / 2 + 10);
    this.ctx.lineTo(width / 2 - 10, height / 2 - 10);
    this.ctx.moveTo(width / 2 - 10, -height / 2 + 10);
    this.ctx.lineTo(-width / 2 + 10, height / 2 - 10);
    this.ctx.stroke();
    
    this.ctx.restore();
  }

  private drawParticleStream(spacing: number, z: number, opacity: number, index: number) {
    const scale = 800 / z;
    const particleCount = 5;
    const time = this.currentTime * 0.001;
    
    for (let i = 0; i < particleCount; i++) {
      const progress = (time * 0.5 + i * 0.2 + index * 0.1) % 1;
      const x = this.canvas.width / 2 + (Math.random() - 0.5) * spacing * 2;
      const y = this.canvas.height / 2 + (progress - 0.5) * 400 * scale;
      
      const particleOpacity = opacity * (1 - Math.abs(progress - 0.5) * 2) * 0.6;
      
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 3 * scale);
      gradient.addColorStop(0, `rgba(45, 212, 191, ${particleOpacity})`);
      gradient.addColorStop(1, `rgba(45, 212, 191, 0)`);
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3 * scale, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  // Stage 6: Rotating sphere (11.5-15s)
  private renderSphere(stageProgress: number) {
    const fadeIn = this.getStageProgress(11500, 12500);
    const stable = this.getStageProgress(12500, 15000);
    
    if (fadeIn === 0) return;

    const opacity = this.easeInOutCubic(fadeIn);
    
    this.ctx.save();
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const baseRadius = 120 + fadeIn * 40;
    
    this.sphereRotation += 0.005;
    
    // Draw sphere structure with latitude/longitude lines
    const latitudes = 8;
    const longitudes = 12;
    
    this.ctx.strokeStyle = `rgba(45, 212, 191, ${opacity * 0.6})`;
    this.ctx.lineWidth = 1.5;
    
    // Latitude circles
    for (let lat = 0; lat < latitudes; lat++) {
      const angle = (Math.PI / latitudes) * lat;
      const y = Math.cos(angle);
      const radius = Math.sin(angle) * baseRadius;
      
      this.ctx.beginPath();
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2 + this.sphereRotation;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        const screenX = centerX + x;
        const screenY = centerY + y * baseRadius - z * 0.3;
        
        if (i === 0) {
          this.ctx.moveTo(screenX, screenY);
        } else {
          this.ctx.lineTo(screenX, screenY);
        }
      }
      this.ctx.stroke();
    }
    
    // Longitude circles
    for (let lon = 0; lon < longitudes; lon++) {
      const phi = (Math.PI * 2 / longitudes) * lon + this.sphereRotation;
      
      this.ctx.beginPath();
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        const x = Math.cos(phi) * Math.sin(theta) * baseRadius;
        const y = Math.cos(theta) * baseRadius;
        const z = Math.sin(phi) * Math.sin(theta) * baseRadius;
        
        const screenX = centerX + x;
        const screenY = centerY + y - z * 0.3;
        
        if (i === 0) {
          this.ctx.moveTo(screenX, screenY);
        } else {
          this.ctx.lineTo(screenX, screenY);
        }
      }
      this.ctx.stroke();
    }
    
    // Core glow
    const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius * 1.5);
    gradient.addColorStop(0, `rgba(45, 212, 191, ${opacity * 0.3})`);
    gradient.addColorStop(0.3, `rgba(13, 40, 71, ${opacity * 0.2})`);
    gradient.addColorStop(0.6, `rgba(45, 212, 191, ${opacity * 0.1})`);
    gradient.addColorStop(1, 'rgba(45, 212, 191, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, baseRadius * 1.5, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Emit structured light waves
    if (stable > 0) {
      const waveCount = 4;
      const time = this.currentTime * 0.001;
      
      for (let i = 0; i < waveCount; i++) {
        const waveProgress = (time * 0.5 + i * 0.25) % 1;
        const waveRadius = baseRadius + waveProgress * 200;
        const waveOpacity = opacity * (1 - waveProgress) * 0.4;
        
        this.ctx.strokeStyle = `rgba(45, 212, 191, ${waveOpacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Add structured light beams
        for (let j = 0; j < 8; j++) {
          const angle = (Math.PI * 2 / 8) * j + this.sphereRotation * 0.5;
          const startX = centerX + Math.cos(angle) * baseRadius;
          const startY = centerY + Math.sin(angle) * baseRadius;
          const endX = centerX + Math.cos(angle) * waveRadius;
          const endY = centerY + Math.sin(angle) * waveRadius;
          
          const beamGradient = this.ctx.createLinearGradient(startX, startY, endX, endY);
          beamGradient.addColorStop(0, `rgba(148, 163, 184, ${waveOpacity * 0.6})`);
          beamGradient.addColorStop(1, 'rgba(148, 163, 184, 0)');
          
          this.ctx.strokeStyle = beamGradient;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(startX, startY);
          this.ctx.lineTo(endX, endY);
          this.ctx.stroke();
        }
      }
    }
    
    this.ctx.restore();
  }

  private render = () => {
    this.currentTime = Date.now() - this.startTime;
    const progress = Math.min(this.currentTime / this.duration, 1);
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw gradient background
    this.drawGradientBackground(progress);
    
    // Render stages based on timeline
    // Stage 1: Waves (0-2.5s)
    if (this.currentTime < 2500) {
      this.renderWaves(progress);
    }
    
    // Stage 2: Particles (2-5s)
    if (this.currentTime >= 2000 && this.currentTime < 7000) {
      this.renderParticles(progress);
    }
    
    // Stage 3: Network (4.5-7.5s)
    if (this.currentTime >= 4500 && this.currentTime < 7500) {
      this.renderNetwork(progress);
    }
    
    // Stage 4: Panels (7-10s)
    if (this.currentTime >= 7000 && this.currentTime < 10000) {
      this.renderPanels(progress);
    }
    
    // Stage 5: Corridor (9.5-12s)
    if (this.currentTime >= 9500 && this.currentTime < 12000) {
      this.renderCorridor(progress);
    }
    
    // Stage 6: Sphere (11.5-15s)
    if (this.currentTime >= 11500) {
      this.renderSphere(progress);
    }
    
    // Loop animation
    if (this.currentTime >= this.duration) {
      this.restart();
    }
    
    this.animationFrame = requestAnimationFrame(this.render);
  };

  public start() {
    this.startTime = Date.now();
    this.render();
  }

  public stop() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  public restart() {
    this.startTime = Date.now();
    this.currentTime = 0;
    this.sphereRotation = 0;
    this.cameraZ = 0;
  }

  public updateScrollProgress(progress: number, scrollY: number) {
    this.scrollProgress = progress;
    this.scrollY = scrollY;
  }
}