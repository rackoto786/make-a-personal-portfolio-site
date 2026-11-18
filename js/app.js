/**
 * Portfolio Application Engine
 * Handles themes, sound FX, filters, modals, command palette, and UI state.
 */

// --- Web Audio Synthesizer Sound Engine ---
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
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
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
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
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
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.05, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } catch (e) {}
  }

  playChime(freq = 800, dur = 0.1) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch (e) {}
  }
}

window.soundFX = new SoundFX();

// --- Main App Controller ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSoundToggle();
  initLiveClock();
  renderProjects();
  renderSkills();
  renderExperience();
  renderTestimonials();
  initProjectFilters();
  initNavigation();
  initContactForm();
  initCommandPalette();
  initCustomizer();

  // Initialize Terminal
  if (document.getElementById('terminal-card')) {
    window.terminalInstance = new PortfolioTerminal('terminal-card');
  }

  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind global sound click handler
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .interactive-click')) {
      window.soundFX.playClick();
    }
  });
});

// --- Theme Management ---
function initTheme() {
  const saved = localStorage.getItem('portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark) || !saved; // default dark for developer portfolio aesthetic

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcons(isDark);

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentlyDark = document.documentElement.classList.contains('dark');
      const nextDark = !currentlyDark;
      if (nextDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('portfolio_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('portfolio_theme', 'light');
      }
      updateThemeIcons(nextDark);
      window.soundFX.playChime(nextDark ? 450 : 700);
      showToast(nextDark ? 'Switched to Dark Mode' : 'Switched to Light Mode');
    });
  }
}

function updateThemeIcons(isDark) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    if (window.lucide) window.lucide.createIcons();
  }
}

// --- Sound Toggle ---
function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle');
  const soundLabel = document.getElementById('sound-label');
  const soundIcon = document.getElementById('sound-icon');

  function updateDisplay(enabled) {
    if (soundLabel) soundLabel.textContent = enabled ? 'SFX: ON' : 'SFX: OFF';
    if (soundIcon) {
      soundIcon.setAttribute('data-lucide', enabled ? 'volume-2' : 'volume-x');
      if (window.lucide) window.lucide.createIcons();
    }
  }

  updateDisplay(window.soundFX.enabled);

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const enabled = window.soundFX.toggle();
      updateDisplay(enabled);
      showToast(enabled ? 'UI Sound Effects Enabled' : 'UI Sound Effects Muted');
    });
  }
}

// --- Live Timezone Clock ---
function initLiveClock() {
  const clockEl = document.getElementById('local-clock');
  const statusPill = document.getElementById('work-status-text');

  function update() {
    try {
      const now = new Date();
      // Format in San Francisco time
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      if (clockEl) {
        clockEl.textContent = `${timeStr} PT`;
      }

      // Calculate working hours status (9 AM - 8 PM PT)
      const ptHour = parseInt(
        now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', hour12: false }),
        10
      );
      if (statusPill) {
        if (ptHour >= 9 && ptHour <= 20) {
          statusPill.textContent = 'Active & Online';
        } else {
          statusPill.textContent = 'Offline (Will respond soon)';
        }
      }
    } catch (e) {}
  }

  update();
  setInterval(update, 1000);
}

// --- Navigation & Active Section Spy ---
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Active section scroll spy
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
      link.classList.remove('text-brand-500', 'font-semibold', 'dark:text-brand-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-brand-500', 'font-semibold', 'dark:text-brand-400');
      }
    });
  });
}

