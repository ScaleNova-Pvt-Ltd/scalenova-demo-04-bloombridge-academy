/**
 * ScaleNova EliteOS — Demo 04: Bloombridge Academy
 * Interactive Academic Program & Curriculum Explorer (src/components/curriculum-filter.js)
 * Architecture: Modern Institutional + Academic Technology (Style F)
 * Features: Instant search, category filters, duration filtering, detailed syllabus drawer, empty states
 */

(function () {
  'use strict';

  const ACADEMIC_PROGRAMS = [
    {
      id: 'fintech-systems',
      title: 'Ultra-Low Latency FinTech Systems',
      category: 'fintech',
      categoryLabel: 'FinTech & Capital Markets',
      duration: '14 Weeks',
      format: 'Weekend Intensive',
      level: 'Senior Principal',
      badge: 'HIGH DEMAND',
      summary: 'Master kernel-bypass networking (Solarflare OpenOnload), lock-free ring buffers in C++/Rust, distributed Raft consensus, and sub-millisecond matching engine architecture.',
      skills: ['C++20', 'Rust', 'Kernel-Bypass', 'Raft Consensus', 'Solarflare OpenOnload', 'LSM-Trees'],
      tuition: '₹3,85,000',
      fellowship: 'Up to 60% Merit Grants available',
      modules: [
        { title: 'Module 01: Hardware Micro-Architecture & Memory Hierarchy', desc: 'L1/L2/L3 cache misses, branch predictors, SIMD vectorization, and NUMA-aware allocation.' },
        { title: 'Module 02: Kernel-Bypass Networking & Socket Acceleration', desc: 'Solarflare EF_VI, DPDK architecture, zero-copy packet rings, and TCP window optimization.' },
        { title: 'Module 03: Lock-Free Concurrency & Memory Models', desc: 'C++ memory ordering (acquire/release/seq_cst), CAS primitives, and bounded lock-free queues.' },
        { title: 'Module 04: Matching Engine & Order Book Architecture', desc: 'L2/L3 depth order book building, deterministic replay logging, and FIX/FAST parser optimization.' }
      ]
    },
    {
      id: 'autonomous-ai',
      title: 'Autonomous Systems & Embodied AI',
      category: 'autonomous-ai',
      categoryLabel: 'Autonomous AI & Robotics',
      duration: '16 Weeks',
      format: 'Full-Time Immersive',
      level: 'Advanced Graduate',
      badge: 'FRONTIER LAB',
      summary: 'Design end-to-end perception, planning, and control pipelines for autonomous mobile robots and quadrupeds using ROS2, NVIDIA Isaac Sim, and neuro-symbolic SLAM.',
      skills: ['ROS 2', 'NVIDIA Isaac Sim', 'PyTorch', 'SLAM', 'Model Predictive Control', 'CUDA'],
      tuition: '₹4,20,000',
      fellowship: 'NVIDIA Hardware Sponsored Lab Access',
      modules: [
        { title: 'Module 01: 3D Perception & Point Cloud Processing', desc: 'LiDAR-camera sensor fusion, Kalman filtering, and real-time voxel occupancy grids.' },
        { title: 'Module 02: Neuro-Symbolic Visual SLAM', desc: 'Graph-based optimization, loop closure detection, and dense photometric mapping.' },
        { title: 'Module 03: Trajectory Planning & Model Predictive Control (MPC)', desc: 'Convex optimization, collision avoidance fields, and dynamic obstacle trajectory prediction.' },
        { title: 'Module 04: Sim-to-Real Transfer & Hardware Deployment', desc: 'Domain randomization, Jetson Orin real-time inference, and motor controller tuning.' }
      ]
    },
    {
      id: 'distributed-systems',
      title: 'Distributed Systems & Cloud Core Architecture',
      category: 'systems',
      categoryLabel: 'Systems & Infrastructure',
      duration: '12 Weeks',
      format: 'Executive Evening',
      level: 'Principal Architect',
      badge: 'ENTERPRISE CORE',
      summary: 'Build fault-tolerant distributed storage and consensus engines. Deep dive into Paxos, Raft, Byzantine fault tolerance, sharded replication, and LSM storage engines.',
      skills: ['Go', 'Rust', 'Raft', 'Paxos', 'Distributed Transactions', 'gRPC / Protobuf'],
      tuition: '₹3,40,000',
      fellowship: 'Corporate Sponsored Enrollment',
      modules: [
        { title: 'Module 01: Consensus Foundations (Paxos to Raft)', desc: 'Leader election, log replication, membership changes, and split-brain resolution.' },
        { title: 'Module 02: Distributed Storage Engines & LSM-Trees', desc: 'Memtables, WAL durability, SSTables, compaction strategies, and Bloom filters.' },
        { title: 'Module 03: Distributed Transactions & Two-Phase Commit', desc: 'Spanner-style TrueTime, Percolator transactions, MVCC, and snapshot isolation.' },
        { title: 'Module 04: Chaos Engineering & Failure Injection', desc: 'Jepsen test suites, network partitions, disk corruptions, and high-availability verification.' }
      ]
    },
    {
      id: 'computational-genomics',
      title: 'Computational Genomics & Bio-Informatics',
      category: 'genomics',
      categoryLabel: 'Computational Life Sciences',
      duration: '16 Weeks',
      format: 'Hybrid Research',
      level: 'Post-Graduate / Scientist',
      badge: 'RESEARCH TRACK',
      summary: 'Leverage machine learning and structural biology algorithms to analyze genomic sequences, predict protein fold complexes (AlphaFold3), and accelerate drug discovery.',
      skills: ['AlphaFold', 'BioPython', 'Cryo-EM Processing', 'Next-Gen Sequencing', 'HPC Clusters'],
      tuition: '₹3,95,000',
      fellowship: 'Dean Fellowship for Life Sciences',
      modules: [
        { title: 'Module 01: Next-Generation Sequence Alignment Algorithms', desc: 'Burrows-Wheeler Transform, FM-index, variant calling pipelines, and VCF analysis.' },
        { title: 'Module 02: Deep Learning in Macromolecular Structure', desc: 'Attention networks in structural biology, MSA processing, and folding confidence metrics.' },
        { title: 'Module 03: Molecular Dynamics & Ligand Docking', desc: 'GROMACS HPC workflows, free-energy perturbation calculations, and binding affinity scoring.' },
        { title: 'Module 04: Clinical Genomic Pipelines & DPDP Compliance', desc: 'Secure genomic enclaves, differential privacy in bioinformatics, and FDA/CDSCO validation.' }
      ]
    },
    {
      id: 'enterprise-ai-platform',
      title: 'Enterprise AI Platform & LLMOps Engineering',
      category: 'systems',
      categoryLabel: 'Systems & Infrastructure',
      duration: '12 Weeks',
      format: 'Weekend Intensive',
      level: 'Senior Staff Engineer',
      badge: 'INDUSTRY STANDARD',
      summary: 'Architect scalable AI inference and training clusters. Master vLLM continuous batching, TensorRT-LLM, Ray clusters, speculative decoding, and quantized model serving.',
      skills: ['vLLM', 'TensorRT-LLM', 'Kubernetes', 'Ray', 'Triton Server', 'FlashAttention-3'],
      tuition: '₹3,60,000',
      fellowship: 'Corporate Sponsorship Approved',
      modules: [
        { title: 'Module 01: High-Throughput Inference Engines', desc: 'PagedAttention, continuous batching, chunked prefill, and multi-GPU tensor parallelism.' },
        { title: 'Module 02: Model Quantization & Kernel Optimization', desc: 'AWQ, GPTQ, FP8 execution on NVIDIA Ada/Hopper, and custom Triton GPU kernels.' },
        { title: 'Module 03: Distributed Training & Ray Cluster Orchestration', desc: 'FSDP, DeepSpeed ZeRO-3, pipeline parallelism, and Spot instance fault tolerance.' },
        { title: 'Module 04: Production Observability & Guardrails', desc: 'Latency P99 tracing, token streaming backpressure, semantic firewalls, and red-teaming.' }
      ]
    }
  ];

  class CurriculumExplorer {
    constructor() {
      this.programs = ACADEMIC_PROGRAMS;
      this.activeCategory = 'all';
      this.searchQuery = '';
      this.mountEl = document.getElementById('curriculum-explorer-mount') || document.querySelector('.curriculum-explorer-mount');
      this.drawerEl = null;

      this.init();
    }

    init() {
      if (!this.mountEl) {
        // Find existing program cards container on programs.html or index.html
        const existingContainer = document.querySelector('.academic-programs-grid') || document.querySelector('.programs-container');
        if (existingContainer) {
          this.mountEl = existingContainer;
        }
      }

      this.buildDrawerDOM();
      this.renderExplorerUI();
      this.bindEvents();
    }

    buildDrawerDOM() {
      if (document.getElementById('curriculum-syllabus-drawer')) return;

      const drawer = document.createElement('div');
      drawer.id = 'curriculum-syllabus-drawer';
      drawer.className = 'curriculum-drawer-overlay';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      drawer.setAttribute('aria-label', 'Program Syllabus & Curriculum Specification');
      drawer.style.display = 'none';

      drawer.innerHTML = `
        <div class="curriculum-drawer-backdrop" data-action="close-drawer"></div>
        <div class="curriculum-drawer-panel">
          <div class="drawer-header">
            <div>
              <span id="drawer-badge" class="drawer-badge">ACADEMIC SPECIFICATION</span>
              <h3 id="drawer-title" class="drawer-title"></h3>
            </div>
            <button type="button" class="drawer-close-btn" data-action="close-drawer" aria-label="Close Syllabus Drawer">&times;</button>
          </div>

          <div class="drawer-body">
            <div class="drawer-meta-grid">
              <div class="drawer-meta-card">
                <span class="meta-label">DURATION</span>
                <span id="drawer-duration" class="meta-val"></span>
              </div>
              <div class="drawer-meta-card">
                <span class="meta-label">FORMAT</span>
                <span id="drawer-format" class="meta-val"></span>
              </div>
              <div class="drawer-meta-card">
                <span class="meta-label">ELIGIBILITY</span>
                <span id="drawer-level" class="meta-val"></span>
              </div>
              <div class="drawer-meta-card">
                <span class="meta-label">TUITION</span>
                <span id="drawer-tuition" class="meta-val"></span>
              </div>
            </div>

            <div style="margin-top: 24px;">
              <h4 style="font-family: var(--font-heading); color: #1E1B4B; font-size: 1.15rem; margin-bottom: 8px;">Curriculum Overview</h4>
              <p id="drawer-summary" style="color: #0F172A; font-size: 0.92rem; line-height: 1.7;"></p>
            </div>

            <div style="margin-top: 24px;">
              <h4 style="font-family: var(--font-heading); color: #1E1B4B; font-size: 1.15rem; margin-bottom: 12px;">Core Technical Competencies</h4>
              <div id="drawer-skills" class="drawer-skills-wrap"></div>
            </div>

            <div style="margin-top: 28px;">
              <h4 style="font-family: var(--font-heading); color: #1E1B4B; font-size: 1.15rem; margin-bottom: 16px;">Syllabus Modules & Lab Work</h4>
              <div id="drawer-modules" class="drawer-modules-list"></div>
            </div>

            <div class="drawer-grant-notice" id="drawer-grant"></div>
          </div>

          <div class="drawer-footer">
            <button type="button" class="btn btn-secondary" data-action="close-drawer">Close Specification</button>
            <a href="admissions.html" class="btn btn-primary" style="background: #800020; color: #FFF;">Submit Admission Application &rarr;</a>
          </div>
        </div>
      `;

      const style = document.createElement('style');
      style.textContent = `
        .curriculum-drawer-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          justify-content: flex-end;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .curriculum-drawer-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }
        .curriculum-drawer-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
        }
        .curriculum-drawer-panel {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 640px;
          height: 100vh;
          background: #FFFFFF;
          box-shadow: -16px 0 48px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .curriculum-drawer-overlay.active .curriculum-drawer-panel {
          transform: translateX(0);
        }
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 28px;
          border-bottom: 1px solid #E2E8F0;
          background: #F8FAFC;
        }
        .drawer-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #800020;
          background: rgba(128, 0, 32, 0.08);
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .drawer-title {
          font-family: var(--font-heading, serif);
          font-size: 1.45rem;
          color: #1E1B4B;
          margin: 0;
        }
        .drawer-close-btn {
          background: transparent;
          border: none;
          font-size: 2rem;
          line-height: 1;
          color: #1E293B;
          cursor: pointer;
          padding: 0 4px;
        }
        .drawer-close-btn:hover {
          color: #0F172A;
        }
        .drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px 28px;
        }
        .drawer-meta-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .drawer-meta-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 12px 16px;
          border-radius: 6px;
        }
        .meta-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          color: #1E293B;
          letter-spacing: 0.05em;
        }
        .meta-val {
          display: block;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1E1B4B;
          margin-top: 4px;
        }
        .drawer-skills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .drawer-skill-tag {
          font-size: 0.78rem;
          font-weight: 600;
          background: #EEF2F6;
          color: #1E293B;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid #CBD5E1;
        }
        .drawer-modules-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .module-item {
          background: #FAFAFA;
          border: 1px solid #E2E8F0;
          border-left: 3px solid #800020;
          padding: 14px 18px;
          border-radius: 0 6px 6px 0;
        }
        .module-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
        }
        .module-desc {
          font-size: 0.82rem;
          color: #0F172A;
          line-height: 1.5;
        }
        .drawer-grant-notice {
          margin-top: 24px;
          background: #FEF3C7;
          border: 1px solid #F59E0B;
          color: #92400E;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .drawer-footer {
          padding: 16px 28px;
          border-top: 1px solid #E2E8F0;
          background: #F8FAFC;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        /* Explorer Controls Bar */
        .curriculum-controls-bar {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }
        .curriculum-search-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 0.95rem;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          margin-bottom: 16px;
          font-family: inherit;
        }
        .curriculum-search-input:focus {
          outline: none;
          border-color: #800020;
          box-shadow: 0 0 0 3px rgba(128, 0, 32, 0.12);
        }
        .curriculum-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        .curriculum-filter-pill {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #0F172A;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .curriculum-filter-pill:hover {
          background: #E2E8F0;
          color: #0F172A;
        }
        .curriculum-filter-pill.active {
          background: #800020;
          color: #FFFFFF;
          border-color: #800020;
        }
        .curriculum-results-counter {
          font-size: 0.85rem;
          color: #1E293B;
          margin-top: 14px;
          font-weight: 500;
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(drawer);
      this.drawerEl = drawer;
    }

    renderExplorerUI() {
      // Find or build the control bar if on programs.html
      const mountPoint = document.getElementById('curriculum-filter-root') || document.querySelector('.curriculum-explorer-mount');
      if (mountPoint) {
        mountPoint.innerHTML = `
          <div class="curriculum-controls-bar">
            <input type="text" class="curriculum-search-input" id="curriculum-search-box" placeholder="Search curriculum tracks by keyword (e.g. C++, Rust, SLAM, Raft, AlphaFold, MLOps)..." aria-label="Search Academic Programs">
            <div class="curriculum-pills-row" role="tablist" aria-label="Program Disciplines">
              <button type="button" class="curriculum-filter-pill active" data-category="all">All Disciplines</button>
              <button type="button" class="curriculum-filter-pill" data-category="fintech">Low-Latency FinTech</button>
              <button type="button" class="curriculum-filter-pill" data-category="autonomous-ai">Autonomous AI & Robotics</button>
              <button type="button" class="curriculum-filter-pill" data-category="systems">Systems & Cloud Architecture</button>
              <button type="button" class="curriculum-filter-pill" data-category="genomics">Computational Genomics</button>
            </div>
            <div class="curriculum-results-counter" id="curriculum-count" aria-live="polite">Showing 5 academic programs</div>
          </div>
          <div class="curriculum-program-cards-grid" id="curriculum-cards-container"></div>
        `;
        this.renderCards();
      }
    }

    renderCards() {
      const container = document.getElementById('curriculum-cards-container');
      if (!container) return;

      const filtered = this.programs.filter((p) => {
        const matchesCategory = this.activeCategory === 'all' || p.category === this.activeCategory;
        const q = this.searchQuery.toLowerCase().trim();
        const matchesSearch = !q ||
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
      });

      const countEl = document.getElementById('curriculum-count');
      if (countEl) {
        countEl.textContent = `Showing ${filtered.length} of ${this.programs.length} academic programs`;
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 8px;">
            <p style="font-size: 1.1rem; color: #0F172A; margin-bottom: 12px; font-weight: 500;">No curriculum tracks match your criteria.</p>
            <p style="font-size: 0.88rem; color: #1E293B; margin-bottom: 20px;">Try searching for "C++", "AI", "Raft", or reset the category filters.</p>
            <button type="button" class="btn btn-secondary" id="btn-reset-filters">Reset All Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('btn-reset-filters');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            this.activeCategory = 'all';
            this.searchQuery = '';
            const searchInput = document.getElementById('curriculum-search-box');
            if (searchInput) searchInput.value = '';
            document.querySelectorAll('.curriculum-filter-pill').forEach((btn) => {
              btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
            });
            this.renderCards();
          });
        }
        return;
      }

      container.innerHTML = filtered.map((prog) => `
        <article class="card" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid #800020; padding: 28px; background: #FFF; border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); margin-bottom: 24px;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
              <span class="chip chip-crimson">${prog.duration.toUpperCase()} &bull; ${prog.format.toUpperCase()}</span>
              <span style="font-size: 0.75rem; font-weight: 700; color: #800020; background: rgba(128,0,32,0.08); padding: 3px 8px; border-radius: 3px;">${prog.badge}</span>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.45rem; color: #1E1B4B; margin: 0 0 10px;">${prog.title}</h3>
            <p style="color: #0F172A; font-size: 0.92rem; line-height: 1.7; margin-bottom: 20px;">${prog.summary}</p>
            
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px;">
              ${prog.skills.map((s) => `<span class="drawer-skill-tag">${s}</span>`).join('')}
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E2E8F0; padding-top: 18px; flex-wrap: wrap; gap: 12px;">
            <div>
              <span style="font-size: 0.72rem; color: #1E293B; display: block; font-weight: 600;">FELLOWSHIP TUITION</span>
              <strong style="color: #0F172A; font-size: 1.1rem;">${prog.tuition}</strong>
            </div>
            <div style="display: flex; gap: 10px;">
              <button type="button" class="btn btn-outline" style="font-size: 0.82rem; padding: 8px 14px; border-color: #800020; color: #800020;" data-open-syllabus="${prog.id}">
                Inspect Syllabus &rarr;
              </button>
              <a href="admissions.html" class="btn btn-primary" style="background: #800020; color: #FFF; font-size: 0.82rem; padding: 8px 14px;">
                Apply Now
              </a>
            </div>
          </div>
        </article>
      `).join('');

      // Bind syllabus inspect buttons
      container.querySelectorAll('[data-open-syllabus]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const progId = btn.getAttribute('data-open-syllabus');
          this.openDrawer(progId);
        });
      });
    }

    bindEvents() {
      // Global click handler for syllabus drawer triggers
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-syllabus]');
        if (trigger) {
          e.preventDefault();
          const progId = trigger.getAttribute('data-open-syllabus');
          this.openDrawer(progId);
        }

        const closeBtn = e.target.closest('[data-action="close-drawer"]');
        if (closeBtn) {
          e.preventDefault();
          this.closeDrawer();
        }
      });

      // Filter pills click
      document.addEventListener('click', (e) => {
        const pill = e.target.closest('.curriculum-filter-pill');
        if (pill) {
          document.querySelectorAll('.curriculum-filter-pill').forEach((p) => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeCategory = pill.getAttribute('data-category') || 'all';
          this.renderCards();
        }
      });

      // Search input debounced
      const searchBox = document.getElementById('curriculum-search-box');
      if (searchBox) {
        let timeout = null;
        searchBox.addEventListener('input', (e) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            this.searchQuery = e.target.value;
            this.renderCards();
          }, 150);
        });
      }

      // Keyboard escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.drawerEl && this.drawerEl.classList.contains('active')) {
          this.closeDrawer();
        }
      });
    }

    openDrawer(progId) {
      const prog = this.programs.find((p) => p.id === progId) || this.programs[0];
      if (!prog || !this.drawerEl) return;

      document.getElementById('drawer-title').textContent = prog.title;
      document.getElementById('drawer-duration').textContent = prog.duration;
      document.getElementById('drawer-format').textContent = prog.format;
      document.getElementById('drawer-level').textContent = prog.level;
      document.getElementById('drawer-tuition').textContent = prog.tuition;
      document.getElementById('drawer-summary').textContent = prog.summary;
      document.getElementById('drawer-grant').textContent = `Fellowship Grant: ${prog.fellowship}`;

      const skillsContainer = document.getElementById('drawer-skills');
      if (skillsContainer) {
        skillsContainer.innerHTML = prog.skills.map((s) => `<span class="drawer-skill-tag">${s}</span>`).join('');
      }

      const modulesContainer = document.getElementById('drawer-modules');
      if (modulesContainer) {
        modulesContainer.innerHTML = prog.modules.map((m) => `
          <div class="module-item">
            <div class="module-title">${m.title}</div>
            <div class="module-desc">${m.desc}</div>
          </div>
        `).join('');
      }

      this.drawerEl.style.display = 'flex';
      void this.drawerEl.offsetWidth;
      this.drawerEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    closeDrawer() {
      if (!this.drawerEl) return;
      this.drawerEl.classList.remove('active');
      setTimeout(() => {
        if (!this.drawerEl.classList.contains('active')) {
          this.drawerEl.style.display = 'none';
        }
      }, 350);
      document.body.style.overflow = '';
    }
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.curriculumExplorer = new CurriculumExplorer();
    });
  } else {
    window.curriculumExplorer = new CurriculumExplorer();
  }
})();
