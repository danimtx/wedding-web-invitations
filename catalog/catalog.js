/**
 * Stealth Studio Catalog Controller
 * Manages views, sidebar collapsing with hover icon, accordion folders,
 * list/grid toggling, and Dark/Light mode switcher.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. THEME SWITCHER (Dark Mode by default)
  // ========================================================================
  const html = document.documentElement;
  const btnDark = document.getElementById('theme-btn-dark');
  const btnLight = document.getElementById('theme-btn-light');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      html.classList.add('light-mode');
      if (btnLight) btnLight.classList.add('active');
      if (btnDark) btnDark.classList.remove('active');
    } else {
      html.classList.remove('light-mode');
      if (btnDark) btnDark.classList.add('active');
      if (btnLight) btnLight.classList.remove('active');
    }
    localStorage.setItem('stealth_theme', theme);
  };

  // Read saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('stealth_theme') || 'dark';
  applyTheme(savedTheme);

  if (btnDark) btnDark.addEventListener('click', () => applyTheme('dark'));
  if (btnLight) btnLight.addEventListener('click', () => applyTheme('light'));


  // ========================================================================
  // 2. SIDEBAR COLLAPSE & TOGGLE
  // ========================================================================
  const sidebar = document.getElementById('sidebar');
  const btnCollapseSidebar = document.getElementById('btn-collapse-sidebar');
  const btnReopenSidebar = document.getElementById('btn-reopen-sidebar');

  const collapseSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.add('is-collapsed');
    if (btnReopenSidebar) {
      btnReopenSidebar.classList.remove('hidden');
      btnReopenSidebar.classList.add('flex');
    }
  };

  const expandSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.remove('is-collapsed');
    if (btnReopenSidebar) {
      btnReopenSidebar.classList.add('hidden');
      btnReopenSidebar.classList.remove('flex');
    }
  };

  if (btnCollapseSidebar) btnCollapseSidebar.addEventListener('click', (e) => {
    e.stopPropagation();
    collapseSidebar();
  });

  if (btnReopenSidebar) btnReopenSidebar.addEventListener('click', (e) => {
    e.stopPropagation();
    expandSidebar();
  });


  // ========================================================================
  // 3. SIDEBAR ACCORDION FOLDERS (Templates v1, v2, v3)
  // ========================================================================
  const folderHeaders = document.querySelectorAll('.folder-header');

  folderHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      // Toggle accordion sublist
      const wrapper = header.nextElementSibling;
      const isOpen = header.classList.contains('is-open');

      if (isOpen) {
        header.classList.remove('is-open');
        if (wrapper) wrapper.classList.remove('is-expanded');
      } else {
        header.classList.add('is-open');
        if (wrapper) wrapper.classList.add('is-expanded');
      }

      // Switch view to this folder's collection
      const targetView = header.getAttribute('data-folder-target');
      if (targetView) {
        switchView(targetView);
      }
    });
  });


  // ========================================================================
  // 4. VIEW ROUTER (Dashboard, v1, v2, v3)
  // ========================================================================
  const navItems = document.querySelectorAll('[data-nav-view]');
  const viewSections = document.querySelectorAll('.view-section');
  const currentViewLabel = document.getElementById('current-view-label');

  function switchView(viewId) {
    // Hide all view sections
    viewSections.forEach(sec => sec.classList.add('hidden'));

    // Show target section
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.remove('hidden');
    }

    // Update active state on nav links
    navItems.forEach(item => {
      if (item.getAttribute('data-nav-view') === viewId) {
        item.classList.add('active-nav-item');
      } else {
        item.classList.remove('active-nav-item');
      }
    });

    // Update folder header states
    folderHeaders.forEach(fh => {
      if (fh.getAttribute('data-folder-target') === viewId) {
        fh.classList.add('ring-1', 'ring-orange-500/50');
      } else {
        fh.classList.remove('ring-1', 'ring-orange-500/50');
      }
    });

    // Update breadcrumb label
    if (currentViewLabel) {
      const titles = {
        'dashboard': 'Dashboard',
        'v1': 'Templates v1',
        'v2': 'Templates v2',
        'v3': 'Templates v3'
      };
      currentViewLabel.textContent = titles[viewId] || 'Templates v1';
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = item.getAttribute('data-nav-view');
      switchView(viewId);
    });
  });

  // Clicking sublist links jumps to item and highlights it
  document.querySelectorAll('[data-jump-model]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modelId = link.getAttribute('data-jump-model');
      switchView('v1');
      const row = document.querySelector(`[data-model-row="${modelId}"]`);
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        row.classList.add('bg-orange-500/20');
        setTimeout(() => row.classList.remove('bg-orange-500/20'), 2200);
      }
    });
  });

  // Default initial view: Dashboard as requested
  switchView('dashboard');


  // ========================================================================
  // 5. VIEW SWITCHER (List vs Grid)
  // ========================================================================
  const btnList = document.getElementById('tab-view-list');
  const btnGrid = document.getElementById('tab-view-grid');
  const listContainers = document.querySelectorAll('.view-mode-list');
  const gridContainers = document.querySelectorAll('.view-mode-grid');

  if (btnList && btnGrid) {
    btnList.addEventListener('click', () => {
      btnList.classList.add('active-tab');
      btnList.style.backgroundColor = 'var(--bg-surface)';
      btnList.style.color = 'var(--text-primary)';

      btnGrid.classList.remove('active-tab');
      btnGrid.style.backgroundColor = 'transparent';
      btnGrid.style.color = 'var(--text-muted)';

      listContainers.forEach(c => c.classList.remove('hidden'));
      gridContainers.forEach(c => c.classList.add('hidden'));
    });

    btnGrid.addEventListener('click', () => {
      btnGrid.classList.add('active-tab');
      btnGrid.style.backgroundColor = 'var(--bg-surface)';
      btnGrid.style.color = 'var(--text-primary)';

      btnList.classList.remove('active-tab');
      btnList.style.backgroundColor = 'transparent';
      btnList.style.color = 'var(--text-muted)';

      listContainers.forEach(c => c.classList.add('hidden'));
      gridContainers.forEach(c => c.classList.remove('hidden'));
    });
  }


  // ========================================================================
  // 6. SELECT ALL CHECKBOXES
  // ========================================================================
  document.querySelectorAll('.select-all-checkbox').forEach(selectAllBox => {
    selectAllBox.addEventListener('change', () => {
      const table = selectAllBox.closest('table');
      if (!table) return;
      const rowBoxes = table.querySelectorAll('tbody .custom-checkbox');
      rowBoxes.forEach(box => {
        box.checked = selectAllBox.checked;
      });
    });
  });

});
