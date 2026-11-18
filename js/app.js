/**
 * Portfolio Application Engine — Narindra Rackoto
 * Gère le thème sombre/clair, le canvas de particules IA, les modales interactives,
 * l'étude de cas FIARAmotion, la visionneuse de CV, le terminal et la palette de commande.
 */

// --- Synthétiseur Audio Web Audio API (Sons discrets optionnels) ---
class SoundFX {
  constructor() {
    this.enabled = localStorage.getItem('portfolio_sound') === 'true';
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('portfolio_sound', this.enabled);
    if (this.enabled) {
      this.init();
      this.playChime(600, 0.08);
    }
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playKey() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.04, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.2);
      });
    } catch (e) {}
  }

  playChime(freq = 520, duration = 0.1) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }
}

window.soundFX = new SoundFX();

// --- Canvas d'Arrière-Plan Interactif (Réseau de Particules & Neurones) ---
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 22 : 42;
  const maxDistance = isMobile ? 110 : 140;
  let mouse = { x: -1000, y: -1000, radius: 150 };
  let animationId = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 1.5;
        this.y -= (dy / dist) * force * 1.5;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = document.documentElement.classList.contains('dark') 
        ? 'rgba(56, 189, 248, 0.6)' 
        : 'rgba(37, 99, 235, 0.4)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    if (document.hidden) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains('dark');
    const strokeColor = isDark ? 'rgba(56, 189, 248,' : 'rgba(37, 99, 235,';

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * (isDark ? 0.18 : 0.1);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `${strokeColor} ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationId = requestAnimationFrame(animate);
  }
  animate();
}

// --- Initialisation Principale Robuste & Hash Routing ---
function checkUrlHash() {
  const hash = (window.location.hash || '').toLowerCase();
  if (hash === '#fiaramotion' || hash === '#case-study' || hash === '#projet-fiaramotion') {
    if (typeof window.openFlagshipModal === 'function') window.openFlagshipModal();
  } else if (hash === '#cv' || hash === '#resume' || hash === '#curriculum') {
    if (typeof window.openResumeModal === 'function') window.openResumeModal();
  }
}
window.addEventListener('hashchange', checkUrlHash);

function initAll() {
  initParticleCanvas();
  initTheme();
  initSoundToggle();
  initLiveClock();
  initNavigation();
  
  // Render Core Sections
  renderHeroData();
  renderAboutSection();
  renderSkillsSection();
  renderProjectsSection();
  renderExperiencesSection();
  renderEducationSection();
  renderCertificationsSection();

  // Interactive Form & Modals
  initContactForm();
  initCommandPalette();
  initResumeModal();
  initFlagshipCaseStudyModal();
  initLightboxModal();

  // Deep linking URL hash
  checkUrlHash();

  // Re-run Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize Terminal
  if (document.getElementById('terminal-card')) {
    window.activeTerminal = new PortfolioTerminal('terminal-card');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

// --- Gestion du Thème Sombre / Clair ---
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  // Default to Dark Mode as requested
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcons(savedTheme === 'dark');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      window.soundFX.playClick();
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
      showToast(isDark ? 'Mode sombre activé' : 'Mode clair activé', 'info');
    });
  }
}

function updateThemeIcons(isDark) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.innerHTML = `<i id="theme-icon" data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4"></i>`;
  if (window.lucide) window.lucide.createIcons();
}
window.updateThemeIcons = updateThemeIcons;

// --- Gestion des Effets Sonores ---
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle');
  if (!btn) return;

  function updateDisplay(enabled) {
    btn.innerHTML = `<i id="sound-icon" data-lucide="${enabled ? 'volume-2' : 'volume-x'}" class="w-4 h-4 ${enabled ? 'text-sky-400' : ''}"></i>`;
    if (enabled) {
      btn.classList.add('text-sky-400');
    } else {
      btn.classList.remove('text-sky-400');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  updateDisplay(window.soundFX.enabled);

  btn.addEventListener('click', () => {
    const state = window.soundFX.toggle();
    updateDisplay(state);
    showToast(state ? 'Sons d\'interface activés' : 'Sons d\'interface coupés', 'info');
  });
}

// --- Horloge en Temps Réel (Madagascar EAT / UTC+3) ---
function initLiveClock() {
  const clockEl = document.getElementById('local-clock');
  if (!clockEl) return;

  function update() {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Indian/Antananarivo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      clockEl.textContent = `${formatter.format(now)} EAT (Madagascar)`;
    } catch (e) {
      clockEl.textContent = 'UTC+3 (Madagascar)';
    }
  }

  update();
  setInterval(update, 1000);
}

