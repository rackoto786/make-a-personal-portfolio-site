/**
 * Interactive Terminal Simulator
 * Allows visitors to explore the portfolio using CLI commands.
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
      <div class="text-emerald-400 font-mono text-xs sm:text-sm mb-3">
        <p class="font-bold">⚡ MorganOS v2.6.4 (x86_64-antigravity-linux)</p>
        <p class="text-slate-400">Type <span class="text-brand-300 font-semibold underline cursor-pointer" onclick="window.runTerminalCmd('help')">help</span> to list commands or click any chip below.</p>
      </div>
      <div class="flex flex-wrap gap-1.5 mb-3">
        ${['help', 'about', 'skills', 'projects', 'experience', 'sudo hire-alex', 'clear'].map(cmd => 
          `<button type="button" class="px-2 py-0.5 rounded text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 font-mono border border-slate-700/60 transition-colors" onclick="window.runTerminalCmd('${cmd}')">$ ${cmd}</button>`
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
        this.appendOutput(`<div class="font-mono text-xs text-slate-400"><span class="text-emerald-400">visitor@alex-morgan</span>:<span class="text-sky-400">~</span>$ </div>`);
      }
      this.inputElement.value = '';
      this.scrollToBottom();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.history.length > 0 && this.historyIndex > 0) {
        this.historyIndex--;
        this.inputElement.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.inputElement.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.inputElement.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.autocomplete();
    }
  }

  autocomplete() {
    const commands = ['help', 'about', 'skills', 'projects', 'experience', 'contact', 'resume', 'clear', 'sudo hire-alex', 'matrix', 'date', 'whoami'];
    const current = this.inputElement.value.trim().toLowerCase();
    if (!current) return;
    const match = commands.find(c => c.startsWith(current));
    if (match) {
      this.inputElement.value = match;
    }
  }

  execute(cmdStr) {
    // Sound effect
    if (window.soundFX) window.soundFX.playKey();

    const parts = cmdStr.split(' ').filter(Boolean);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Echo input line
    this.appendOutput(`
      <div class="font-mono text-xs sm:text-sm text-slate-300 flex items-center gap-2 mt-1">
        <span class="text-emerald-400">visitor@alex-morgan</span>:<span class="text-sky-400">~</span>$ <span class="text-white font-medium">${this.escapeHtml(cmdStr)}</span>
      </div>
    `);

    switch (cmd) {
      case 'help':
        this.cmdHelp();
        break;
      case 'about':
      case 'bio':
        this.cmdAbout();
        break;
      case 'skills':
        this.cmdSkills();
        break;
      case 'projects':
      case 'work':
        this.cmdProjects(args);
        break;
      case 'experience':
      case 'career':
        this.cmdExperience();
        break;
      case 'contact':
      case 'email':
        this.cmdContact();
        break;
      case 'resume':
      case 'cv':
        this.cmdResume();
        break;
      case 'sudo':
        if (args.join(' ') === 'hire-alex' || args.join(' ') === 'hire') {
          this.cmdHire();
        } else {
          this.appendOutput(`<div class="text-amber-400 font-mono text-xs py-1">permission denied: try running 'sudo hire-alex'</div>`);
        }
        break;
      case 'hire':
      case 'hire-alex':
        this.cmdHire();
        break;
      case 'clear':
      case 'cls':
        this.outputElement.innerHTML = '';
        this.printWelcome();
        break;
      case 'whoami':
        this.appendOutput(`<div class="text-slate-300 font-mono text-xs py-1">You are a welcome guest viewing Alex Morgan's interactive engineering portfolio.</div>`);
        break;
      case 'date':
        const now = new Date();
        this.appendOutput(`<div class="text-slate-300 font-mono text-xs py-1">${now.toUTCString()} (Local: ${now.toLocaleTimeString()})</div>`);
        break;
      case 'matrix':
        this.cmdMatrix();
        break;
      default:
        this.appendOutput(`
          <div class="text-red-400 font-mono text-xs py-1">
            command not found: "${this.escapeHtml(cmd)}". Type <span class="text-brand-300 underline cursor-pointer" onclick="window.runTerminalCmd('help')">help</span> to view available commands.
          </div>
        `);
    }
    this.scrollToBottom();
  }

  cmdHelp() {
    const list = [
      { cmd: 'about', desc: 'Summary of background, focus & location' },
      { cmd: 'skills', desc: 'Display engineering proficiencies & toolchain' },
      { cmd: 'projects', desc: 'Browse production apps, OSS & architectures' },
      { cmd: 'experience', desc: 'View career history & roles' },
      { cmd: 'contact', desc: 'Get direct communication links & socials' },
      { cmd: 'resume', desc: 'Open full interactive resume viewer' },
      { cmd: 'sudo hire-alex', desc: 'Instant hire / trigger recruiter workflow' },
      { cmd: 'matrix', desc: 'Enter cyberspace visual stream' },
      { cmd: 'date', desc: 'Display current system timestamp' },
      { cmd: 'clear', desc: 'Clear the terminal screen' }
    ];

    const html = `
      <div class="my-2 bg-slate-900/60 p-2.5 rounded border border-slate-800 font-mono text-xs">
        <p class="text-slate-400 mb-2 font-semibold">Available Commands:</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          ${list.map(item => `
            <div class="flex items-baseline">
              <span class="text-emerald-400 w-28 shrink-0 font-bold cursor-pointer hover:underline" onclick="window.runTerminalCmd('${item.cmd}')">${item.cmd}</span>
              <span class="text-slate-400 text-xs">${item.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    this.appendOutput(html);
  }

  cmdAbout() {
    const p = this.data.profile || {};
    const html = `
      <div class="my-2 bg-slate-900/60 p-3 rounded border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
        <p class="text-emerald-400 font-bold">${p.name} — ${p.tagline}</p>
        <p class="text-slate-300 leading-relaxed">${p.bioSummary}</p>
        <div class="pt-1 text-slate-400">
          <p>📍 <span class="text-white">${p.location}</span></p>
          <p>🟢 <span class="text-emerald-300">${p.status.text}</span></p>
        </div>
      </div>
    `;
    this.appendOutput(html);
  }

  cmdSkills() {
    const cats = this.data.skills?.categories || [];
    let html = `<div class="my-2 space-y-2 font-mono text-xs">`;
    cats.forEach(c => {
      html += `
        <div class="bg-slate-900/60 p-2.5 rounded border border-slate-800">
          <p class="text-sky-400 font-bold mb-1.5">${c.name}:</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            ${c.skills.map(s => `
              <div class="bg-slate-800/80 px-2 py-1 rounded flex justify-between items-center text-slate-300">
                <span>${s.name}</span>
                <span class="text-emerald-400 text-[10px]">${s.level}%</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    html += `</div>`;
    this.appendOutput(html);
  }

  cmdProjects(args) {
    const projs = this.data.projects || [];
    let html = `
      <div class="my-2 bg-slate-900/60 p-3 rounded border border-slate-800 font-mono text-xs space-y-2">
        <p class="text-emerald-400 font-bold">Featured Production & OSS Projects:</p>
        <div class="space-y-2">
          ${projs.map((p, i) => `
            <div class="border-b border-slate-800 pb-2 last:border-b-0 last:pb-0">
              <div class="flex items-center justify-between">
                <span class="text-white font-bold text-sm">[${i+1}] ${p.title}</span>
                <span class="text-slate-400 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">${p.badge}</span>
              </div>
              <p class="text-slate-300 text-xs my-0.5">${p.tagline}</p>
              <div class="text-[11px] text-sky-400 flex flex-wrap gap-1 mt-1">
                ${p.stack.slice(0, 4).map(t => `<span class="bg-slate-800/90 text-slate-300 px-1.5 py-0.2 rounded">${t}</span>`).join('')}
              </div>
              <div class="mt-1 flex gap-3 text-xs">
                <a href="${p.githubUrl}" target="_blank" class="text-emerald-400 hover:underline">GitHub ↗</a>
                <a href="${p.liveUrl}" target="_blank" class="text-sky-400 hover:underline">Demo ↗</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    this.appendOutput(html);
  }

  cmdExperience() {
    const exp = this.data.experience || [];
    let html = `
      <div class="my-2 bg-slate-900/60 p-3 rounded border border-slate-800 font-mono text-xs space-y-2">
        <p class="text-emerald-400 font-bold">Career Timeline:</p>
        <div class="space-y-3">
          ${exp.map(e => `
            <div>
              <div class="flex justify-between items-center text-slate-300">
                <span class="text-white font-bold">${e.role} @ ${e.company}</span>
                <span class="text-slate-400 text-[11px]">${e.period}</span>
              </div>
              <p class="text-slate-400 text-xs mt-0.5">${e.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    this.appendOutput(html);
  }

  cmdContact() {
    const p = this.data.profile || {};
    const html = `
      <div class="my-2 bg-slate-900/60 p-3 rounded border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
        <p class="text-emerald-400 font-bold">Direct Communication Channels:</p>
        <p>📧 Email: <a href="mailto:${p.email}" class="text-sky-400 hover:underline">${p.email}</a></p>
        <p>🐙 GitHub: <a href="${p.github}" target="_blank" class="text-sky-400 hover:underline">${p.github}</a></p>
        <p>💼 LinkedIn: <a href="${p.linkedin}" target="_blank" class="text-sky-400 hover:underline">${p.linkedin}</a></p>
        <p>🐦 Twitter: <a href="${p.twitter}" target="_blank" class="text-sky-400 hover:underline">${p.twitter}</a></p>
      </div>
    `;
    this.appendOutput(html);
  }

  cmdResume() {
    this.appendOutput(`
      <div class="my-2 text-emerald-400 font-mono text-xs">
        📄 Opening interactive resume viewer modal...
      </div>
    `);
    if (window.openResumeModal) {
      window.openResumeModal();
    }
  }

  cmdHire() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    if (window.soundFX) window.soundFX.playSuccess();

    this.appendOutput(`
      <div class="my-2 p-3 bg-emerald-950/60 border border-emerald-500/50 rounded font-mono text-xs text-emerald-300 space-y-1">
        <p class="font-bold text-sm">🎉 ACCESS GRANTED: Priority Recruiter / Client Channel Initialized!</p>
        <p class="text-slate-200">Thank you for your interest! Let's schedule an intro call or discuss your team's mission.</p>
        <div class="pt-2 flex flex-wrap gap-2">
          <a href="#contact" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold transition-colors">Jump to Contact Form ✉️</a>
          <button onclick="window.copyEmail()" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded border border-slate-700 transition-colors">Copy Email Address 📋</button>
        </div>
      </div>
    `);
  }

  cmdMatrix() {
    this.appendOutput(`<div class="font-mono text-emerald-500 text-[10px] leading-tight overflow-hidden select-none py-1">
      01000001 01001100 01000101 01011000 00100000 01001101 01001111 01010010 01000111 01000001 01001110<br/>
      wake up, neo... the matrix has you.<br/>
      follow the white rabbit 🐇
    </div>`);
  }

  appendOutput(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    this.outputElement.appendChild(div);
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

// Global hook to allow command chip clicks
window.runTerminalCmd = function(cmd) {
  if (window.terminalInstance) {
    window.terminalInstance.execute(cmd);
  }
};
