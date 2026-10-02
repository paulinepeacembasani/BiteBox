/**
 * BiteBox Multi-Step Campus Checkout Modal
 * Clean, Zero Emojis & Borderless Cards
 */

import { state } from '../state.js';
import { CAMPUS_LOCATIONS } from '../data.js';
import { ICONS } from '../icons.js';
import { showToast } from './toast.js';

export function openCheckoutModal() {
  const summary = state.getCartSummary();
  if (summary.itemCount === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  let currentStep = 1;
  let deliveryData = {
    locationId: state.selectedLocation.id,
    roomNumber: state.user.roomNumber || 'Room B-204',
    dropoffNote: state.user.dropoffNote || 'Call when at hostel security gate',
    phone: state.user.phone || '+256 701 234 567',
    scheduleType: 'ASAP',
    paymentMethod: 'Campus Cash Wallet',
    splitRoommates: false,
    roommateCount: 2
  };

  const modal = document.createElement('div');
  modal.className = 'bb-modal-overlay active';

  function renderModal() {
    const loc = CAMPUS_LOCATIONS.find(l => l.id === deliveryData.locationId) || state.selectedLocation;

    modal.innerHTML = `
      <div class="bb-modal-container" style="max-width: 560px; padding: 1.75rem;">
        <button class="bb-modal-close" id="checkoutModalClose">&times;</button>

        <!-- Stepper Indicator -->
        <div class="bb-checkout-steps">
          <div class="bb-step-pill ${currentStep === 1 ? 'active' : ''}">
            <span>1</span>
            <span>Campus Drop-off</span>
          </div>
          <span style="color: var(--bb-text-muted); display: flex;">${ICONS.arrowRight}</span>
          <div class="bb-step-pill ${currentStep === 2 ? 'active' : ''}">
            <span>2</span>
            <span>Payment & Review</span>
          </div>
        </div>

        ${currentStep === 1 ? `
          <!-- STEP 1: Delivery Location & Schedule -->
          <div class="fade-in">
            <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--bb-orange-primary); display: flex;">${ICONS.pin}</span>
              Campus Drop-off Details
            </h2>
            <p style="font-size: 0.85rem; color: var(--bb-text-secondary); margin-bottom: 1.25rem;">
              Campus couriers deliver directly to your hostel gate or room door.
            </p>

            <div class="bb-input-group">
              <label class="bb-label">Hostel / Campus Quad</label>
              <select class="bb-select" id="chkLocationSelect">
                ${CAMPUS_LOCATIONS.map(l => `
                  <option value="${l.id}" ${l.id === deliveryData.locationId ? 'selected' : ''}>
                    ${l.name} (${l.zone}) - Free Delivery
                  </option>
                `).join('')}
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="bb-input-group">
                <label class="bb-label">Room / Floor Number</label>
                <input type="text" class="bb-input" id="chkRoomInput" value="${deliveryData.roomNumber}" placeholder="e.g. Room B-204" />
              </div>

              <div class="bb-input-group">
                <label class="bb-label">Contact Phone</label>
                <input type="tel" class="bb-input" id="chkPhoneInput" value="${deliveryData.phone}" />
              </div>
            </div>

            <div class="bb-input-group">
              <label class="bb-label">Drop-off Instructions</label>
              <input type="text" class="bb-input" id="chkNoteInput" value="${deliveryData.dropoffNote}" placeholder="e.g. Leave with security, or call on arrival" />
            </div>

            <div class="bb-input-group" style="margin-bottom: 1.5rem;">
              <label class="bb-label">Delivery Timing</label>
              <div style="display: flex; gap: 0.5rem;">
                <button type="button" class="bb-chip ${deliveryData.scheduleType === 'ASAP' ? 'active' : ''}" id="schedAsapBtn" style="flex: 1; justify-content: center; padding: 0.6rem;">
                  ASAP (~15-20 min)
                </button>
                <button type="button" class="bb-chip ${deliveryData.scheduleType === 'BREAK' ? 'active' : ''}" id="schedBreakBtn" style="flex: 1; justify-content: center; padding: 0.6rem;">
                  Next Study Break
                </button>
              </div>
            </div>

            <button class="bb-btn bb-btn-primary bb-btn-block bb-btn-lg" id="chkNextStepBtn">
              <span>Continue to Payment (UGX ${summary.total.toLocaleString('en-US')})</span>
              <span style="display: flex;">${ICONS.arrowRight}</span>
            </button>
          </div>
        ` : `
          <!-- STEP 2: Payment, Split & Confirm -->
          <div class="fade-in">
            <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--bb-yellow-primary); display: flex;">${ICONS.card}</span>
              Select Payment Method
            </h2>
            <p style="font-size: 0.85rem; color: var(--bb-text-secondary); margin-bottom: 1.25rem;">
              Choose how you want to settle your campus order.
            </p>

            <div class="bb-payment-methods-grid">
              <div class="bb-payment-card ${deliveryData.paymentMethod === 'Campus Cash Wallet' ? 'selected' : ''}" data-method="Campus Cash Wallet">
                <div class="bb-payment-icon">${ICONS.wallet}</div>
                <div class="bb-payment-title">Campus Cash</div>
                <div class="bb-payment-sub">Bal: UGX ${state.user.campusCashBalance.toLocaleString('en-US')}</div>
              </div>

              <div class="bb-payment-card ${deliveryData.paymentMethod === 'Mobile Money' ? 'selected' : ''}" data-method="Mobile Money">
                <div class="bb-payment-icon">${ICONS.mobile}</div>
                <div class="bb-payment-title">Mobile Money</div>
                <div class="bb-payment-sub">M-Pesa / MTN / Airtel</div>
              </div>

              <div class="bb-payment-card ${deliveryData.paymentMethod === 'Debit / Credit Card' ? 'selected' : ''}" data-method="Debit / Credit Card">
                <div class="bb-payment-icon">${ICONS.card}</div>
                <div class="bb-payment-title">Student Card</div>
                <div class="bb-payment-sub">Visa / MasterCard</div>
              </div>

              <div class="bb-payment-card ${deliveryData.paymentMethod === 'Cash on Delivery' ? 'selected' : ''}" data-method="Cash on Delivery">
                <div class="bb-payment-icon">${ICONS.cash}</div>
                <div class="bb-payment-title">Cash on Drop-off</div>
                <div class="bb-payment-sub">Pay rider at hostel</div>
              </div>
            </div>

            <!-- Roommate Split Feature -->
            <div style="background: var(--bb-bg-surface); border-radius: var(--bb-radius-md); padding: 1rem; margin-bottom: 1.25rem; box-shadow: var(--bb-shadow-sm);">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="color: var(--bb-yellow-primary); display: flex;">${ICONS.users}</span>
                  <div>
                    <div style="font-size: 0.88rem; font-weight: 700;">Split bill with roommates</div>
                    <div style="font-size: 0.75rem; color: var(--bb-text-muted);">Divide total evenly per person</div>
                  </div>
                </div>
                <input type="checkbox" id="chkSplitToggle" class="bb-option-checkbox" ${deliveryData.splitRoommates ? 'checked' : ''} />
              </div>

              ${deliveryData.splitRoommates ? `
                <div style="margin-top: 0.75rem; padding-top: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 0.82rem; color: var(--bb-text-secondary);">Roommates:</span>
                  <div style="display: flex; gap: 0.4rem;">
                    ${[2, 3, 4].map(n => `
                      <button type="button" class="bb-chip ${deliveryData.roommateCount === n ? 'active' : ''} split-count-chip" data-count="${n}">
                        ${n} people (UGX ${Math.round(summary.total / n).toLocaleString('en-US')} ea)
                      </button>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Order Final Total Card -->
            <div style="background: var(--bb-bg-input); padding: 0.9rem 1.1rem; border-radius: var(--bb-radius-md); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.78rem; color: var(--bb-text-muted);">Delivering to ${loc.name}</div>
                <div style="font-size: 0.88rem; font-weight: 700;">${summary.itemCount} items from ${summary.items[0]?.restaurantName}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 0.74rem; color: var(--bb-text-muted);">Total to Pay</div>
                <div style="font-size: 1.3rem; font-weight: 900; color: var(--bb-text-yellow);">UGX ${summary.total.toLocaleString('en-US')}</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 0.75rem;">
              <button class="bb-btn bb-btn-secondary" id="chkBackStepBtn" style="flex: 1;">
                Back
              </button>
              <button class="bb-btn bb-btn-primary bb-btn-lg" id="chkConfirmOrderBtn" style="flex: 2;">
                <span>Confirm & Place Order</span>
              </button>
            </div>
          </div>
        `}
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    modal.querySelector('#checkoutModalClose').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    if (currentStep === 1) {
      modal.querySelector('#chkLocationSelect').addEventListener('change', (e) => {
        deliveryData.locationId = e.target.value;
        state.setLocation(e.target.value);
      });

      modal.querySelector('#chkRoomInput').addEventListener('input', (e) => {
        deliveryData.roomNumber = e.target.value;
      });

      modal.querySelector('#chkPhoneInput').addEventListener('input', (e) => {
        deliveryData.phone = e.target.value;
      });

      modal.querySelector('#chkNoteInput').addEventListener('input', (e) => {
        deliveryData.dropoffNote = e.target.value;
      });

      modal.querySelector('#schedAsapBtn').addEventListener('click', () => {
        deliveryData.scheduleType = 'ASAP';
        renderModal();
      });

      modal.querySelector('#schedBreakBtn').addEventListener('click', () => {
        deliveryData.scheduleType = 'BREAK';
        renderModal();
      });

      modal.querySelector('#chkNextStepBtn').addEventListener('click', () => {
        if (!deliveryData.roomNumber.trim()) {
          showToast('Please enter your room or hostel wing number', 'error');
          return;
        }
        currentStep = 2;
        renderModal();
      });

    } else if (currentStep === 2) {
      modal.querySelectorAll('.bb-payment-card').forEach(card => {
        card.addEventListener('click', () => {
          deliveryData.paymentMethod = card.dataset.method;
          renderModal();
        });
      });

      modal.querySelector('#chkSplitToggle').addEventListener('change', (e) => {
        deliveryData.splitRoommates = e.target.checked;
        renderModal();
      });

      modal.querySelectorAll('.split-count-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          deliveryData.roommateCount = +chip.dataset.count;
          renderModal();
        });
      });

      modal.querySelector('#chkBackStepBtn').addEventListener('click', () => {
        currentStep = 1;
        renderModal();
      });

      modal.querySelector('#chkConfirmOrderBtn').addEventListener('click', () => {
        const confirmBtn = modal.querySelector('#chkConfirmOrderBtn');
        confirmBtn.innerHTML = `<span>Connecting to Campus Kitchen...</span>`;
        confirmBtn.disabled = true;

        setTimeout(() => {
          const order = state.placeOrder(deliveryData);
          if (order) {
            showToast('Order confirmed! Tracking your courier...', 'success');
            modal.remove();
          }
        }, 1100);
      });
    }
  }

  document.body.appendChild(modal);
  renderModal();
}
