const state = JSON.parse(localStorage.getItem('appState')) || {
  wallet: null,
  xp: 0,
  spawn: 0,
  meshEvents: 0,
  activeTab: 'home',
  gasLevel: 0.35,
  tasks: { testPack: false, share: false },
  theme: 'default'
};

function saveState() {
  localStorage.setItem('appState', JSON.stringify(state));
}

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function init() {
  document.getElementById('app-root').innerHTML = `
    <div class="app-shell">
      <div class="app-frame">
        <header class="app-header">
          <div class="brand-row">
            <div class="brand-left">
              <button id="menu-btn" class="menu-btn"><span></span><span></span><span></span></button>
              <div class="brand-icon">SE</div>
              <div>
                <div class="brand-copy-title">SPAWNENGINE</div>
                <div class="brand-copy-sub">Modular mesh for packs, XP, bounties & creator modules.</div>
              </div>
            </div>
            <div class="brand-right">
              <div class="pill"><span class="pill-dot"></span>Base · Mesh layer</div>
              <button id="btn-wallet" class="btn-wallet"><span id="wallet-status-icon">⦿</span><span id="wallet-label">Connect</span></button>
              <div id="wallet-address-small" class="wallet-small">No wallet connected</div>
            </div>
          </div>
          <div class="mode-row"><span>MODE · v0.2</span><span>MESH PREVIEW · SINGLE PLAYER</span></div>
          <div class="status-row">
            <div class="status-pill">
              <span class="status-pill-label">Gas</span>
              <span id="status-gas" class="status-pill-value">~0.00 gwei est.</span>
              <div class="gas-meter"><div id="gas-meter-fill" class="gas-meter-fill"></div></div>
            </div>
            <div class="status-pill">
              <span class="status-pill-label">Mesh</span>
              <span id="status-mesh" class="status-pill-value">${state.meshEvents} events</span>
            </div>
          </div>
          <div class="status-row">
            <div class="status-pill">
              <span class="status-pill-label">XP streak</span>
              <span id="status-xp" class="status-pill-value">${state.xp}</span>
            </div>
            <div class="status-pill">
              <span class="status-pill-label">SPN</span>
              <span id="status-spawn" class="status-pill-value">${state.spawn}</span>
            </div>
          </div>
          <div class="nav-row"><div id="nav-tabs" class="nav-tabs"></div></div>
        </header>
        <div class="ticker">
          <span class="ticker-label">Live pulls</span>
          <div class="ticker-stream"><div id="ticker-inner" class="ticker-inner"></div></div>
        </div>
        <main id="main-content" class="main-content"></main>
        <footer class="app-footer">
          <span>SpawnEngine · Layer on Base</span>
          <div class="footer-links">
            <a href="https://zora.co/@spawniz">Zora</a>
            <a href="https://warpcast.com/spawniz">Farcaster</a>
            <a href="https://x.com/spawnizz">X</a>
          </div>
        </footer>
        <!-- Modals and Side Menu here, simplified as in previous -->
      </div>
    </div>
  `;

  // Wire up everything dynamically
  wireWallet();
  renderTabs();
  renderTicker();
  wireMenu();
  // Add more wirings as needed
  renderActiveView();
  updateGasMeter();
  setInterval(updateGasMeter, 8000); // New: Auto update gas
  saveState();
}

// Add more functions here, simplified from your code
// For example, wireWallet with random wallet
function wireWallet() {
  const btn = document.getElementById('btn-wallet');
  btn.addEventListener('click', () => {
    state.wallet = state.wallet ? null : `0x${getRandom(1000, 9999)}...`;
    state.spawn = state.wallet ? getRandom(100, 1000) : 0;
    saveState();
    renderActiveView();
  });
}

// Etc for other functions, keeping them short

init();
