/**
 * BiteBox Main Application Controller
 * Clean Modern Architecture, Zero Emojis & Borderless UI
 */

import { RESTAURANTS, PROMOS } from './data.js';
import { state } from './state.js';
import { ICONS } from './icons.js';
import { initNavbar } from './components/navbar.js';
import { renderCategoryBubbles } from './components/categoryBubbles.js';
import { createRestaurantCard, renderRestaurantDetail } from './components/restaurantCard.js';
import { initCartDrawer } from './components/cartDrawer.js';
import { renderOrderTracking } from './components/orderTracking.js';
import { openAuthModal } from './components/authModal.js';
import { renderLandingPage } from './components/landingPage.js';
import { renderSubscriptionsPage } from './components/subscriptionsPage.js';
import { showToast } from './components/toast.js';

document.addEventListener('DOMContentLoaded', () => {
  // Apply persisted theme
  document.documentElement.setAttribute('data-theme', state.theme);

  // Initialize UI Shell
  initNavbar();
  initCartDrawer();

  // Render initial view
  renderCurrentView();

  // Listen for view transitions
  state.subscribe('view_changed', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderCurrentView();
  });

  // Listen for filter updates in home view
  state.subscribe('filter_changed', () => {
    if (state.currentView === 'home') {
      renderRestaurantList();
    }
  });

  state.subscribe('location_changed', () => {
    if (state.currentView === 'home') {
      renderCurrentView();
    }
  });

  // Signing out returns to the landing page
  state.subscribe('auth_changed', ({ isLoggedIn }) => {
    if (!isLoggedIn && state.currentView !== 'landing') {
      state.setView('landing');
    }
  });

  state.subscribe('theme_changed', () => {
    // Re-render views that draw theme-specific assets (tracking canvas, hero logo)
    if (state.currentView === 'tracking' || state.currentView === 'home') {
      renderCurrentView();
    }
  });
});

function renderCurrentView() {
  const mainContainer = document.getElementById('mainAppContainer');
  if (!mainContainer) return;

  // Landing page has its own header, so hide the app shell navbar
  document.body.classList.toggle('bb-landing-mode', state.currentView === 'landing');

  if (state.currentView === 'landing') {
    renderLandingPage('mainAppContainer');
  } else if (state.currentView === 'home') {
    renderHomeView(mainContainer);
  } else if (state.currentView === 'restaurant') {
    renderRestaurantDetail(state.activeRestaurantId, 'mainAppContainer');
  } else if (state.currentView === 'tracking') {
    renderOrderTracking('mainAppContainer');
  } else if (state.currentView === 'subscriptions') {
    renderSubscriptionsPage('mainAppContainer');
  }
}