// --- Navigation & Menu Mobile ---
function initNavigation() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      window.soundFX.playClick();
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Active section spy on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-sky-500', 'dark:text-sky-400', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-sky-500', 'dark:text-sky-400', 'font-bold');
      }
    });
  });
}

// --- Section 1: Hero Data Rendering ---
function renderHeroData() {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;
  const p = data.profile;

  // Name & Titles
  document.querySelectorAll('.profile-name').forEach(el => el.textContent = p.name);
  document.querySelectorAll('.profile-title').forEach(el => el.textContent = p.title);
  document.querySelectorAll('.profile-location').forEach(el => el.textContent = p.location);
  document.querySelectorAll('.profile-email').forEach(el => el.textContent = p.email);

  // Status Pill
  const statusEl = document.querySelector('.profile-status');
  if (statusEl && p.status) {
    statusEl.textContent = p.status.text;
  }

  // Profile Avatar
  const avatarImg = document.getElementById('hero-avatar-img');
  if (avatarImg) {
    avatarImg.src = p.avatarUrl;
    avatarImg.alt = `Photographie professionnelle — ${p.name}`;
  }
}

// --- Section 2: À Propos ---
function renderAboutSection() {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;
  const p = data.profile;

  // Qualities Grid
  const qualitiesContainer = document.getElementById('qualities-grid');
  if (qualitiesContainer && p.qualities) {
    qualitiesContainer.innerHTML = p.qualities.map(q => `
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-500/40 transition-all card-electric">
        <div class="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 dark:text-sky-400 flex items-center justify-center mb-3">
          <i data-lucide="${q.icon}" class="w-5 h-5"></i>
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1.5">${q.title}</h3>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${q.desc}</p>
      </div>
    `).join('');
  }
}

// --- Section 3: Compétences Techniques (Sans pourcentages inventés) ---
function renderSkillsSection() {
  const data = window.PORTFOLIO_DATA;
  if (!data || !data.skills) return;

  const container = document.getElementById('skills-container');
  const searchInput = document.getElementById('skills-search');
  const categories = data.skills.categories;

  function render(query = '') {
    if (!container) return;
    const cleanQuery = query.toLowerCase().trim();

    container.innerHTML = categories.map(cat => {
      const filteredItems = cleanQuery 
        ? cat.items.filter(item => 
            item.name.toLowerCase().includes(cleanQuery) || 
            item.badge.toLowerCase().includes(cleanQuery) || 
            item.tag.toLowerCase().includes(cleanQuery)
          )
        : cat.items;

      if (cleanQuery && filteredItems.length === 0) return '';

      return `
        <div class="p-6 rounded-2xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800/90 shadow-sm hover:border-sky-500/30 transition-all">
          <div class="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div class="w-10 h-10 rounded-xl bg-sky-500/10 ${cat.color} flex items-center justify-center">
              <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900 dark:text-white">${cat.name}</h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">${filteredItems.length} compétence${filteredItems.length > 1 ? 's' : ''}</p>
            </div>
          </div>
          
          <p class="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">${cat.description}</p>

          <div class="space-y-2.5">
            ${filteredItems.map(item => `
              <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200">${item.name}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">${item.badge}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/20 font-medium">
                    ${item.tag}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  render();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      render(e.target.value);
    });
  }
}

