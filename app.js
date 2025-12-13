document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Data (remove mocks)
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const storage = localStorage;

  // Init values
  let xp = parseInt(storage.getItem('xp')) || 0;
  let balance = parseInt(storage.getItem('balance')) || 0;
  let events = getRandom(5, 15);
  let gas = (getRandom(10, 50) / 100).toFixed(2);
  let rewards = 150;
  let walletConnected = false;

  // Update DOM
  document.getElementById('xp-value').textContent = xp;
  document.getElementById('xp-streak').textContent = xp;
  document.getElementById('spawn-balance').textContent = `${balance} SPN`;
  document.getElementById('spawn-balance-dupe').textContent = `${balance} SPN`;
  document.getElementById('mesh-events').textContent = events;
  document.getElementById('today-events').textContent = events;
  document.getElementById('gas-estimate').textContent = gas;
  document.getElementById('reward-xp').textContent = rewards;
  document.querySelector('.gas-meter-fill').style.width = `${(events / 20) * 100}%`;

  // Live Pulls (dynamic)
  const pulls = ['Neon Fragments: hit 4×', 'Shard Forge: pulled 37', 'Ember Trials: x3', 'Crown Lineage: 92', 'Base Relics: 1/1'];
  const livePulls = document.getElementById('live-pulls');
  pulls.forEach(p => {
    const pill = document.createElement('div');
    pill.className = 'ticker-pill';
    pill.innerHTML = `<span>${p}</span><span class="rarity-${getRandom(1,5) > 3 ? 'relic' : 'fragment'}">${getRandom(1,10)}x</span>`;
    livePulls.appendChild(pill);
  });
  livePulls.innerHTML += livePulls.innerHTML; // For scroll

  // Tasks (interactive)
  const tasks = [
    { label: 'Open a test pack', sub: '', xp: 50, done: false },
    { label: 'Share your mesh', sub: '', xp: 100, done: false }
  ];
  const taskItems = document.getElementById('task-items');
  tasks.forEach((t, i) => {
    const item = document.createElement('div');
    item.className = 'task-item';
    item.innerHTML = `
      <div class="task-left">
        <div class="task-dot ${t.done ? 'done' : ''}"></div>
        <div>
          <div class="task-label-main">${t.label}</div>
          <div class="task-label-sub">${t.sub}</div>
        </div>
      </div>
      <span class="task-xp">+${t.xp} XP</span>
      <button class="task-cta ${t.done ? 'done' : ''}" onclick="completeTask(${i})">${t.done ? 'Done' : 'Do'}</button>
    `;
    taskItems.appendChild(item);
  });

  window.completeTask = (index) => {
    tasks[index].done = true;
    xp += tasks[index].xp;
    rewards -= tasks[index].xp;
    storage.setItem('xp', xp);
    document.getElementById('xp-value').textContent = xp;
    document.getElementById('xp-streak').textContent = xp;
    document.getElementById('reward-xp').textContent = rewards;
    // Re-render tasks
    taskItems.innerHTML = '';
    tasks.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = 'task-item';
      item.innerHTML = `
        <div class="task-left">
          <div class="task-dot ${t.done ? 'done' : ''}"></div>
          <div>
            <div class="task-label-main">${t.label}</div>
            <div class="task-label-sub">${t.sub}</div>
          </div>
        </div>
        <span class="task-xp">+${t.xp} XP</span>
        <button class="task-cta ${t.done ? 'done' : ''}" ${t.done ? 'disabled' : `onclick="completeTask(${i})"`}>${t.done ? 'Done' : 'Do'}</button>
      `;
      taskItems.appendChild(item);
    });
  };

  // Recent Pulls (dynamic)
  const recentPulls = ['Neon Fragments: Shard · 10 packs, Luck 1/420', 'Base Relics: Relic · 3 packs, Luck 1/1200', 'Ember Trials: Ember · 5 packs, Luck 1/640'];
  const recentList = document.getElementById('recent-pulls-list');
  recentPulls.forEach(p => {
    const item = document.createElement('div');
    item.className = 'recent-pull-item';
    item.innerHTML = `
      <span class="recent-pack">${p.split(':')[0]}</span>
      <span class="recent-meta">${p.split(':')[1]}</span>
      <span class="luck-label">Luck <span>${getRandom(1,1000)}</span></span>
    `;
    recentList.appendChild(item);
  });

  // PNL Chart (dynamic bars)
  const pnlChart = document.getElementById('pnl-chart');
  for (let i = 0; i < 10; i++) {
    const bar = document.createElement('div');
    bar.className = `pnl-bar ${Math.random() > 0.5 ? '' : 'pnl-bar-negative'}`;
    const height = getRandom(20, 100);
    bar.innerHTML = `<div class="pnl-bar-inner" style="--h: ${height}%;"></div>`;
    pnlChart.appendChild(bar);
  }

  // Wallet Connect
  const walletBtn = document.getElementById('wallet-connect');
  const walletStatus = document.getElementById('wallet-status');
  const walletModal = document.getElementById('wallet-modal');
  const connectConfirm = document.getElementById('connect-confirm');

  walletBtn.addEventListener('click', () => walletModal.classList.add('open'));
  connectConfirm.addEventListener('click', () => {
    walletConnected = true;
    walletBtn.classList.add('wallet-connected');
    walletBtn.textContent = 'Connected';
    walletStatus.textContent = 'Wallet connected';
    balance = getRandom(100, 1000);
    storage.setItem('balance', balance);
    document.getElementById('spawn-balance').textContent = `${balance} SPN`;
    document.getElementById('spawn-balance-dupe').textContent = `${balance} SPN`;
    walletModal.classList.remove('open');
  });
  walletModal.querySelector('.modal-btn:not(.primary)').addEventListener('click', () => walletModal.classList.remove('open'));

  // Side Menu
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  menuToggle.addEventListener('click', () => sideMenu.classList.add('open'));
  sideMenu.querySelector('.side-menu-backdrop').addEventListener('click', () => sideMenu.classList.remove('open'));

  // Themes
  document.querySelectorAll('.side-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.className = `theme-${btn.dataset.theme}`;
      document.querySelectorAll('.side-theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