function renderHomeView(container) {
  const user = state.user;
  const currentHour = new Date().getHours();
  let timeGreeting = 'Hungry between lectures?';
  if (currentHour >= 21 || currentHour < 5) {
    timeGreeting = 'Late night study cravings?';
  } else if (currentHour >= 12 && currentHour < 17) {
    timeGreeting = 'Quick campus lunch delivery';
  }

  container.innerHTML = `
    <!-- Hero & Campus Highlights Banner (Borderless) -->
    <section class="bb-hero-section fade-in">
      <div class="bb-hero-banner">
        <div class="bb-hero-content">
          <div class="bb-hero-badge">
            <span class="bb-badge bb-badge-glow">BiteBox Campus Express</span>
          </div>

          <h1 class="bb-hero-title">
            Hello dear, <span>${timeGreeting}</span>
          </h1>
          <p class="bb-hero-desc">
            Fast delivery to <strong>${state.selectedLocation.name}</strong> with free campus drop-off. Matooke, posho, rolex, kikomando & study fuel — ready in minutes.
          </p>

          <!-- Interactive Promo Cards Carousel -->
          <div class="bb-hero-promo-cards">
            ${PROMOS.slice(0, 3).map(promo => `
              <div class="bb-promo-card-mini" data-promo-code="${promo.code}">
                <div class="bb-promo-icon">${ICONS.tag}</div>
                <div class="bb-promo-info">
                  <span class="bb-promo-code">${promo.code}</span>
                  <span class="bb-promo-sub">${promo.title}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: center; max-width: 210px; flex-shrink: 0;">
          <img 
            src="${state.theme === 'dark' ? 'assets/logo-dark.png' : 'assets/logo-light.png'}" 
            alt="BiteBox Campus Delivery" 
            style="width: 100%; height: auto; max-height: 145px; object-fit: contain; filter: drop-shadow(0 6px 20px var(--bb-orange-glow)); transition: transform var(--bb-transition-fast);" 
          />
        </div>
      </div>

      <!-- Glovo Signature Category Bubbles -->
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h2 style="font-size: 1.2rem; font-weight: 800;">
            Browse Categories
          </h2>
          <span style="font-size: 0.78rem; color: var(--bb-text-muted);">Scroll to view all</span>
        </div>
        <div id="categoryBubblesContainer"></div>
      </div>

      <!-- Campus Filter & Tag Bar -->
      <div class="bb-filter-bar" id="restaurantListSection">
        <div class="bb-filter-chips">
          <button class="bb-chip ${state.activeFilters.underFive ? 'active' : ''}" data-filter="underFive">
            <span>${ICONS.tag}</span> Budget Meals (under UGX 4k)
          </button>
          <button class="bb-chip ${state.activeFilters.fastDelivery ? 'active' : ''}" data-filter="fastDelivery">
            <span>${ICONS.clock}</span> Fastest (< 15 mins)
          </button>
          <button class="bb-chip ${state.activeFilters.lateNightOnly ? 'active' : ''}" data-filter="lateNightOnly">
            <span>${ICONS.moon}</span> Open 24/7 Late Night
          </button>
          <button class="bb-chip ${state.activeFilters.campusLegend ? 'active' : ''}" data-filter="campusLegend">
            <span>${ICONS.star}</span> Campus Legends
          </button>
        </div>

        <div style="font-size: 0.82rem; color: var(--bb-text-muted);" id="restaurantCountDisplay">
          Showing all spots
        </div>
      </div>

      <!-- Restaurants Grid -->
      <div id="restaurantGridContainer" class="bb-restaurant-grid"></div>
    </section>
  `;

  // Render Bubbles
  renderCategoryBubbles('categoryBubblesContainer');

  // Attach Promo Card Click
  container.querySelectorAll('.bb-promo-card-mini').forEach(card => {
    card.addEventListener('click', () => {
      const code = card.dataset.promoCode;
      window.openCartDrawer();
      const res = state.applyPromoCode(code);
      if (res.success) {
        showToast(res.message, 'success');
      } else {
        showToast(`Promo ${code} will apply once minimum order is reached`, 'info');
      }
    });
  });

  // Attach Chip Filters
  container.querySelectorAll('.bb-chip[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      const filterKey = chip.dataset.filter;
      state.toggleFilter(filterKey);
      chip.classList.toggle('active', state.activeFilters[filterKey]);
      renderRestaurantList();
    });
  });

  // Render Restaurants
  renderRestaurantList();
}

function renderRestaurantList() {
  const grid = document.getElementById('restaurantGridContainer');
  const countDisplay = document.getElementById('restaurantCountDisplay');
  if (!grid) return;

  grid.innerHTML = '';

  let filtered = RESTAURANTS.filter(restaurant => {
    // Category match
    if (state.selectedCategory !== 'all') {
      if (!restaurant.categories.includes(state.selectedCategory)) {
        return false;
      }
    }

    // Search query match
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const matchName = restaurant.name.toLowerCase().includes(q);
      const matchTagline = restaurant.tagline.toLowerCase().includes(q);
      const matchMenu = restaurant.menu.some(m => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
      if (!matchName && !matchTagline && !matchMenu) {
        return false;
      }
    }

    // Active Filter Chips
    if (state.activeFilters.underFive && restaurant.minOrder > 4000) {
      return false;
    }
    if (state.activeFilters.fastDelivery && !restaurant.deliveryTime.includes('8-') && !restaurant.deliveryTime.includes('10-') && !restaurant.deliveryTime.includes('12-') && !restaurant.deliveryTime.includes('15-')) {
      return false;
    }
    if (state.activeFilters.lateNightOnly && !restaurant.isOpenLate) {
      return false;
    }
    if (state.activeFilters.campusLegend && !restaurant.isCampusLegend) {
      return false;
    }

    return true;
  });

  if (countDisplay) {
    countDisplay.textContent = `${filtered.length} spots open now`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; background: var(--bb-bg-card); border-radius: var(--bb-radius-lg); box-shadow: var(--bb-shadow-sm);">
        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">No spots match your filters</h3>
        <p style="font-size: 0.85rem; color: var(--bb-text-muted); margin-bottom: 1.25rem;">
          Try clearing your search query or category filters to see all available meals.
        </p>
        <button class="bb-btn bb-btn-yellow bb-btn-sm" id="resetFiltersBtn">Reset Filters</button>
      </div>
    `;

    document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
      state.selectedCategory = 'all';
      state.searchQuery = '';
      state.activeFilters = { underFive: false, fastDelivery: false, lateNightOnly: false, campusLegend: false };
      renderCurrentView();
    });
    return;
  }

  filtered.forEach(restaurant => {
    const cardEl = createRestaurantCard(restaurant);
    grid.appendChild(cardEl);
  });
}