// --- Section 4: Projets Professionnels ---
function renderProjectsSection() {
  const data = window.PORTFOLIO_DATA;
  if (!data || !data.projects) return;

  const flagship = data.projects.flagship;
  const otherSlots = data.projects.otherSlots;

  // Render Flagship Project Card
  const flagshipContainer = document.getElementById('flagship-project-container');
  if (flagshipContainer && flagship) {
    flagshipContainer.innerHTML = `
      <div class="relative rounded-3xl bg-gradient-to-b from-[#0e172a] to-[#090e1a] border-2 border-sky-500/40 shadow-2xl p-6 sm:p-10 overflow-hidden card-electric">
        <!-- Background Ambient Glow -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          <!-- Left Flagship Description -->
          <div class="lg:col-span-7 space-y-6">
            
            <div class="flex flex-wrap items-center gap-2.5">
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 flex items-center gap-1.5 shadow-sm">
                <i data-lucide="star" class="w-3.5 h-3.5 text-sky-400"></i>
                PROJET MAJEUR • STAGE CERES
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                Application Déployée &amp; Évaluée
              </span>
            </div>

            <div>
              <h3 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                ${flagship.title}
              </h3>
              <p class="text-sm sm:text-base text-sky-400 font-semibold mt-1">
                ${flagship.subtitle}
              </p>
            </div>

            <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
              ${flagship.context}
            </p>

            <!-- Highlights Points -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              ${flagship.keyHighlights.map(point => `
                <div class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-sky-400 shrink-0 mt-0.5"></i>
                  <span>${point}</span>
                </div>
              `).join('')}
            </div>

            <!-- Tech Stack Pills -->
            <div class="flex flex-wrap gap-2 pt-2">
              ${flagship.stack.map(tech => `
                <span class="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800/90 text-slate-200 border border-slate-700/80 font-medium">
                  ${tech}
                </span>
              `).join('')}
            </div>

            <!-- Action CTAs -->
            <div class="flex flex-wrap items-center gap-3 pt-3">
              <button onclick="window.openFlagshipModal()" type="button" class="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <span>Découvrir l'Étude de Cas Complète</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>

              <button onclick="window.openLightbox('${flagship.gallery[0].image}', '${flagship.gallery[0].title}', '${flagship.gallery[0].desc}')" type="button" class="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 flex items-center gap-2 transition-colors">
                <i data-lucide="image" class="w-4 h-4 text-sky-400"></i>
                <span>Voir la Maquette Interactive</span>
              </button>
            </div>

          </div>

          <!-- Right Flagship Interactive Visual Preview -->
          <div class="lg:col-span-5">
            <div class="group relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl cursor-pointer" onclick="window.openFlagshipModal()">
              <img src="${flagship.gallery[0].image}" alt="${flagship.gallery[0].alt}" class="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300">
              
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span class="text-sky-300 font-bold bg-slate-950/80 px-2.5 py-1 rounded-md border border-sky-500/30">
                  Vue Dashboard CERES
                </span>
                <span class="text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <i data-lucide="maximize-2" class="w-3 h-3"></i> Agrandir
                </span>
              </div>
            </div>

            <!-- Notice de transparence -->
            <p class="text-[11px] text-slate-400 text-center mt-2 font-mono">
              ★ Conçu dans le cadre du stage de Master ENI pour le programme CERES.
            </p>
          </div>

        </div>
      </div>
    `;
  }

  // Render Other Modular Slots
  const otherGrid = document.getElementById('other-projects-grid');
  const filterBtns = document.querySelectorAll('.project-filter-btn');

  function renderSlots(filter = 'all') {
    if (!otherGrid) return;

    const filtered = filter === 'all' 
      ? otherSlots 
      : otherSlots.filter(s => s.categoryTag === filter);

    otherGrid.innerHTML = filtered.map(slot => `
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-sky-500/40 transition-all card-electric">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-[10px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
              ${slot.category}
            </span>
            <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <i data-lucide="layers" class="w-3 h-3"></i> Modulaire
            </span>
          </div>

          <h4 class="text-base font-bold text-slate-900 dark:text-white mb-2">
            ${slot.title}
          </h4>

          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            ${slot.description}
          </p>
        </div>

        <div>
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${slot.technologies.map(t => `
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                ${t}
              </span>
            `).join('')}
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span class="text-slate-500 dark:text-slate-400 font-mono text-[11px] italic">
              ${slot.status}
            </span>
            <span class="text-sky-500 font-medium">
              ${slot.actionLabel}
            </span>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  renderSlots('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundFX.playClick();
      filterBtns.forEach(b => b.classList.remove('bg-sky-500', 'text-white'));
      filterBtns.forEach(b => b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300'));
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      btn.classList.add('bg-sky-500', 'text-white');

      const filter = btn.getAttribute('data-filter') || 'all';
      renderSlots(filter);
    });
  });
}

// --- Section 5: Expériences Professionnelles ---
function renderExperiencesSection() {
  const data = window.PORTFOLIO_DATA;
  if (!data || !data.experiences) return;

  const container = document.getElementById('experience-timeline');
  if (!container) return;

  container.innerHTML = data.experiences.map((exp, index) => `
    <div class="relative pl-8 sm:pl-10 pb-12 last:pb-0 border-l-2 border-slate-200 dark:border-slate-800 group">
      
      <!-- Timeline Node Dot -->
      <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 dark:bg-slate-950 border-2 border-sky-400 group-hover:scale-125 transition-transform shadow-md shadow-sky-500/20"></div>

      <div class="p-6 rounded-2xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-500/30 transition-all card-electric">
        
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <span class="text-lg font-bold text-slate-900 dark:text-white">${exp.institution}</span>
            <span class="text-sm font-semibold text-sky-500 dark:text-sky-400">• ${exp.project}</span>
          </div>
          <span class="px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/20 font-semibold">
            ${exp.type}
          </span>
        </div>

        <div class="text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">
          ${exp.role} | ${exp.location}
        </div>

        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          ${exp.summary}
        </p>

        <!-- Highlights / Missions -->
        <ul class="space-y-2 mb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          ${exp.missions.map(m => `
            <li class="flex items-start gap-2">
              <span class="text-sky-400 font-bold">›</span>
              <span>${m}</span>
            </li>
          `).join('')}
        </ul>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          ${exp.technologies.map(t => `
            <span class="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800">
              ${t}
            </span>
          `).join('')}
        </div>

      </div>
    </div>
  `).join('');
}

// --- Section 6: Formation Académique (ENI Master 2026 en avant) ---
function renderEducationSection() {
  const data = window.PORTFOLIO_DATA;
  if (!data || !data.education) return;

  const container = document.getElementById('education-timeline');
  if (!container) return;

  container.innerHTML = data.education.map(edu => {
    const isMaster = edu.isMasterFlagship;

    return `
      <div class="relative pl-8 sm:pl-10 pb-10 last:pb-0 border-l-2 ${isMaster ? 'border-sky-500' : 'border-slate-200 dark:border-slate-800'}">
        
        <!-- Node Dot -->
        <div class="absolute -left-[10px] top-1.5 w-5 h-5 rounded-full ${isMaster ? 'bg-sky-500 border-4 border-slate-900 shadow-lg shadow-sky-500/50' : 'bg-slate-800 border-2 border-slate-600'}"></div>

        <div class="p-6 sm:p-7 rounded-2xl ${isMaster ? 'bg-gradient-to-br from-[#0c1324] to-[#111e3b] border-2 border-sky-500/50 shadow-xl' : 'bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-sm'} transition-all card-electric">
          
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="text-xs sm:text-sm font-mono font-bold ${isMaster ? 'text-sky-300' : 'text-slate-500 dark:text-slate-400'}">
              ${edu.year}
            </span>
            ${isMaster ? `
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500 text-white shadow-md shadow-sky-500/30 flex items-center gap-1.5">
                <i data-lucide="award" class="w-3.5 h-3.5"></i>
                DIPLÔME D'INGÉNIEUR EN INFORMATIQUE (NOVEMBRE 2026)
              </span>
            ` : `
              <span class="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                ${edu.status}
              </span>
            `}
          </div>

          <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            ${edu.degree}
          </h3>

          <div class="text-xs sm:text-sm text-sky-500 dark:text-sky-400 font-semibold mt-0.5">
            ${edu.specialization} — ${edu.institution}
          </div>

          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
            ${edu.description}
          </p>

        </div>
      </div>
    `;
  }).join('');
}

// --- Section 7: Certifications & Formations Spécialisées ---
function renderCertificationsSection() {
  const data = window.PORTFOLIO_DATA;
  if (!data || !data.certificationsSection) return;

  const container = document.getElementById('certifications-container');
  if (!container) return;

  container.innerHTML = data.certificationsSection.categories.map(cert => `
    <div class="p-6 rounded-2xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-500/30 transition-all card-electric">
      <div class="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
        <i data-lucide="${cert.icon}" class="w-5 h-5"></i>
      </div>
      <h4 class="text-base font-bold text-slate-900 dark:text-white mb-2">${cert.title}</h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">${cert.examples}</p>
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-sky-400">
        <i data-lucide="clock" class="w-3.5 h-3.5"></i>
        <span>${cert.status}</span>
      </div>
    </div>
  `).join('');
}

// --- Section 8: Formulaire de Contact avec Validation ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  const msgArea = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-count');
  if (!form) return;

  if (msgArea && charCounter) {
    msgArea.addEventListener('input', () => {
      charCounter.textContent = `${msgArea.value.length} / 500`;
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.soundFX.playClick();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    // Validation simple
    if (!name || !email || !message) {
      showToast('Veuillez renseigner tous les champs obligatoires.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Veuillez saisir une adresse e-mail valide.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg> Envoi en cours...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      window.soundFX.playSuccess();

      showToast(`Merci ${name} ! Votre message a été préparé avec succès.`, 'success');

      // Mailto URL direct
      const mailtoUrl = `mailto:${window.PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(subject || 'Contact Portfolio Narindra Rackoto')}&body=${encodeURIComponent(`De : ${name} (${email})\n\n${message}`)}`;
      
      // Affichage d'un panneau de confirmation moderne dans le formulaire
      let feedbackBox = document.getElementById('contact-feedback-box');
      if (!feedbackBox) {
        feedbackBox = document.createElement('div');
        feedbackBox.id = 'contact-feedback-box';
        form.parentNode.insertBefore(feedbackBox, form);
      }
      feedbackBox.className = 'p-5 mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-300 space-y-3';
      feedbackBox.innerHTML = `
        <div class="flex items-center gap-2 font-bold text-white text-sm">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>Message préparé avec succès pour Narindra Rackoto</span>
        </div>
        <p class="text-slate-300 text-xs leading-relaxed">
          Merci <strong class="text-white">${escapeHtml(name)}</strong>. Les champs sont validés. Vous pouvez expédier votre message via votre messagerie ou copier le texte :
        </p>
        <div class="flex flex-wrap gap-2 pt-1">
          <a href="${mailtoUrl}" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-sm">
            <span>Ouvrir dans mon client e-mail</span>
            <span>↗</span>
          </a>
          <button type="button" onclick="navigator.clipboard.writeText('${escapeHtml(message).replace(/'/g, "\\'")}'); showToast('Contenu du message copié !', 'success');" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700">
            Copier le message
          </button>
        </div>
      `;

      form.reset();
      if (charCounter) charCounter.textContent = '0 / 500';
    }, 500);
  });
}

// --- Étude de Cas Complète FIARAmotion (Modal Détaillée) ---
function initFlagshipCaseStudyModal() {
  const modal = document.getElementById('flagship-modal');
  if (!modal) return;

  window.openFlagshipModal = function() {
    window.soundFX.playClick();
    renderFlagshipModalContent();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    if (window.location.hash !== '#fiaramotion') {
      history.replaceState(null, '', '#fiaramotion');
    }
    if (window.lucide) window.lucide.createIcons();
  };

  window.closeFlagshipModal = function() {
    window.soundFX.playClick();
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    if (window.location.hash === '#fiaramotion' || window.location.hash === '#case-study') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeFlagshipModal();
  });
}