// --- Render Projects Grid ---
function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const data = window.PORTFOLIO_DATA?.projects || [];
  const filtered = filter === 'all' 
    ? data 
    : data.filter(p => p.category === filter);

  container.innerHTML = filtered.map(p => `
    <div class="group relative bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col overflow-hidden">
      <!-- Top banner / visual -->
      <div class="h-44 w-full bg-gradient-to-br ${p.previewGradient} relative flex items-center justify-center p-6 overflow-hidden">
        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
        <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10 text-center text-white">
          <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-2 shadow-inner border border-white/20 group-hover:scale-110 transition-transform">
            <i data-lucide="${getProjectIcon(p.category)}" class="w-6 h-6 text-white"></i>
          </div>
          <span class="text-xs uppercase tracking-wider font-mono font-bold bg-black/40 px-2.5 py-1 rounded-full border border-white/20">
            ${p.badge}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              ${p.title}
            </h3>
          </div>
          <p class="text-xs font-medium text-brand-600 dark:text-brand-400 font-mono mb-3">
            ${p.tagline}
          </p>
          <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
            ${p.description}
          </p>
        </div>

        <div>
          <!-- Stack Tags -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${p.stack.slice(0, 4).map(st => `
              <span class="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                ${st}
              </span>
            `).join('')}
            ${p.stack.length > 4 ? `
              <span class="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                +${p.stack.length - 4}
              </span>
            ` : ''}
          </div>

          <!-- Actions -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <button onclick="openProjectModal('${p.id}')" class="text-xs font-semibold text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 flex items-center gap-1.5 group/btn">
              <span>Deep Dive</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"></i>
            </button>
            <div class="flex items-center gap-2">
              <a href="${p.githubUrl}" target="_blank" rel="noopener" class="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="View Source">
                <i data-lucide="github" class="w-4 h-4"></i>
              </a>
              <a href="${p.liveUrl}" target="_blank" rel="noopener" class="p-2 text-slate-500 hover:text-brand-500 dark:hover:text-brand-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Live Preview">
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function getProjectIcon(cat) {
  switch (cat) {
    case 'ai': return 'sparkles';
    case 'fullstack': return 'layers';
    case 'systems': return 'terminal';
    case 'frontend': return 'layout';
    default: return 'code-2';
  }
}

// --- Project Filter Tabs ---
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-500', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      btn.classList.add('bg-brand-500', 'text-white', 'shadow-md');
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

      const filter = btn.getAttribute('data-filter') || 'all';
      renderProjects(filter);
    });
  });
}

// --- Project Deep Dive Modal ---
window.openProjectModal = function(projectId) {
  const data = window.PORTFOLIO_DATA?.projects?.find(p => p.id === projectId);
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative bg-gradient-to-r ${data.previewGradient} p-8 text-white rounded-t-2xl">
      <button onclick="closeProjectModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <div class="max-w-2xl">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/20 backdrop-blur-md mb-3">
          ${data.badge} • ${data.category.toUpperCase()}
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">${data.title}</h2>
        <p class="text-sm sm:text-base text-white/90 font-medium">${data.tagline}</p>
      </div>
    </div>

    <div class="p-6 sm:p-8 space-y-6">
      <!-- Metrics row -->
      <div class="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center">
        ${Object.entries(data.metrics || {}).map(([key, val]) => `
          <div>
            <div class="text-lg sm:text-xl font-bold text-slate-900 dark:text-brand-400">${val}</div>
            <div class="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">${key}</div>
          </div>
        `).join('')}
      </div>

      <!-- Description -->
      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Architectural Overview</h4>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${data.description}</p>
      </div>

      <!-- Key Engineering Highlights -->
      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">Engineering Highlights & Challenges Solved</h4>
        <ul class="space-y-2.5">
          ${data.highlights.map(h => `
            <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Full Stack Badges -->
      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Technologies Used</h4>
        <div class="flex flex-wrap gap-2">
          ${data.stack.map(st => `
            <span class="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              ${st}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Modal Footer CTA -->
      <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 justify-end">
        <a href="${data.githubUrl}" target="_blank" rel="noopener" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white flex items-center gap-2 transition-colors">
          <i data-lucide="github" class="w-4 h-4"></i>
          <span>Source Code</span>
        </a>
        <a href="${data.liveUrl}" target="_blank" rel="noopener" class="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-2 transition-colors shadow-md">
          <span>Live Preview</span>
          <i data-lucide="external-link" class="w-4 h-4"></i>
        </a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

// --- Render Skills Grid ---
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const cats = window.PORTFOLIO_DATA?.skills?.categories || [];
  container.innerHTML = cats.map(cat => `
    <div class="bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
          <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white">${cat.name}</h3>
      </div>
      <div class="space-y-3.5">
        ${cat.skills.map(s => `
          <div>
            <div class="flex justify-between items-center text-xs font-mono mb-1">
              <span class="text-slate-800 dark:text-slate-200 font-medium">${s.name}</span>
              <span class="text-slate-400">${s.exp}</span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div class="bg-gradient-to-r from-brand-500 to-sky-400 h-1.5 rounded-full transition-all duration-1000" style="width: ${s.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// --- Render Experience Timeline ---
function renderExperience() {
  const container = document.getElementById('experience-timeline');
  if (!container) return;

  const items = window.PORTFOLIO_DATA?.experience || [];
  container.innerHTML = items.map((exp, idx) => `
    <div class="relative pl-8 pb-10 last:pb-2 group">
      <!-- Vertical line -->
      <div class="absolute left-2.5 top-2 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 group-last:hidden"></div>
      
      <!-- Bullet indicator -->
      <div class="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-brand-500 bg-white dark:bg-slate-900 flex items-center justify-center group-hover:scale-125 transition-transform">
        <div class="w-2 h-2 rounded-full bg-brand-500"></div>
      </div>

      <div class="bg-white dark:bg-slate-900/70 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h4 class="text-base font-bold text-slate-900 dark:text-white">
            ${exp.role} <span class="text-brand-500 dark:text-brand-400">@ ${exp.company}</span>
          </h4>
          <span class="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            ${exp.period}
          </span>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">${exp.location} • ${exp.type}</p>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">${exp.description}</p>
        
        <ul class="space-y-1.5 mb-4">
          ${exp.highlights.map(h => `
            <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <i data-lucide="check" class="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5"></i>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>

        <div class="flex flex-wrap gap-1.5">
          ${exp.skills.map(s => `
            <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              ${s}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// --- Render Testimonials ---
function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  const list = window.PORTFOLIO_DATA?.testimonials || [];
  container.innerHTML = list.map(t => `
    <div class="bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
      <div class="mb-4">
        <div class="flex items-center gap-1 text-amber-400 mb-3">
          ${Array(5).fill(0).map(() => `<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>`).join('')}
        </div>
        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
          "${t.content}"
        </p>
      </div>
      <div class="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700">
        <div>
          <h5 class="text-xs font-bold text-slate-900 dark:text-white">${t.name}</h5>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">${t.role}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// --- Contact Form ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  const messageArea = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-count');

  if (messageArea && charCounter) {
    messageArea.addEventListener('input', () => {
      charCounter.textContent = `${messageArea.value.length} / 500`;
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value;
      const email = form.querySelector('[name="email"]').value;
      const message = form.querySelector('[name="message"]').value;

      if (!name || !email || !message) {
        showToast('Please fill in all fields', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <div class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Transmitting...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        if (charCounter) charCounter.textContent = '0 / 500';

        if (typeof confetti === 'function') {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
        }
        window.soundFX.playSuccess();
        showToast('Message sent successfully! Alex will reply shortly.', 'success');
      }, 1000);
    });
  }
}

// --- Interactive Resume Modal ---
window.openResumeModal = function() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  }
};

window.closeResumeModal = function() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

// --- Command Palette (Cmd+K / Ctrl+K) ---
function initCommandPalette() {
  const palette = document.getElementById('command-palette');
  const input = document.getElementById('palette-input');
  const resultsContainer = document.getElementById('palette-results');
  const openButtons = document.querySelectorAll('.open-command-palette');

  if (!palette || !input || !resultsContainer) return;

  const actions = [
    { title: 'Go to Projects', desc: 'Browse featured apps & software', icon: 'folder', action: () => scrollToId('projects') },
    { title: 'Go to Experience', desc: 'View career history and timeline', icon: 'briefcase', action: () => scrollToId('experience') },
    { title: 'Go to Technical Skills', desc: 'Explore languages, frameworks & cloud', icon: 'cpu', action: () => scrollToId('skills') },
    { title: 'Go to Interactive Terminal', desc: 'Run CLI commands & scripts', icon: 'terminal', action: () => scrollToId('terminal-section') },
    { title: 'Go to Contact Section', desc: 'Send a message or schedule a chat', icon: 'mail', action: () => scrollToId('contact') },
    { title: 'Open Interactive Resume', desc: 'View or print full formal CV', icon: 'file-text', action: () => window.openResumeModal() },
    { title: 'Copy Email Address', desc: 'alex.morgan.codes@gmail.com', icon: 'copy', action: () => window.copyEmail() },
    { title: 'Toggle Theme (Dark / Light)', desc: 'Switch visual color palette', icon: 'sun', action: () => document.getElementById('theme-toggle')?.click() },
    { title: 'Toggle Sound Effects', desc: 'Mute or unmute synthesized audio', icon: 'volume-2', action: () => document.getElementById('sound-toggle')?.click() },
    { title: 'Trigger Recruiter Mode', desc: 'Run celebration and hire prompt', icon: 'party-popper', action: () => window.runTerminalCmd('sudo hire-alex') }
  ];

  function openPalette() {
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

  function renderPaletteResults(query) {
    const q = query.toLowerCase().trim();
    const filtered = actions.filter(a => 
      a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="py-8 text-center text-xs text-slate-400 font-mono">
          No matching actions found for "${query}"
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map((item, idx) => `
      <button class="palette-item w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-center justify-between group transition-colors" data-idx="${idx}">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-500/10 text-slate-600 dark:text-slate-300 group-hover:text-brand-500 flex items-center justify-center transition-colors">
            <i data-lucide="${item.icon}" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-slate-800 dark:text-white group-hover:text-brand-500 transition-colors">${item.title}</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">${item.desc}</div>
          </div>
        </div>
        <span class="text-[10px] font-mono text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">↵ Select</span>
      </button>
    `).join('');

    resultsContainer.querySelectorAll('.palette-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        closePalette();
        filtered[idx].action();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  input.addEventListener('input', () => {
    renderPaletteResults(input.value);
  });

  // Global keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.classList.contains('hidden')) {
        openPalette();
      } else {
        closePalette();
      }
    } else if (e.key === 'Escape') {
      closePalette();
      closeProjectModal();
      closeResumeModal();
      closeCustomizer();
    }
  });

  openButtons.forEach(btn => btn.addEventListener('click', openPalette));
  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });
  window.closeCommandPalette = closePalette;
}

// --- Live Profile Customizer ---
function initCustomizer() {
  const modal = document.getElementById('customizer-modal');
  const trigger = document.getElementById('customizer-btn');
  const form = document.getElementById('customizer-form');

  if (!modal || !trigger) return;

  trigger.addEventListener('click', () => {
    openCustomizer();
  });

  function openCustomizer() {
    const p = window.PORTFOLIO_DATA.profile;
    document.getElementById('cust-name').value = p.name;
    document.getElementById('cust-title').value = p.tagline;
    document.getElementById('cust-email').value = p.email;
    document.getElementById('cust-location').value = p.location;
    document.getElementById('cust-status').value = p.status.text;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  window.closeCustomizer = function() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const p = window.PORTFOLIO_DATA.profile;
      p.name = document.getElementById('cust-name').value;
      p.tagline = document.getElementById('cust-title').value;
      p.email = document.getElementById('cust-email').value;
      p.location = document.getElementById('cust-location').value;
      p.status.text = document.getElementById('cust-status').value;

      // Update in DOM
      document.querySelectorAll('.profile-name').forEach(el => el.textContent = p.name);
      document.querySelectorAll('.profile-tagline').forEach(el => el.textContent = p.tagline);
      document.querySelectorAll('.profile-location').forEach(el => el.textContent = p.location);
      document.querySelectorAll('.profile-status').forEach(el => el.textContent = p.status.text);

      window.closeCustomizer();
      window.soundFX.playSuccess();
      showToast('Profile information updated live!', 'success');
    });
  }
}

// --- Utilities ---
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

window.copyEmail = function() {
  const email = window.PORTFOLIO_DATA?.profile?.email || 'alex.morgan.codes@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Copied ${email} to clipboard!`, 'success');
    window.soundFX.playSuccess();
  }).catch(() => {
    showToast(`Email: ${email}`);
  });
};

function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `p-3 px-4 rounded-xl text-xs font-mono font-medium shadow-xl border flex items-center gap-2 transform translate-y-4 opacity-0 transition-all duration-300 ${
    type === 'error'
      ? 'bg-red-950/90 text-red-200 border-red-800'
      : type === 'success'
      ? 'bg-emerald-950/90 text-emerald-200 border-emerald-800'
      : 'bg-slate-900/90 text-slate-200 border-slate-700'
  }`;

  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${type === 'error' ? 'bg-red-400' : type === 'success' ? 'bg-emerald-400' : 'bg-sky-400'}"></span>
    <span>${msg}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
