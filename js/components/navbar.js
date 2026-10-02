/**
 * BiteBox Navbar Component (Zero Emojis + Dual Theme Support)
 */

import { state } from '../state.js';
import { CAMPUS_LOCATIONS } from '../data.js';
import { ICONS } from '../icons.js';
import { showToast } from './toast.js';

export function initNavbar() {
  const navbarEl = document.getElementById('navbarContainer');
  if (!navbarEl) return;

  function render() {
    const summary = state.getCartSummary();
    const loc = state.selectedLocation;
    const user = state.user;
    const hasActiveOrder = state.activeOrder && state.activeOrder.status !== 'completed' && state.activeOrder.status !== 'cancelled';
    const isDark = state.theme === 'dark';

    navbarEl.innerHTML = `
      <nav class="bb-navbar">
        <div class="bb-container bb-nav-inner">
          
          <!-- Logo & Brand (Dual Mode Official Logos) -->
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <a href="#" class="bb-logo" id="navLogoBtn" title="BiteBox - Food Delivery for Campus Students">
              <img 
                src="${isDark ? 'assets/logo-dark.png' : 'assets/logo-light.png'}" 
                alt="BiteBox Logo" 
                class="bb-brand-logo" 
              />
            </a>

            <!-- Campus Delivery Location Selector -->
            <button class="bb-nav-location-btn" id="navLocationBtn" title="Change Campus Delivery Spot">
              <span style="color: var(--bb-orange-primary); display: flex; align-items: center;">${ICONS.pin}</span>
              <div class="bb-nav-location-text">
                <span style="display:block; font-size: 0.68rem; color: var(--bb-text-muted); text-transform: uppercase;">Deliver to</span>
                <span>${loc.name}</span>
              </div>
              <span style="color: var(--bb-text-muted); display: flex; align-items: center;">${ICONS.chevronDown}</span>
            </button>
          </div>

          <!-- Search Bar -->
          <div class="bb-nav-search-bar">
            <span class="bb-nav-search-icon">${ICONS.search}</span>
            <input 
              type="text" 
              class="bb-nav-search-input" 
              id="navSearchInput" 
              placeholder="Search burgers, wraps, meals, snacks..." 
              value="${state.searchQuery}"
            />
          </div>

          <!-- Right Action Center -->
          <div class="bb-nav-actions">
            <!-- Theme Toggle Button (Light / Dark) -->
            <button class="bb-theme-toggle-btn" id="navThemeToggleBtn" title="Toggle Light / Dark Mode">
              ${isDark ? ICONS.sun : ICONS.moon}
            </button>

            ${hasActiveOrder ? `
              <button class="bb-btn bb-btn-yellow bb-btn-sm slide-up" id="navActiveOrderBtn" style="animation: pulseGlow 2s infinite;">
                <span style="display:flex;">${ICONS.scooter}</span> Order (${state.activeOrder.etaMinutes}m)
              </button>
            ` : ''}

            <!-- Meal Plans (Subscriptions) -->
            <button class="bb-btn bb-btn-secondary bb-btn-sm" id="navPlansBtn" title="Weekly & Monthly Meal Plans">
              <span style="display: flex;">${ICONS.calendar}</span>
              <span>${state.subscription ? state.subscription.name : 'Meal Plans'}</span>
            </button>

            <!-- Campus Wallet / Balance in UGX -->
            <div class="bb-nav-wallet-badge" id="navWalletBtn" title="Campus Cash Balance">
              <span style="display: flex;">${ICONS.wallet}</span>
              <span>UGX ${user.campusCashBalance.toLocaleString('en-US')}</span>
            </div>

            <!-- Cart Trigger Button -->
            <button class="bb-nav-cart-btn" id="navCartBtn">
              <span style="display: flex;">${ICONS.cart}</span>
              <span>Cart</span>
              ${summary.itemCount > 0 ? `<div class="bb-cart-count-bubble">${summary.itemCount}</div>` : ''}
            </button>

            <!-- User Avatar / Profile -->
            <div class="bb-nav-avatar-btn" id="navProfileBtn" title="Student Profile">
              <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:800;color:var(--bb-bg-base);background:linear-gradient(135deg,var(--bb-orange-primary),var(--bb-yellow-primary));border-radius:50%;">
                ${user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Logo Click -> Go Home
    const logoBtn = document.getElementById('navLogoBtn');
    if (logoBtn) {
      logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        state.setView('home');
      });
    }

    // Search Input
    const searchInput = document.getElementById('navSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.setSearchQuery(e.target.value);
      });
    }

    // Theme Toggle Click
    const themeBtn = document.getElementById('navThemeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        state.toggleTheme();
        showToast(`Switched to ${state.theme} mode`, 'info');
      });
    }

    // Location Change Click
    const locBtn = document.getElementById('navLocationBtn');
    if (locBtn) {
      locBtn.addEventListener('click', () => {
        openLocationPickerModal();
      });
    }

    // Cart Button Click
    const cartBtn = document.getElementById('navCartBtn');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        window.openCartDrawer();
      });
    }

    // Active Order Click
    const activeOrderBtn = document.getElementById('navActiveOrderBtn');
    if (activeOrderBtn) {
      activeOrderBtn.addEventListener('click', () => {
        state.setView('tracking');
      });
    }

    // Meal Plans Click
    document.getElementById('navPlansBtn')?.addEventListener('click', () => {
      state.setView('subscriptions');
    });

    // Wallet / Points Click
    const walletBtn = document.getElementById('navWalletBtn');
    if (walletBtn) {
      walletBtn.addEventListener('click', () => {
        window.openProfileModal();
      });
    }

    // Profile Click
    const profileBtn = document.getElementById('navProfileBtn');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        window.openProfileModal();
      });
    }
  }

  // Subscribe to state changes
  state.subscribe('cart_updated', render);
  state.subscribe('location_changed', render);
  state.subscribe('auth_changed', render);
  state.subscribe('order_status_updated', render);
  state.subscribe('profile_updated', render);
  state.subscribe('theme_changed', render);
  state.subscribe('subscription_changed', render);

  render();
}

function openLocationPickerModal() {
  const modal = document.createElement('div');
  modal.className = 'bb-modal-overlay active';
  modal.innerHTML = `
    <div class="bb-modal-container" style="max-width: 480px; padding: 1.75rem;">
      <button class="bb-modal-close" id="locModalClose">&times;</button>
      
      <h3 style="font-size: 1.35rem; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
        <span style="color: var(--bb-orange-primary); display: flex;">${ICONS.pin}</span>
        Select Campus Delivery Spot
      </h3>
      <p style="font-size: 0.85rem; color: var(--bb-text-secondary); margin-bottom: 1.25rem;">
        Choose your hall, hostel or campus study quadrant for free delivery.
      </p>

      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 380px; overflow-y: auto;">
        ${CAMPUS_LOCATIONS.map(loc => `
          <div class="bb-option-item ${state.selectedLocation.id === loc.id ? 'selected' : ''}" data-loc-id="${loc.id}">
            <div>
              <div style="font-weight: 700; font-size: 0.92rem;">${loc.name}</div>
              <div style="font-size: 0.75rem; color: var(--bb-text-muted);">${loc.zone} • Free Delivery</div>
            </div>
            <span style="color: var(--bb-yellow-primary); font-size: 1rem; display: flex;">
              ${state.selectedLocation.id === loc.id ? ICONS.check : ICONS.arrowRight}
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#locModalClose').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelectorAll('.bb-option-item').forEach(item => {
    item.addEventListener('click', () => {
      const locId = item.dataset.locId;
      state.setLocation(locId);
      showToast(`Location set to ${state.selectedLocation.name}`, 'success');
      modal.remove();
    });
  });
}