function renderFlagshipModalContent() {
  const container = document.getElementById('flagship-modal-body');
  const data = window.PORTFOLIO_DATA.projects.flagship;
  if (!container || !data) return;

  container.innerHTML = `
    <!-- Modal Header -->
    <div class="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
      <div class="flex items-start justify-between gap-4">
        <div>
          <span class="text-xs font-mono font-bold text-sky-500 uppercase tracking-wider bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
            Étude de Cas • Programme CERES
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            ${data.title}
          </h2>
          <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
            ${data.subtitle}
          </p>
        </div>
        <button onclick="window.closeFlagshipModal()" class="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors" title="Fermer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Quick Nav Tabs -->
      <div class="flex flex-wrap gap-2 mt-6" id="flagship-tabs">
        <button onclick="window.switchFlagshipTab('tab-overview')" class="tab-btn active-tab px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-500 text-white transition-colors" data-target="tab-overview">1. Présentation &amp; Enjeux</button>
        <button onclick="window.switchFlagshipTab('tab-architecture')" class="tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors" data-target="tab-architecture">2. Architecture Full Stack</button>
        <button onclick="window.switchFlagshipTab('tab-features')" class="tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors" data-target="tab-features">3. Les 5 Profils &amp; 11 Modules</button>
        <button onclick="window.switchFlagshipTab('tab-gallery')" class="tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors" data-target="tab-gallery">4. Galerie &amp; Captures</button>
        <button onclick="window.switchFlagshipTab('tab-results')" class="tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors" data-target="tab-results">5. Résultats &amp; Évolution</button>
      </div>
    </div>

    <!-- Modal Content Panels -->
    <div class="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
      
      <!-- TAB 1: OVERVIEW -->
      <div id="tab-overview" class="flagship-tab-pane space-y-6">
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <i data-lucide="alert-circle" class="w-5 h-5 text-sky-400"></i> Problématique Initiale
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            ${data.caseStudy.problem}
          </p>
        </div>

        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <i data-lucide="target" class="w-5 h-5 text-emerald-400"></i> Objectifs du Projet
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${data.caseStudy.objectives.map(obj => `
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <span>${obj}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <i data-lucide="lightbulb" class="w-5 h-5 text-amber-400"></i> Solution Proposée
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            ${data.caseStudy.solution}
          </p>
        </div>
      </div>

      <!-- TAB 2: ARCHITECTURE -->
      <div id="tab-architecture" class="flagship-tab-pane hidden space-y-6">
        <div class="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 p-2">
          <img src="${data.gallery[1].image}" alt="Architecture Schéma" class="w-full h-auto cursor-pointer" onclick="window.openLightbox('${data.gallery[1].image}', '${data.gallery[1].title}', '${data.gallery[1].desc}')">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-xs font-mono font-bold text-sky-400">TIER CLIENT (FRONTEND PWA)</span>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">${data.caseStudy.architecture.client}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-xs font-mono font-bold text-blue-400">TIER APPLICATION (BACKEND FLASK)</span>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">${data.caseStudy.architecture.backend}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-xs font-mono font-bold text-emerald-400">STOCKAGE &amp; DONNÉES (POSTGRESQL)</span>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">${data.caseStudy.architecture.database}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-xs font-mono font-bold text-purple-400">DÉPLOIEMENT &amp; EXPLOITATION</span>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">${data.caseStudy.architecture.deployment}</p>
          </div>
        </div>
      </div>

      <!-- TAB 3: ROLES & FEATURES -->
      <div id="tab-features" class="flagship-tab-pane hidden space-y-6">
        <div>
          <h4 class="text-base font-bold text-slate-900 dark:text-white mb-3">Matrice des 5 Profils Utilisateurs</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${data.roles.map((r, i) => `
              <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Profil #${i+1}
                </span>
                <h5 class="text-sm font-bold text-slate-900 dark:text-white mt-2">${r.role}</h5>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">${r.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h4 class="text-base font-bold text-slate-900 dark:text-white mb-3">Les 11 Modules Fonctionnels Détaillés</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${data.features.map((f, i) => `
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                <span class="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                  ${i+1}
                </span>
                <div>
                  <h6 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">${f.title}</h6>
                  <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">${f.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- TAB 4: GALLERY & SCREENSHOTS -->
      <div id="tab-gallery" class="flagship-tab-pane hidden space-y-6">
        <div class="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-xs text-sky-300 flex items-center gap-2">
          <i data-lucide="info" class="w-4 h-4 shrink-0"></i>
          <span>Cliquez sur une image pour l'afficher en plein écran avec la visionneuse interactive. Vous pouvez remplacer ces fichiers par vos propres captures d'écran réelles dans le dossier <code>assets/</code>.</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${data.gallery.map(item => `
            <div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 group cursor-pointer" onclick="window.openLightbox('${item.image}', '${item.title}', '${item.desc}')">
              <div class="aspect-video overflow-hidden">
                <img src="${item.image}" alt="${item.alt}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              </div>
              <div class="p-3">
                <h5 class="text-xs font-bold text-slate-900 dark:text-white">${item.title}</h5>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 5: RESULTS & PERSPECTIVES -->
      <div id="tab-results" class="flagship-tab-pane hidden space-y-6">
        <div>
          <h4 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <i data-lucide="award" class="w-5 h-5 text-emerald-400"></i> Résultats &amp; Apports pour le CERES
          </h4>
          <div class="space-y-2.5">
            ${data.caseStudy.results.map(res => `
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <span>${res}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h4 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <i data-lucide="trending-up" class="w-5 h-5 text-sky-400"></i> Perspectives d'Évolution
          </h4>
          <div class="space-y-2.5">
            ${data.caseStudy.perspectives.map(p => `
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <i data-lucide="arrow-up-right" class="w-4 h-4 text-sky-400 shrink-0 mt-0.5"></i>
                <span>${p}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

    </div>
  `;

  window.switchFlagshipTab = function(tabId) {
    window.soundFX.playClick();
    document.querySelectorAll('.flagship-tab-pane').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(tabId);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('bg-sky-500', 'text-white');
      b.classList.add('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      if (b.getAttribute('data-target') === tabId) {
        b.classList.add('bg-sky-500', 'text-white');
        b.classList.remove('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      }
    });
  };
}

// --- Visionneuse Lightbox pour Captures d'Écran ---
function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  window.openLightbox = function(src, title, desc) {
    window.soundFX.playClick();
    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const descEl = document.getElementById('lightbox-desc');

    if (imgEl) imgEl.src = src;
    if (titleEl) titleEl.textContent = title || '';
    if (descEl) descEl.textContent = desc || '';

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    window.soundFX.playClick();
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('#lightbox-close-btn')) {
      window.closeLightbox();
    }
  });
}

// --- Modal de Visualisation & Impression du CV (Resume Modal) ---
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;

  window.openResumeModal = function() {
    window.soundFX.playClick();
    renderResumeModalContent();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  };

  window.closeResumeModal = function() {
    window.soundFX.playClick();
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeResumeModal();
  });
}

function renderResumeModalContent() {
  const container = document.getElementById('resume-modal-body');
  const data = window.PORTFOLIO_DATA;
  if (!container || !data) return;

  const p = data.profile;

  container.innerHTML = `
    <!-- Top Action Toolbar -->
    <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 no-print">
      <span class="text-xs font-mono font-bold text-sky-500 uppercase tracking-wider">
        CURRICULUM VITAE PROFESSIONNEL
      </span>
      <div class="flex items-center gap-2">
        <button onclick="window.print()" class="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i>
          <span>Imprimer / Sauvegarder en PDF</span>
        </button>
        <button onclick="window.closeResumeModal()" class="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
    </div>

    <!-- CV Printable Document -->
    <div class="space-y-6 text-slate-800 dark:text-slate-100">
      
      <!-- CV Header -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 class="text-2xl font-extrabold tracking-tight">${p.fullName}</h1>
        <p class="text-sm font-bold text-sky-500 dark:text-sky-400 mt-0.5">${p.title}</p>
        <div class="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mt-2 font-mono">
          <span>${p.location}</span>
          <span>•</span>
          <a href="mailto:${p.email}" class="hover:underline text-sky-500">${p.email}</a>
          <span>•</span>
          <a href="${p.linkedin}" target="_blank" class="hover:underline">LinkedIn</a>
          <span>•</span>
          <a href="${p.github}" target="_blank" class="hover:underline">GitHub</a>
        </div>
      </div>

      <!-- Profil Résumé -->
      <div>
        <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-1.5">Profil Professionnel</h2>
        <p class="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          ${p.fullBio[0]} ${p.fullBio[1]} ${p.fullBio[2]}
        </p>
      </div>

      <!-- Formation Phare ENI -->
      <div>
        <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2">Formation Académique</h2>
        <div class="space-y-3">
          ${data.education.map(ed => `
            <div class="text-xs">
              <div class="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>${ed.degree} — ${ed.specialization}</span>
                <span class="text-sky-500 font-mono">${ed.year}</span>
              </div>
              <div class="text-slate-500 dark:text-slate-400 font-medium">${ed.institution} (${ed.dateInfo})</div>
              <div class="text-slate-600 dark:text-slate-300 mt-0.5">${ed.description}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Expériences -->
      <div>
        <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2">Expériences Professionnelles</h2>
        <div class="space-y-4">
          ${data.experiences.map(ex => `
            <div class="text-xs">
              <div class="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>${ex.role} — ${ex.institution}</span>
                <span class="text-sky-500 font-mono">${ex.location}</span>
              </div>
              <div class="text-slate-600 dark:text-slate-300 mt-1">${ex.summary}</div>
              <ul class="list-disc list-inside mt-1 space-y-0.5 text-slate-600 dark:text-slate-400">
                ${ex.missions.slice(0, 3).map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Compétences Techniques -->
      <div>
        <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2">Compétences Techniques</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          ${data.skills.categories.map(c => `
            <div>
              <span class="font-bold text-slate-900 dark:text-white">${c.name} :</span>
              <span class="text-slate-600 dark:text-slate-400">${c.items.map(i => i.name).join(', ')}</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

// --- Command Palette (⌘K / Ctrl+K) ---
function initCommandPalette() {
  const palette = document.getElementById('command-palette');
  const input = document.getElementById('palette-input');
  const resultsContainer = document.getElementById('palette-results');
  if (!palette || !input || !resultsContainer) return;

  const triggers = document.querySelectorAll('.open-command-palette');

  function openPalette() {
    window.soundFX.playClick();
    palette.classList.remove('hidden');
    palette.classList.add('flex');
    input.value = '';
    renderPaletteResults('');
    input.focus();
    document.body.style.overflow = 'hidden';
  }

  function closePalette() {
    palette.classList.add('hidden');
    palette.classList.remove('flex');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => btn.addEventListener('click', openPalette));

  // Key combination listener: Cmd+K or Ctrl+K or /
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.classList.contains('hidden')) {
        openPalette();
      } else {
        closePalette();
      }
    } else if (e.key === 'Escape' && !palette.classList.contains('hidden')) {
      closePalette();
    }
  });

  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });

  function renderPaletteResults(query) {
    const q = query.toLowerCase().trim();
    const items = [
      { label: 'Projet Phare : FIARAmotion (CERES)', icon: 'star', action: () => window.openFlagshipModal(), sub: 'Étude de cas complète & PWA' },
      { label: 'Voir les Projets & Réalisations', icon: 'folder', action: () => scrollToId('projects'), sub: 'Navigation section #projets' },
      { label: 'Compétences Techniques & Recherche', icon: 'cpu', action: () => scrollToId('skills'), sub: 'Frontend, Backend, IA, Systèmes' },
      { label: 'Expériences Professionnelles (CERES, FID, CHU)', icon: 'briefcase', action: () => scrollToId('experience'), sub: 'Timeline professionnelle' },
      { label: 'Formation Académique (Master ENI 2026)', icon: 'graduation-cap', action: () => scrollToId('education'), sub: 'Diplôme d\'ingénieur en informatique' },
      { label: 'Ouvrir le Curriculum Vitae (CV)', icon: 'file-text', action: () => window.openResumeModal(), sub: 'Aperçu et impression PDF' },
      { label: 'Me Contacter Directement', icon: 'send', action: () => scrollToId('contact'), sub: 'Formulaire et coordonnées' },
      { label: 'Copier mon adresse e-mail', icon: 'copy', action: () => window.copyEmail(), sub: window.PORTFOLIO_DATA.profile.email },
      { label: 'Profil GitHub (rackoto786)', icon: 'github', action: () => window.open(window.PORTFOLIO_DATA.profile.github, '_blank'), sub: 'Code source & contributions' },
      { label: 'Profil LinkedIn (Narindra Rackoto)', icon: 'linkedin', action: () => window.open(window.PORTFOLIO_DATA.profile.linkedin, '_blank'), sub: 'Réseau professionnel' }
    ];

    const filtered = q 
      ? items.filter(it => it.label.toLowerCase().includes(q) || it.sub.toLowerCase().includes(q))
      : items;

    resultsContainer.innerHTML = filtered.map((item, idx) => `
      <div class="palette-item p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs transition-colors" data-idx="${idx}">
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <i data-lucide="${item.icon}" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="font-bold text-slate-900 dark:text-white">${item.label}</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">${item.sub}</div>
          </div>
        </div>
        <kbd class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono text-slate-500 dark:text-slate-400">↵</kbd>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    resultsContainer.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx'));
        if (filtered[idx]) {
          closePalette();
          filtered[idx].action();
        }
      });
    });
  }

  input.addEventListener('input', () => {
    renderPaletteResults(input.value);
  });
}

// --- Fonctions Utilitaires ---
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

window.copyEmail = function() {
  const email = window.PORTFOLIO_DATA.profile.email;
  navigator.clipboard.writeText(email).then(() => {
    window.soundFX.playSuccess();
    showToast(`Adresse e-mail copiée : ${email}`, 'success');
  }).catch(() => {
    showToast(`Email : ${email}`, 'info');
  });
};

function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const borderCol = type === 'success' ? 'border-emerald-500/50' : type === 'error' ? 'border-rose-500/50' : 'border-sky-500/50';
  const textCol = type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-rose-400' : 'text-sky-400';

  toast.className = `p-4 rounded-xl bg-slate-900/95 text-white text-xs border ${borderCol} shadow-2xl backdrop-blur-md flex items-center gap-3 pointer-events-auto transform transition-all duration-300 translate-y-2 opacity-0`;
  
  toast.innerHTML = `
    <span class="${textCol} font-bold">●</span>
    <span class="flex-1">${msg}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
