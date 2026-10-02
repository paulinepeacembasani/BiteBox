/**
 * BiteBox Menu Item Customization Modal
 * Clean, Borderless & Zero Emojis
 */

import { state } from '../state.js';
import { ICONS } from '../icons.js';
import { showToast } from './toast.js';

export function openMenuModal(item, restaurant) {
  let selectedSize = item.options?.sizes ? item.options.sizes[0] : null;
  let selectedAddons = [];
  let selectedSpice = item.options?.spiceLevels ? item.options.spiceLevels[0] : null;
  let quantity = 1;

  function calculatePrice() {
    const sizePrice = selectedSize ? selectedSize.priceAdd : 0;
    const addonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return (item.price + sizePrice + addonsPrice) * quantity;
  }

  const modal = document.createElement('div');
  modal.className = 'bb-modal-overlay active';

  function renderModalContent() {
    modal.innerHTML = `
      <div class="bb-modal-container" style="max-width: 520px;">
        <button class="bb-modal-close" id="menuModalClose">&times;</button>

        <div style="position: relative; width: 100%; height: 220px; overflow: hidden; border-top-left-radius: var(--bb-radius-lg); border-top-right-radius: var(--bb-radius-lg);">
          <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(14, 16, 22, 0.9) 100%);"></div>
          <div style="position: absolute; bottom: 12px; left: 16px; display: flex; gap: 0.5rem;">
            ${item.prepTime ? `<span class="bb-badge bb-badge-dark"><span style="display:flex;">${ICONS.clock}</span> ${item.prepTime}</span>` : ''}
            ${item.calories ? `<span class="bb-badge bb-badge-yellow">${item.calories}</span>` : ''}
          </div>
        </div>

        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.35rem;">${item.name}</h2>
            <p style="font-size: 0.85rem; color: var(--bb-text-secondary); line-height: 1.4;">${item.description}</p>
          </div>

          <!-- Size Options -->
          ${item.options?.sizes ? `
            <div>
              <div class="bb-label" style="margin-bottom: 0.5rem; font-weight: 700; color: var(--bb-text-primary);">
                Select Size <span style="color: var(--bb-yellow-primary); font-size: 0.72rem;">(Required)</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${item.options.sizes.map((size, idx) => `
                  <label class="bb-option-item ${selectedSize?.name === size.name ? 'selected' : ''}" style="margin-bottom: 0;">
                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                      <input type="radio" name="item_size" class="bb-option-radio" ${selectedSize?.name === size.name ? 'checked' : ''} data-size-idx="${idx}" />
                      <span style="font-size: 0.88rem; font-weight: 600;">${size.name}</span>
                    </div>
                    <span style="font-size: 0.85rem; font-weight: 700; color: var(--bb-text-yellow);">
                      ${size.priceAdd > 0 ? `+UGX ${size.priceAdd.toLocaleString('en-US')}` : (size.priceAdd < 0 ? `-UGX ${Math.abs(size.priceAdd).toLocaleString('en-US')}` : 'Standard')}
                    </span>
                  </label>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Add-ons -->
          ${item.options?.addons ? `
            <div>
              <div class="bb-label" style="margin-bottom: 0.5rem; font-weight: 700; color: var(--bb-text-primary);">
                Customize & Add-ons <span style="font-size: 0.72rem; color: var(--bb-text-muted);">(Optional)</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${item.options.addons.map((addon, idx) => {
                  const isChecked = selectedAddons.some(a => a.name === addon.name);
                  return `
                    <label class="bb-option-item ${isChecked ? 'selected' : ''}" style="margin-bottom: 0;">
                      <div style="display: flex; align-items: center; gap: 0.6rem;">
                        <input type="checkbox" class="bb-option-checkbox" ${isChecked ? 'checked' : ''} data-addon-idx="${idx}" />
                        <span style="font-size: 0.88rem; font-weight: 600;">${addon.name}</span>
                      </div>
                      <span style="font-size: 0.85rem; font-weight: 700; color: var(--bb-text-yellow);">
                        +UGX ${addon.price.toLocaleString('en-US')}
                      </span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Spice Level -->
          ${item.options?.spiceLevels ? `
            <div>
              <div class="bb-label" style="margin-bottom: 0.5rem; font-weight: 700; color: var(--bb-text-primary);">
                Preference / Spice Level
              </div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${item.options.spiceLevels.map((spice) => `
                  <button type="button" class="bb-chip ${selectedSpice === spice ? 'active' : ''}" data-spice="${spice}">
                    ${spice}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Special Instructions -->
          <div class="bb-input-group" style="margin-bottom: 0.4rem;">
            <label class="bb-label">Special instructions for kitchen</label>
            <input 
              type="text" 
              class="bb-input" 
              id="specialInstructionsInput" 
              placeholder="e.g. Extra napkins, no tomatoes" 
            />
          </div>

          <!-- Quantity Stepper & Add Button Footer -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-top: 0.85rem;">
            <div class="bb-stepper">
              <button class="bb-stepper-btn" id="modalQtyMinus">-</button>
              <div class="bb-stepper-value" id="modalQtyVal">${quantity}</div>
              <button class="bb-stepper-btn" id="modalQtyPlus">+</button>
            </div>

            <button class="bb-btn bb-btn-primary" id="modalAddToCartBtn" style="flex: 1;">
              <span>Add to Cart</span>
              <span>•</span>
              <span id="modalFinalPrice">UGX ${calculatePrice().toLocaleString('en-US')}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    attachModalEvents();
  }

  function attachModalEvents() {
    modal.querySelector('#menuModalClose').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    modal.querySelectorAll('input[name="item_size"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const idx = +e.target.dataset.sizeIdx;
        selectedSize = item.options.sizes[idx];
        renderModalContent();
      });
    });

    modal.querySelectorAll('.bb-option-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const idx = +e.target.dataset.addonIdx;
        const addon = item.options.addons[idx];
        if (e.target.checked) {
          if (!selectedAddons.some(a => a.name === addon.name)) {
            selectedAddons.push(addon);
          }
        } else {
          selectedAddons = selectedAddons.filter(a => a.name !== addon.name);
        }
        renderModalContent();
      });
    });

    modal.querySelectorAll('.bb-chip[data-spice]').forEach(chip => {
      chip.addEventListener('click', () => {
        selectedSpice = chip.dataset.spice;
        renderModalContent();
      });
    });

    modal.querySelector('#modalQtyMinus').addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        modal.querySelector('#modalQtyVal').textContent = quantity;
        modal.querySelector('#modalFinalPrice').textContent = `UGX ${calculatePrice().toLocaleString('en-US')}`;
      }
    });

    modal.querySelector('#modalQtyPlus').addEventListener('click', () => {
      quantity++;
      modal.querySelector('#modalQtyVal').textContent = quantity;
      modal.querySelector('#modalFinalPrice').textContent = `UGX ${calculatePrice().toLocaleString('en-US')}`;
    });

    modal.querySelector('#modalAddToCartBtn').addEventListener('click', () => {
      const instructions = modal.querySelector('#specialInstructionsInput')?.value || '';
      
      const success = state.addToCart(
        item,
        quantity,
        selectedSize,
        selectedAddons,
        selectedSpice,
        instructions,
        restaurant
      );

      if (success) {
        showToast(`Added ${quantity}x ${item.name} to Cart`, 'success');
        modal.remove();
      }
    });
  }

  document.body.appendChild(modal);
  renderModalContent();
}
