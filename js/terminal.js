/**
 * Interactive Terminal Simulator — Narindra Rackoto
 * Console interactive pour les recruteurs, architectes et développeurs.
 */
class PortfolioTerminal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.history = [];
    this.historyIndex = -1;
    this.data = window.PORTFOLIO_DATA || {};
    this.init();
  }

  init() {
    this.outputElement = this.container.querySelector('.terminal-output');
    this.inputElement = this.container.querySelector('.terminal-input');
    this.promptPrefix = this.container.querySelector('.prompt-prefix');

    if (!this.inputElement || !this.outputElement) return;

    // Listen to keydown
    this.inputElement.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Focus input when clicking anywhere on the terminal
    this.container.addEventListener('click', () => {
      this.inputElement.focus();
    });

    // Initial welcome banner
    this.printWelcome();
  }

  printWelcome() {
    const welcomeHtml = `
      <div class="text-sky-400 font-mono text-xs sm:text-sm mb-3">
        <p class="font-bold">⚡ RackotoOS v2.6.0 (ENI Fianarantsoa • Linux Workstation)</p>
        <p class="text-slate-400">Bienvenue sur le terminal de <span class="text-white font-semibold">Narindra Rackoto</span>. Tapez <span class="text-sky-300 font-semibold underline cursor-pointer" onclick="window.runTerminalCmd('help')">help</span> ou sélectionnez une commande :</p>
      </div>
      <div class="flex flex-wrap gap-1.5 mb-3">
        ${['help', 'fiaramotion', 'about', 'skills', 'experience', 'education', 'contact', 'clear'].map(cmd => 
          `<button type="button" class="px-2 py-0.5 rounded text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-sky-300 font-mono border border-slate-700/60 transition-colors" onclick="window.runTerminalCmd('${cmd}')">$ ${cmd}</button>`
        ).join('')}
      </div>
    `;
    this.appendOutput(welcomeHtml);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const command = this.inputElement.value.trim();
      if (command) {
        this.history.push(command);
        this.historyIndex = this.history.length;
        this.execute(command);
      } else {
        this.appendOutput(`<div class="font-mono text-xs text-slate-400"><span class="text-sky-400">visiteur@narindra-rackoto</span>:<span class="text-blue-400">~</span>$ </div>`);
      }
      this.inputElement.value = '';
      if (window.soundFX) window.soundFX.playKey();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.inputElement.value = this.history[this.historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.inputElement.value = this.history[this.historyIndex] || '';
      } else {
        this.historyIndex = this.history.length;
        this.inputElement.value = '';
      }
    }
  }

  execute(rawCmd) {
    const cmd = rawCmd.toLowerCase().trim();
    const args = cmd.split(' ').slice(1);
    const mainCmd = cmd.split(' ')[0];

    // Log the command invocation line
    this.appendOutput(`
      <div class="font-mono text-xs text-slate-300 mt-2">
        <span class="text-sky-400">visiteur@narindra-rackoto</span>:<span class="text-blue-400">~</span>$ <span class="text-white font-semibold">${escapeHtml(rawCmd)}</span>
      </div>
    `);

    switch (mainCmd) {
      case 'help':
        this.appendOutput(`
          <div class="font-mono text-xs text-slate-300 space-y-1 my-2 border-l-2 border-sky-500 pl-3">
            <p><span class="text-sky-300 font-bold">fiaramotion</span> - Étude de cas détaillée du projet phare (CERES)</p>
            <p><span class="text-sky-300 font-bold">about</span>       - Présentation de Narindra Rackoto & Master ENI</p>
            <p><span class="text-sky-300 font-bold">skills</span>      - Synthèse des compétences (Frontend, Backend, IA, DB, Systèmes)</p>
            <p><span class="text-sky-300 font-bold">experience</span>  - Historique professionnel (CERES, FID Ambositra, CHU Fianarantsoa)</p>
            <p><span class="text-sky-300 font-bold">education</span>   - Parcours académique (Master 2026, Licence, Bac C)</p>
            <p><span class="text-sky-300 font-bold">contact</span>     - Coordonnées de contact, Madagascar & réseaux</p>
            <p><span class="text-sky-300 font-bold">cv</span>          - Visualiser et télécharger le CV complet</p>
            <p><span class="text-sky-300 font-bold">clear</span>       - Effacer l'écran du terminal</p>
          </div>
        `);
        break;

      case 'fiaramotion': {
        const flag = this.data.projects?.flagship;
        if (!flag) return;
        this.appendOutput(`
          <div class="font-mono text-xs text-slate-300 space-y-2 my-2 bg-slate-900/90 p-3 rounded-lg border border-sky-500/40">
            <p class="text-sky-300 font-bold text-sm">🚗 ${flag.title} — ${flag.subtitle}</p>
            <p class="text-slate-400">${flag.context}</p>
            <p><span class="text-blue-400 font-semibold">Technologies :</span> ${flag.stack.join(' • ')}</p>
            <p><span class="text-blue-400 font-semibold">5 Profils Utilisateurs :</span> ${flag.roles.map(r => r.role).join(', ')}</p>
            <p><span class="text-blue-400 font-semibold">11 Modules :</span> Véhicules, Conducteurs, Rôles, Missions, Planification, Maintenance, Carburant, Dashboard, Récapitulatif, Supervision, Paramètres.</p>
            <div class="pt-1">
              <button onclick="window.openFlagshipModal()" class="px-3 py-1 rounded bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs">
                Ouvrir l'Étude de Cas Complète & Galerie →
              </button>
            </div>
          </div>
        `);
        break;
      }

      case 'about': {
        const p = this.data.profile;
        this.appendOutput(`
          <div class="font-mono text-xs text-slate-300 space-y-2 my-2 border-l-2 border-sky-500 pl-3">
            <p class="font-bold text-white text-sm">${p.fullName} (${p.name})</p>
            <p class="text-sky-300 font-semibold">${p.title}</p>
            <p class="text-slate-400">${p.fullBio[0]}</p>
            <p class="text-slate-400">${p.fullBio[1]}</p>
            <p class="text-emerald-400 font-medium">🎓 ${p.educationHighlight.degree} (${p.educationHighlight.specialization}) — ${p.educationHighlight.institution} [${p.educationHighlight.graduationDate}]</p>
          </div>
        `);
        break;
      }

      case 'skills': {
        const cats = this.data.skills?.categories || [];
        let html = `<div class="font-mono text-xs text-slate-300 space-y-3 my-2">`;
        cats.forEach(c => {
          html += `
            <div>
              <p class="text-sky-300 font-bold">▸ ${c.name} :</p>
              <p class="text-slate-400 pl-3">${c.items.map(i => `<span class="text-white">${i.name}</span> (${i.badge})`).join(' • ')}</p>
            </div>
          `;
        });
        html += `</div>`;
        this.appendOutput(html);
        break;
      }

      case 'experience': {
        const exps = this.data.experiences || [];
        let html = `<div class="font-mono text-xs text-slate-300 space-y-3 my-2 border-l-2 border-blue-500 pl-3">`;
        exps.forEach(e => {
          html += `
            <div>
              <p class="text-white font-bold">${e.institution} <span class="text-sky-400 font-medium">— ${e.project}</span></p>
              <p class="text-slate-400 text-[11px]">${e.role} | ${e.location}</p>
              <p class="text-slate-300 mt-1">${e.summary}</p>
            </div>
          `;
        });
        html += `</div>`;
        this.appendOutput(html);
        break;
      }

      case 'education': {
        const edus = this.data.education || [];
        let html = `<div class="font-mono text-xs text-slate-300 space-y-2 my-2 border-l-2 border-emerald-500 pl-3">`;
        edus.forEach(ed => {
          html += `
            <div>
              <span class="text-sky-300 font-bold">${ed.year}</span> — 
              <span class="text-white font-semibold">${ed.degree}</span> 
              <span class="text-slate-400">(${ed.institution})</span>
              ${ed.isMasterFlagship ? `<span class="ml-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">★ DIPLÔME PHARE NOV 2026</span>` : ''}
            </div>
          `;
        });
        html += `</div>`;
        this.appendOutput(html);
        break;
      }

      case 'contact': {
        const p = this.data.profile;
        this.appendOutput(`
          <div class="font-mono text-xs text-slate-300 space-y-1.5 my-2 border-l-2 border-sky-500 pl-3">
            <p><span class="text-slate-400">Email :</span> <span class="text-white select-all">${p.email}</span></p>
            <p><span class="text-slate-400">Localisation :</span> <span class="text-white">${p.location}</span> (${p.timezoneLabel})</p>
            <p><span class="text-slate-400">GitHub :</span> <a href="${p.github}" target="_blank" class="text-sky-300 underline">${p.github}</a></p>
            <p><span class="text-slate-400">LinkedIn :</span> <a href="${p.linkedin}" target="_blank" class="text-sky-300 underline">${p.linkedin}</a></p>
          </div>
        `);
        break;
      }

      case 'cv':
        if (typeof window.openResumeModal === 'function') {
          window.openResumeModal();
          this.appendOutput(`<div class="font-mono text-xs text-emerald-400 my-1">✓ Ouverture de la visionneuse de CV...</div>`);
        }
        break;

      case 'clear':
        this.outputElement.innerHTML = '';
        this.printWelcome();
        break;

      default:
        this.appendOutput(`
          <div class="font-mono text-xs text-rose-400 my-1">
            Commande non reconnue : "${escapeHtml(rawCmd)}". Tapez <span class="underline cursor-pointer text-sky-300" onclick="window.runTerminalCmd('help')">help</span> pour consulter la liste.
          </div>
        `);
        break;
    }

    // Scroll terminal output to bottom
    this.container.scrollTop = this.container.scrollHeight;
  }

  appendOutput(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    this.outputElement.appendChild(div);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

window.runTerminalCmd = function(cmd) {
  if (window.activeTerminal && window.activeTerminal.inputElement) {
    window.activeTerminal.inputElement.value = cmd;
    window.activeTerminal.execute(cmd);
    window.activeTerminal.inputElement.value = '';
    // scroll smoothly to terminal if not in view
    const term = document.getElementById('terminal-section');
    if (term) term.scrollIntoView({ behavior: 'smooth' });
  }
};
