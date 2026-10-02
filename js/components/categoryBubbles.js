/**
 * BiteBox Circular Category Bubbles Component
 * Minimal SVG iconography & Borderless surfaces
 */

import { CATEGORIES } from '../data.js';
import { state } from '../state.js';
import { ICONS } from '../icons.js';

export function renderCategoryBubbles(containerId = 'categoryBubblesContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  function render() {
    container.innerHTML = `
      <div class="bb-category-scroll">
        ${CATEGORIES.map(cat => {
          const isActive = state.selectedCategory === cat.id;
          const svgIcon = ICONS[cat.iconKey] || ICONS.categoryAll;
          return `
            <div class="bb-category-bubble ${isActive ? 'active' : ''}" data-category-id="${cat.id}">
              <div class="bb-bubble-circle">
                <span style="display: flex; align-items: center; justify-content: center;">${svgIcon}</span>
              </div>
              <div class="bb-bubble-name">${cat.name}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('.bb-category-bubble').forEach(bubble => {
      bubble.addEventListener('click', () => {
        const catId = bubble.dataset.categoryId;
        state.setCategory(catId);
        render();
        
        const listEl = document.getElementById('restaurantListSection');
        if (listEl) {
          listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  state.subscribe('filter_changed', () => {
    container.querySelectorAll('.bb-category-bubble').forEach(b => {
      if (b.dataset.categoryId === state.selectedCategory) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  });

  render();
}
