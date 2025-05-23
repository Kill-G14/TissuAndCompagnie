/*
window.addEventListener('DOMContentLoaded', () => {
    const loadComponent = async (selector, path) => {
      const container = document.querySelector(selector);
      if (!container) return;
      const response = await fetch(path);
      if (response.ok) {
        container.innerHTML = await response.text();
      } else {
        console.error(`Erreur lors du chargement de ${path}`);
      }
    };
  
    loadComponent('#header-container', 'components/header.html');
    loadComponent('#nav-container', 'components/nav.html');
    loadComponent('#footer-container', 'components/footer.html');
  });
  