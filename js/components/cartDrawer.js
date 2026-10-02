/**
 * BiteBox Slide-out Cart Drawer Component
 * Zero Emojis, Clean SVGs & Borderless Cards
 */

import { state } from '../state.js';
import { ICONS } from '../icons.js';
import { showToast } from './toast.js';
import { openCheckoutModal } from './checkoutModal.js';

export function initCartDrawer() {
  let drawerOverlay = document.getElementById('cartDrawerOverlay');
  if (!drawerOverlay) {
    drawerOverlay = document.createElement('div');
    drawerOverlay.id = 'cartDrawerOverlay';
    drawerOverlay.className = 'bb-cart-drawer-overlay';
    document.body.appendChild(drawerOverlay);
  }

  function render() {
    const summary = state.getCartSummary();
    const items = summary.items;

    drawerOverlay.innerHTML = `
      <div class="bb-cart-drawer">
        <!-- Cart Header -->
        <div class="bb-cart-header">
          <div class="bb-cart-header-title">
            <span style="display: flex;">${ICONS.cart}</span>
            <span>Your Cart</span>
            ${summary.itemCount > 0 ? `<span class="bb-badge bb-badge-yellow" style="font-size: 0.7rem;">${summary.itemCount} items</span>` : ''}
          </div>
          <button class="bb-modal-close" style="position: static;" id="closeCartBtn">&times;</button>
        </div>

        <!-- Cart Body -->
        <div class="bb-cart-body">
          ${items.length === 0 ? `
            <div style="text-align: center; padding: 4rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
              <div style="color: var(--bb-text-muted); opacity: 0.5;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              </div>
              <h3 style="font-size: 1.2rem;">Your cart is empty</h3>
              <p style="font-size: 0.85rem; color: var(--bb-text-muted); max-width: 240px;">
                Browse meals and snacks from campus spots!
              </p>
              <button class="bb-btn bb-btn-primary bb-btn-sm" id="cartExploreBtn">Browse Menus</button>
            </div>
          ` : `
            <!-- Restaurant Info -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.4rem;">
              <div style="font-weight: 700; font-size: 0.88rem; color: var(--bb-text-secondary);">
                ${items[0]?.restaurantName || 'Campus Spot'}
              </div>
              <button class="bb-btn bb-btn-ghost bb-btn-sm" id="cartClearBtn" style="font-size: 0.75rem; color: var(--bb-status-error);">
                Clear All
              </button>
            </div>

            <!-- Items List -->
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${items.map(item => {
                const optionsSummary = [
                  item.selectedSize,
                  ...(item.selectedAddons?.map(a => a.name) || []),
                  item.spiceLevel,
                  item.specialInstructions ? `"${item.specialInstructions}"` : null
                ].filter(Boolean).join(', ');

                return `
                  <div class="bb-cart-item" data-hash="${item.hash}">
                    <div class="bb-cart-item-thumb">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>

                    <div class="bb-cart-item-details">
                      <div class="bb-cart-item-name">${item.name}</div>
                      ${optionsSummary ? `<div class="bb-cart-item-options">${optionsSummary}</div>` : ''}

                      <div class="bb-cart-item-bottom">
                        <div class="bb-cart-item-price">UGX ${(item.unitPrice * item.quantity).toLocaleString('en-US')}</div>
                        
                        <div class="bb-stepper">
                          <button class="bb-stepper-btn cart-qty-minus" data-hash="${item.hash}">-</button>
                          <div class="bb-stepper-value" style="font-size: 0.82rem; padding: 0 0.5rem;">${item.quantity}</div>
                          <button class="bb-stepper-btn cart-qty-plus" data-hash="${item.hash}">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Promo Code Box -->
            <div class="bb-cart-promo-section">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                <span style="font-size: 0.82rem; font-weight: 700; color: var(--bb-text-primary); display: flex; align-items: center; gap: 0.35rem;">
                  <span style="display:flex;">${ICONS.tag}</span>
                  Promo Code
                </span>
              </div>

              ${summary.activePromo ? `
                <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bb-yellow-subtle); padding: 0.5rem 0.8rem; border-radius: var(--bb-radius-sm);">
                  <div style="display: flex; align-items: center; gap: 0.4rem;">
                    <span style="display:flex;">${ICONS.check}</span>
                    <strong style="font-size: 0.82rem; color: var(--bb-yellow-primary);">${summary.activePromo.code}</strong>
                  </div>
                  <button id="cartRemovePromoBtn" style="font-size: 0.75rem; font-weight: 700; color: var(--bb-text-muted); cursor: pointer;">Remove</button>
                </div>
              ` : `
                <div class="bb-promo-input-row">
                  <input type="text" class="bb-input" id="cartPromoInput" placeholder="Enter code (e.g. BITEBOX50)" style="text-transform: uppercase; font-size: 0.85rem; padding: 0.5rem 0.8rem;" />
                  <button class="bb-btn bb-btn-yellow bb-btn-sm" id="cartApplyPromoBtn">Apply</button>
                </div>
                <div style="display: flex; gap: 0.4rem; margin-top: 0.6rem; flex-wrap: wrap;">
                  <button class="bb-chip promo-quick-chip" data-code="BITEBOX50" style="font-size: 0.7rem; padding: 0.2rem 0.6rem;">BITEBOX50</button>
                  <button class="bb-chip promo-quick-chip" data-code="CAMPUSFREE" style="font-size: 0.7rem; padding: 0.2rem 0.6rem;">CAMPUSFREE</button>
                  <button class="bb-chip promo-quick-chip" data-code="NIGHTOWL" style="font-size: 0.7rem; padding: 0.2rem 0.6rem;">NIGHTOWL</button>
                </div>
              `}
            </div>

            <!-- Summary Breakdown -->
            <div class="bb-cart-summary-section">
              <div class="bb-summary-row">
                <span>Items Subtotal</span>
                <span>UGX ${summary.subtotal.toLocaleString('en-US')}</span>
              </div>

              ${summary.discount > 0 ? `
                <div class="bb-summary-row" style="color: var(--bb-yellow-primary); font-weight: 700;">
                  <span>Student Discount</span>
                  <span>-UGX ${summary.discount.toLocaleString('en-US')}</span>
                </div>
              ` : ''}

              <div class="bb-summary-row">
                <span>Campus Delivery (${state.selectedLocation.name})</span>
                <span style="color: var(--bb-status-success); font-weight: 700;">FREE</span>
              </div>

              <div class="bb-summary-row">
                <span>Service Fee</span>
                <span>UGX ${summary.serviceFee.toLocaleString('en-US')}</span>
              </div>

              <div class="bb-summary-row total">
                <span>Total</span>
                <span style="color: var(--bb-text-yellow); font-size: 1.25rem;">UGX ${summary.total.toLocaleString('en-US')}</span>
              </div>
            </div>
          `}
        </div>

        <!-- Cart Footer -->
        ${items.length > 0 ? `
          <div class="bb-cart-footer">
            <button class="bb-btn bb-btn-primary bb-btn-block bb-btn-lg" id="cartCheckoutBtn">
              <span>Proceed to Checkout</span>
              <span>•</span>
              <span>UGX ${summary.total.toLocaleString('en-US')}</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;

    attachDrawerEvents();
  }

  function attachDrawerEvents() {
    const closeBtn = drawerOverlay.querySelector('#closeCartBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => window.closeCartDrawer());
    }

    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) window.closeCartDrawer();
    });

    const exploreBtn = drawerOverlay.querySelector('#cartExploreBtn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        window.closeCartDrawer();
        state.setView('home');
      });
    }

    const clearBtn = drawerOverlay.querySelector('#cartClearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear all items from your cart?')) {
          state.clearCart();
          showToast('Cart cleared', 'info');
        }
      });
    }

    drawerOverlay.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const hash = btn.dataset.hash;
        state.updateCartQuantity(hash, -1);
      });
    });

    drawerOverlay.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const hash = btn.dataset.hash;
        state.updateCartQuantity(hash, 1);
      });
    });

    const applyPromoBtn = drawerOverlay.querySelector('#cartApplyPromoBtn');
    const promoInput = drawerOverlay.querySelector('#cartPromoInput');
    if (applyPromoBtn && promoInput) {
      applyPromoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim();
        if (!code) return;
        const res = state.applyPromoCode(code);
        if (res.success) {
          showToast(res.message, 'success');
        } else {
          showToast(res.message, 'error');
        }
      });
    }

    drawerOverlay.querySelectorAll('.promo-quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const code = chip.dataset.code;
        const res = state.applyPromoCode(code);
        if (res.success) {
          showToast(res.message, 'success');
        } else {
          showToast(res.message, 'error');
        }
      });
    });

    const removePromoBtn = drawerOverlay.querySelector('#cartRemovePromoBtn');
    if (removePromoBtn) {
      removePromoBtn.addEventListener('click', () => {
        state.removePromoCode();
        showToast('Promo code removed', 'info');
      });
    }

    const checkoutBtn = drawerOverlay.querySelector('#cartCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        window.closeCartDrawer();
        openCheckoutModal();
      });
    }
  }

  window.openCartDrawer = () => {
    render();
    drawerOverlay.classList.add('active');
  };

  window.closeCartDrawer = () => {
    drawerOverlay.classList.remove('active');
  };

  state.subscribe('cart_updated', () => {
    if (drawerOverlay.classList.contains('active')) {
      render();
    }
  });

  render();
}
