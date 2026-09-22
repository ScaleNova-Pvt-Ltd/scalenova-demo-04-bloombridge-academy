/**
 * ScaleNova EliteOS — Demo 04: Bloombridge Academy
 * Ambient 3D Academic Matrix & Geometric Skills Canvas
 */

class AcademicMatrixCanvas {
  constructor(canvasId = 'academic-matrix-canvas') {
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

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * (window.devicePixelRatio || 1);
    this.canvas.height = this.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  createNodes() {
    this.nodes = [];
    const count = Math.min(32, Math.floor(this.width / 50));
    const labels = [
      'Agentic AI', 'Quantum Computing', 'Distributed Consensus', 'Bio-Informatics',
      'Advanced Econometrics', 'Autonomous Robotics', 'Cloud Microkernels', 'Neuro-Symbolic Logic',
      'Stochastic Modeling', 'MLOps Infrastructure', 'Cyber Physical Systems', 'Computational Physics'
    ];

    for (let i = 0; i < count; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        z: Math.random() * 400 + 100,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.2,
        label: labels[i % labels.length],
        size: Math.random() * 2.5 + 2,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const fov = 400;
    const cx = this.width / 2;
    const cy = this.height / 2;

    // Draw subtle scholastic matrix grid lines
    this.ctx.strokeStyle = 'rgba(128, 0, 32, 0.025)';
    this.ctx.lineWidth = 1;
    const step = 80;
    for (let x = 0; x < this.width; x += step) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += step) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    // Update node physics
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      node.x += node.vx;
      node.y += node.vy;
      node.z += node.vz;

      // Mouse gravity
      const dx = this.mouse.x - node.x;
      const dy = this.mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180 && dist > 1) {
        node.x += (dx / dist) * 0.4;
        node.y += (dy / dist) * 0.4;
      }

      // Boundaries
      if (node.x < 0) node.x = this.width;
      if (node.x > this.width) node.x = 0;
      if (node.y < 0) node.y = this.height;
      if (node.y > this.height) node.y = 0;
      if (node.z < 80) node.z = 500;
      if (node.z > 500) node.z = 80;

      // Projection
      const scale = fov / (fov + node.z);
      node.projX = cx + (node.x - cx) * scale;
      node.projY = cy + (node.y - cy) * scale;
      node.projSize = node.size * scale;
    }

    // Connect near nodes
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        const dist = Math.hypot(n1.projX - n2.projX, n1.projY - n2.projY);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.16;
          this.ctx.beginPath();
          this.ctx.moveTo(n1.projX, n1.projY);
          this.ctx.lineTo(n2.projX, n2.projY);
          this.ctx.strokeStyle = `rgba(128, 0, 32, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }

    // Render nodes and academic badges
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const pulse = Math.sin(this.time * 0.03 + node.pulseOffset) * 1.5;

      // Outer aura
      this.ctx.beginPath();
      this.ctx.arc(node.projX, node.projY, node.projSize * 2.2 + pulse, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(217, 119, 6, 0.08)';
      this.ctx.fill();

      // Node core (Crimson/Burgundy)
      this.ctx.beginPath();
      this.ctx.arc(node.projX, node.projY, node.projSize, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(128, 0, 32, 0.7)';
      this.ctx.fill();

      // Micro label on closer nodes
      if (node.z < 240 && i % 2 === 0) {
        this.ctx.font = '500 10px Inter, sans-serif';
        this.ctx.fillStyle = 'rgba(80, 20, 30, 0.55)';
        this.ctx.fillText(node.label, node.projX + 8, node.projY + 3);
      }
    }
  }

  animate() {
    this.time += 1;
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Global auto-init
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('academic-matrix-canvas')) {
    window.academicCanvas = new AcademicMatrixCanvas('academic-matrix-canvas');
  } else if (document.getElementById('skillsMatrixCanvas')) {
    window.academicCanvas = new AcademicMatrixCanvas('skillsMatrixCanvas');
  }
});

// Support both ES module and global script
if (typeof window !== 'undefined') {
  window.AcademicMatrixCanvas = AcademicMatrixCanvas;
}
