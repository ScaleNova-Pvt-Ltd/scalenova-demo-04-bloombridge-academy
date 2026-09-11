/**
 * ScaleNova EliteOS — Demo 04: Bloombridge Academy
 * Interactive Skills & Competency Matrix Canvas
 */

export class SkillsMatrixCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.mouse = { x: -1000, y: -1000 };
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    this.createNodes();
    window.addEventListener('resize', () => {
      this.resize();
      this.createNodes();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth || window.innerWidth;
    this.height = this.canvas.parentElement.clientHeight || 480;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  createNodes() {
    this.nodes = [];
    const labels = [
      'Generative AI & Agentic Systems', 'Cloud & Kubernetes Architecture',
      'Quantitative FinTech', 'Distributed Ledger Consensus',
      'Executive Technology Strategy', 'Enterprise MLOps & LLMOps',
      'Advanced Product Engineering', 'Autonomous Automation'
    ];

    const count = labels.length;
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.36;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      this.nodes.push({
        baseX: cx + Math.cos(angle) * radius,
        baseY: cy + Math.sin(angle) * radius,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        label: labels[i],
        angle: angle,
        pulseOffset: i * 0.7
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const cx = this.width / 2;
    const cy = this.height / 2;

    // Draw central hub
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    this.ctx.fillStyle = '#7C3AED';
    this.ctx.fill();

    // Subtle concentric radar rings
    [0.35, 0.7, 1.0].forEach((ratio) => {
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, Math.min(this.width, this.height) * 0.36 * ratio, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'rgba(124, 58, 237, 0.08)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });

    // Connect nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i];
      const b = this.nodes[(i + 1) % this.nodes.length];
      const c = this.nodes[(i + 3) % this.nodes.length];

      // Outer polygon
      this.ctx.beginPath();
      this.ctx.moveTo(a.x, a.y);
      this.ctx.lineTo(b.x, b.y);
      this.ctx.strokeStyle = 'rgba(124, 58, 237, 0.25)';
      this.ctx.lineWidth = 1.2;
      this.ctx.stroke();

      // Cross chord
      this.ctx.beginPath();
      this.ctx.moveTo(a.x, a.y);
      this.ctx.lineTo(c.x, c.y);
      this.ctx.strokeStyle = 'rgba(236, 72, 153, 0.12)';
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();

      // Hub spoke
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy);
      this.ctx.lineTo(a.x, a.y);
      this.ctx.strokeStyle = 'rgba(124, 58, 237, 0.12)';
      this.ctx.stroke();
    }

    // Render node points and typography
    this.nodes.forEach((node) => {
      // Gentle orbit float
      node.x = node.baseX + Math.cos(this.time * 0.002 + node.pulseOffset) * 8;
      node.y = node.baseY + Math.sin(this.time * 0.002 + node.pulseOffset) * 8;

      // Mouse interactive push
      const dx = node.x - this.mouse.x;
      const dy = node.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        node.x += (dx / dist) * force * 18;
        node.y += (dy / dist) * force * 18;
      }

      // Outer glow pulse
      const pulse = Math.sin(this.time * 0.004 + node.pulseOffset) * 2;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 7 + pulse, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(124, 58, 237, 0.2)';
      this.ctx.fill();

      // Core point
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = '#EC4899';
      this.ctx.fill();

      // Text label
      this.ctx.font = '600 11px Outfit, sans-serif';
      this.ctx.fillStyle = '#1F1A3A';
      const align = node.x > cx ? 'left' : 'right';
      this.ctx.textAlign = align;
      const textOffset = node.x > cx ? 14 : -14;
      this.ctx.fillText(node.label, node.x + textOffset, node.y + 4);
    });
  }

  animate() {
    this.time += 1;
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}
