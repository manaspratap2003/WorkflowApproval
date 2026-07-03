// ── Theme management ──────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('theme');
  const theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', theme);
  if (!saved) {
    localStorage.setItem('theme', theme);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// ── Mobile sidebar toggle ──────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  sidebar.classList.toggle('open');
  document.body.classList.toggle('sidebar-open', sidebar.classList.contains('open'));
}

// ── Modal helpers ──────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
function closeModalOutside(event, id) {
  if (event.target.id === id) closeModal(id);
}

// Escape key closes any open modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(el => el.classList.remove('open'));
  }
});

// ── Dropzone label update ──────────────────────────────────
function updateDropzone(input) {
  const display = document.getElementById('file-name-display');
  if (display && input.files.length > 0) {
    display.textContent = '✓ ' + input.files[0].name;
  }
}

// ── Task comment thread toggle ─────────────────────────────
function toggleTaskComments(taskId) {
  const thread = document.getElementById('thread-' + taskId);
  if (thread) thread.classList.toggle('open');
}

// ── Skeleton placeholders while loading ──────────────────────────
function showSkeletons(selector, count = 3) {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = Array(count)
    .fill(0)
    .map(() => `
      <div class="skeleton-card">
        <div class="skeleton-line" style="width: 60%; margin-bottom: 8px;"></div>
        <div class="skeleton-line" style="width: 100%; margin-bottom: 8px;"></div>
        <div class="skeleton-line" style="width: 80%;"></div>
      </div>
    `)
    .join('');
}

function hideSkeletons(selector) {
  const container = document.querySelector(selector);
  if (container) container.innerHTML = '';
}

// ── 3D card tilt on mouse move ─────────────────────────────
function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) scale(1.01) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Staggered page content entrance ───────────────────────
function initStaggeredEntrance() {
  const items = document.querySelectorAll('.project-card, .task-card, .approval-card, .file-row, .comment-item');
  items.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = `opacity 0.4s ease ${i * 40}ms, transform 0.4s ease ${i * 40}ms`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCardTilt();
  initStaggeredEntrance();

  const authPage = document.querySelector('.auth-page');
  if (authPage) {
    requestAnimationFrame(() => authPage.classList.add('auth-entered'));
  }

  // Tab switching
  const tabs = document.querySelectorAll('.tab');

  function activateTab(targetName) {
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const matchTab = [...tabs].find(t => t.dataset.tab === targetName);
    const matchPanel = document.getElementById('tab-' + targetName);
    if (matchTab) matchTab.classList.add('active');
    if (matchPanel) matchPanel.classList.add('active');
  }

  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  if (tabParam) activateTab(tabParam);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  // Auto-dismiss toasts
  document.querySelectorAll('.toast').forEach(t => {
    setTimeout(() => {
      t.style.transition = 'opacity .5s';
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 500);
    }, 4000);
  });

  // Loading state on form submission
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn && !submitBtn.classList.contains('loading')) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  });

  // Close sidebar when clicking a nav link
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
      }
    });
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.sidebar-toggle');
    if (sidebar && toggle && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
      document.body.classList.remove('sidebar-open');
    }
  });
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (!localStorage.getItem('theme')) {
    initTheme();
  }
});

// ── Auth page: login ↔ register transition ─────────────────────
let authSwitching = false;

function switchAuthMode(mode) {
  if (authSwitching || !mode) return;

  const authPage = document.querySelector('.auth-page');
  const stage = document.getElementById('auth-forms-stage');
  if (!authPage || !stage) return;

  const current = authPage.getAttribute('data-auth-mode');
  if (current === mode) return;

  authSwitching = true;
  authPage.classList.add('is-switching');
  stage.classList.add('is-blurring');

  setTimeout(() => {
    authPage.setAttribute('data-auth-mode', mode);

    document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.auth-left-panel').forEach(p => p.classList.remove('active'));

    const loginPanel = document.getElementById('auth-panel-login');
    const registerPanel = document.getElementById('auth-panel-register');
    const loginLeft = document.querySelector('.auth-left-panel-login');
    const registerLeft = document.querySelector('.auth-left-panel-register');

    if (mode === 'register') {
      registerPanel?.classList.add('active');
      registerLeft?.classList.add('active');
      history.replaceState(null, '', '/Auth/Register');
    } else {
      loginPanel?.classList.add('active');
      loginLeft?.classList.add('active');
      history.replaceState(null, '', '/Auth/Login');
    }

    stage.classList.remove('is-blurring');
    authPage.classList.remove('is-switching');

    requestAnimationFrame(() => {
      authSwitching = false;
    });
  }, 380);
}
