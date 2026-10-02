/**
 * BiteBox Restaurant Card & Detail View
 * Borderless Cards, UGX Pricing & Fallback Image Handlers
 */

import { RESTAURANTS } from '../data.js';
import { state } from '../state.js';
import { ICONS } from '../icons.js';
import { openMenuModal } from './menuModal.js';

export function createRestaurantCard(restaurant) {
  const card = document.createElement('div');
  card.className = 'bb-restaurant-card fade-in';
  card.dataset.restaurantId = restaurant.id;

  card.innerHTML = `
    <div class="bb-card-image-wrap">
      <img 
        src="${restaurant.image}" 
        alt="${restaurant.name}" 
        loading="lazy" 
        onerror="this.onerror=null; this.src='assets/food/burger.jpg';"
      />
      
      <div class="bb-card-badge-top-left">
        ${restaurant.studentDiscountBadge ? `
          <span class="bb-badge bb-badge-glow">${restaurant.studentDiscountBadge}</span>
        ` : ''}
        ${restaurant.isCampusLegend ? `
          <span class="bb-badge bb-badge-dark">Campus Legend</span>
        ` : ''}
      </div>

      <div class="bb-card-time-pill">
        <span style="display: flex;">${ICONS.clock}</span>
        <span>${restaurant.deliveryTime}</span>
      </div>
    </div>

    <div class="bb-card-content">
      <div class="bb-card-header">
        <h3 class="bb-card-title">${restaurant.name}</h3>
        <div class="bb-card-rating">
          <span style="display: flex;">${ICONS.star}</span>
          <span>${restaurant.rating}</span>
        </div>
      </div>

      <p class="bb-card-tagline">${restaurant.tagline}</p>

      <div class="bb-card-footer">
        <div class="bb-card-distance">
          <span style="display: flex;">${ICONS.pin}</span>
          <span>${restaurant.distance}</span>
        </div>
        <div class="bb-card-free-delivery">
          <span style="display: flex;">${ICONS.scooter}</span>
          <span>Free Delivery</span>
        </div>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    state.setView('restaurant', { restaurantId: restaurant.id });
  });

  return card;
}

export function renderRestaurantDetail(restaurantId, containerId = 'mainAppContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const restaurant = RESTAURANTS.find(r => r.id === restaurantId) || RESTAURANTS[0];

  const categoriesMap = {};
  restaurant.menu.forEach(item => {
    if (!categoriesMap[item.category]) {
      categoriesMap[item.category] = [];
    }
    categoriesMap[item.category].push(item);
  });

  container.innerHTML = `
    <div class="bb-restaurant-detail-view fade-in">
      
      <!-- Restaurant Banner -->
      <div class="bb-detail-banner-container">
        <img 
          src="${restaurant.bannerImage}" 
          alt="${restaurant.name}" 
          onerror="this.onerror=null; this.src='assets/food/burger.jpg';"
        />
        <div class="bb-detail-banner-overlay"></div>
        
        <button class="bb-detail-back-btn" id="detailBackBtn">
          <span style="display: flex;">${ICONS.arrowLeft}</span>
          <span>Back to Campus Spots</span>
        </button>
      </div>

      <!-- Restaurant Info Card (Borderless) -->
      <div class="bb-detail-header-info">
        <div class="bb-detail-title-row">
          <div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
              ${restaurant.studentDiscountBadge ? `<span class="bb-badge bb-badge-glow">${restaurant.studentDiscountBadge}</span>` : ''}
              ${restaurant.isOpenLate ? `<span class="bb-badge bb-badge-yellow">Open 24/7</span>` : ''}
              <span class="bb-badge bb-badge-dark">${restaurant.locationTag}</span>
            </div>
            <h1 class="bb-detail-title">${restaurant.name}</h1>
            <p style="color: var(--bb-text-secondary); margin-top: 0.35rem; font-size: 0.95rem;">${restaurant.tagline}</p>
          </div>

          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.35rem;">
            <div class="bb-card-rating" style="font-size: 1.05rem; padding: 0.35rem 0.8rem;">
              <span style="display: flex;">${ICONS.star}</span>
              <span>${restaurant.rating}</span>
              <span style="font-size: 0.78rem; font-weight: 500; color: var(--bb-text-muted);">(${restaurant.reviewCount}+)</span>
            </div>
            <span style="font-size: 0.78rem; color: var(--bb-text-muted);">Budget Friendly</span>
          </div>
        </div>

        <div class="bb-detail-stats">
          <div class="bb-detail-stat-item">
            <span style="display: flex;">${ICONS.clock}</span>
            <strong>${restaurant.deliveryTime}</strong>
          </div>
          <div class="bb-detail-stat-item" style="color: var(--bb-status-success);">
            <span style="display: flex;">${ICONS.scooter}</span>
            <strong>UGX 0</strong> Free Drop-off
          </div>
          <div class="bb-detail-stat-item">
            <span style="display: flex;">${ICONS.card}</span>
            <span>Mobile Money & Campus Cash</span>
          </div>
        </div>
      </div>

      <!-- Menu Navigation Tabs -->
      <div class="bb-detail-category-tabs" id="menuTabs">
        <button class="bb-category-tab-btn active" data-target="all-menu">All Meals</button>
        ${Object.keys(categoriesMap).map(catName => `
          <button class="bb-category-tab-btn" data-target="cat-${catName.replace(/\s+/g, '-')}">${catName}</button>
        `).join('')}
      </div>

      <!-- Menu Items Sections -->
      <div class="bb-menu-sections" style="display: flex; flex-direction: column; gap: 2.5rem;">
        ${Object.entries(categoriesMap).map(([catName, items]) => `
          <div class="bb-menu-category-block" id="cat-${catName.replace(/\s+/g, '-')}">
            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; font-weight: 800;">
              ${catName}
            </h3>

            <div class="bb-menu-grid">
              ${items.map(item => `
                <div class="bb-menu-card" data-item-id="${item.id}">
                  <div class="bb-menu-info">
                    <div>
                      <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.25rem;">
                        <h4 class="bb-menu-title">${item.name}</h4>
                        ${item.isBestseller ? `<span class="bb-badge bb-badge-orange" style="font-size: 0.65rem; padding: 0.15rem 0.4rem;">Top Pick</span>` : ''}
                      </div>
                      <p class="bb-menu-desc">${item.description}</p>
                    </div>

                    <div class="bb-menu-meta">
                      <div class="bb-menu-price">UGX ${item.price.toLocaleString('en-US')}</div>
                      ${item.prepTime ? `<span class="bb-menu-time"><span style="display:flex;">${ICONS.clock}</span> ${item.prepTime}</span>` : ''}
                      ${item.calories ? `<span class="bb-menu-time">${item.calories}</span>` : ''}
                    </div>
                  </div>

                  <div class="bb-menu-thumb">
                    <img 
                      src="${item.image}" 
                      alt="${item.name}" 
                      loading="lazy" 
                      onerror="this.onerror=null; this.src='assets/food/rolex.jpg';"
                    />
                    <button class="bb-menu-add-btn" title="Customize">+</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;

  document.getElementById('detailBackBtn').addEventListener('click', () => {
    state.setView('home');
  });

  container.querySelectorAll('.bb-category-tab-btn').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      container.querySelectorAll('.bb-category-tab-btn').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');

      const targetId = tabBtn.dataset.target;
      if (targetId === 'all-menu') {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  container.querySelectorAll('.bb-menu-card').forEach(card => {
    card.addEventListener('click', () => {
      const itemId = card.dataset.itemId;
      const item = restaurant.menu.find(m => m.id === itemId);
      if (item) {
        openMenuModal(item, restaurant);
      }
    });
  });
}
