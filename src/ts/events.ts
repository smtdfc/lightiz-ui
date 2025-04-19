import { LightizUITab } from './components/index.js';
import { createElement } from './utils/element.js';

window.addEventListener('click', function(e: MouseEvent) {
  let target = e.target as HTMLElement;
  
  if (target.classList.contains('sub-menu')) {
    target.classList.toggle('open');
    return;
  }
  
  if (target.tagName.toLowerCase() === 'a') {
    let parentSubMenu = target.closest('.sub-menu') as HTMLElement;
    
    if (parentSubMenu) {
      parentSubMenu.classList.toggle('open');
    }
  }
});

window.addEventListener('load', () => {
  document.querySelectorAll('.tabs-container').forEach(element => {
    let tab = new LightizUITab(element as HTMLElement);
    tab.active(tab.getActiveItem() || createElement('div'));
  });
});