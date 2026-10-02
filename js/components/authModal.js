/**
 * BiteBox Student Profile & Authentication Modal
 * Zero Emojis, Clean SVGs & Borderless Cards
 */

import { state } from '../state.js';
import { CAMPUS_LOCATIONS } from '../data.js';
import { ICONS } from '../icons.js';
import { showToast } from './toast.js';

export function openAuthModal(initialTab = 'signin') {
  let activeTab = initialTab;

  const modal = document.createElement('div');
  modal.className = 'bb-modal-overlay active';

  function render() {
    const isDark = state.theme === 'dark';

    modal.innerHTML = `
      <div class="bb-modal-container" style="max-width: 480px; padding: 1.75rem;">
        <button class="bb-modal-close" id="authModalClose">&times;</button>

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <img 
            src="${isDark ? 'assets/logo-dark.png' : 'assets/logo-light.png'}" 
            alt="BiteBox" 
            style="height: 62px; margin: 0 auto 0.75rem auto; object-fit: contain; display: block;" 
          />
          <h2 style="font-size: 1.45rem; font-weight: 800;">Student Portal</h2>
          <p style="font-size: 0.85rem; color: var(--bb-text-secondary); margin-top: 0.25rem;">
            Food Delivery for Campus Students
          </p>
        </div>

        <!-- Auth Tabs -->
        <div style="display: flex; background: var(--bb-bg-surface); padding: 0.3rem; border-radius: var(--bb-radius-full); margin-bottom: 1.5rem;">
          <button class="bb-btn bb-btn-sm ${activeTab === 'signin' ? 'bb-btn-yellow' : 'bb-btn-ghost'}" style="flex: 1;" id="tabSignInBtn">
            Sign In
          </button>
          <button class="bb-btn bb-btn-sm ${activeTab === 'signup' ? 'bb-btn-yellow' : 'bb-btn-ghost'}" style="flex: 1;" id="tabSignUpBtn">
            Student Sign Up
          </button>
        </div>

        ${activeTab === 'signin' ? `
          <form id="signInForm" class="fade-in">
            <div class="bb-input-group">
              <label class="bb-label">Campus Email or Student ID</label>
              <input type="text" class="bb-input" id="authEmailInput" placeholder="alex.j@campus.edu" required value="alex.j@campus.edu" />
            </div>

            <div class="bb-input-group">
              <label class="bb-label">Password</label>
              <input type="password" class="bb-input" id="authPasswordInput" placeholder="••••••••" required value="campus123" />
            </div>

            <button type="submit" class="bb-btn bb-btn-primary bb-btn-block bb-btn-lg" style="margin-top: 0.5rem;">
              <span>Sign In to BiteBox</span>
              <span style="display:flex;">${ICONS.arrowRight}</span>
            </button>
          </form>
        ` : `
          <form id="signUpForm" class="fade-in">
            <div class="bb-input-group">
              <label class="bb-label">Full Name</label>
              <input type="text" class="bb-input" id="regNameInput" placeholder="e.g. Sarah K." required />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="bb-input-group">
                <label class="bb-label">Campus Email (.edu)</label>
                <input type="email" class="bb-input" id="regEmailInput" placeholder="student@campus.ac" required />
              </div>
              <div class="bb-input-group">
                <label class="bb-label">Student ID No.</label>
                <input type="text" class="bb-input" id="regIdInput" placeholder="STU-2026-..." required />
              </div>
            </div>

            <div class="bb-input-group">
              <label class="bb-label">Primary Hostel / Hall</label>
              <select class="bb-select" id="regHostelSelect">
                ${CAMPUS_LOCATIONS.map(l => `
                  <option value="${l.id}">${l.name}</option>
                `).join('')}
              </select>
            </div>

            <button type="submit" class="bb-btn bb-btn-primary bb-btn-block bb-btn-lg" style="margin-top: 0.5rem;">
              <span>Create Student Account</span>
              <span style="display:flex;">${ICONS.arrowRight}</span>
            </button>
          </form>
        `}

        <div style="margin-top: 1.25rem; text-align: center; font-size: 0.74rem; color: var(--bb-text-muted);">
          Campus Single Sign-On enabled with verified student email
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    modal.querySelector('#authModalClose').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    modal.querySelector('#tabSignInBtn')?.addEventListener('click', () => {
      activeTab = 'signin';
      render();
    });

    modal.querySelector('#tabSignUpBtn')?.addEventListener('click', () => {
      activeTab = 'signup';
      render();
    });

    const signInForm = modal.querySelector('#signInForm');
    if (signInForm) {
      signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = modal.querySelector('#authEmailInput').value;
        state.login({ email });
        showToast(`Welcome back, ${state.user.name}`, 'success');
        modal.remove();
      });
    }

    const signUpForm = modal.querySelector('#signUpForm');
    if (signUpForm) {
      signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = modal.querySelector('#regNameInput').value;
        const email = modal.querySelector('#regEmailInput').value;
        const studentId = modal.querySelector('#regIdInput').value;
        const hostel = modal.querySelector('#regHostelSelect').value;

        state.login({
          name,
          email,
          studentId,
          hostel,
          campusCashBalance: 25000,
          campusPoints: 100
        });

        showToast(`Account created! UGX 10,000 welcome bonus added`, 'success');
        modal.remove();
      });
    }
  }

  document.body.appendChild(modal);
  render();
}

export function openProfileModal() {
  const user = state.user;
  const history = state.orderHistory;

  const modal = document.createElement('div');
  modal.className = 'bb-modal-overlay active';

  function render() {
    const isDark = state.theme === 'dark';

    modal.innerHTML = `
      <div class="bb-modal-container" style="max-width: 520px; padding: 1.75rem;">
        <button class="bb-modal-close" id="profileModalClose">&times;</button>

        <!-- User Header Profile -->
        <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.5rem; padding-bottom: 1.25rem;">
          <div class="bb-nav-avatar-btn" style="width: 60px; height: 60px; flex-shrink: 0;">
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:800;color:var(--bb-bg-base);background:linear-gradient(135deg,var(--bb-orange-primary),var(--bb-yellow-primary));border-radius:50%;">
              ${user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <h2 style="font-size: 1.3rem; font-weight: 800;">${user.name}</h2>
            <div style="font-size: 0.85rem; color: var(--bb-text-secondary);">${user.email} • ID: ${user.studentId}</div>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.35rem;">
              <span class="bb-badge bb-badge-glow">Verified Student</span>
            </div>
          </div>
        </div>

        <!-- Campus Wallet & Loyalty Points -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem;">
          <div style="background: var(--bb-bg-surface); border-radius: var(--bb-radius-md); padding: 1rem; box-shadow: var(--bb-shadow-sm);">
            <div style="font-size: 0.72rem; color: var(--bb-text-muted); font-weight: 700; text-transform: uppercase;">Campus Cash Balance</div>
            <div style="font-size: 1.55rem; font-weight: 900; color: var(--bb-yellow-primary); margin: 0.2rem 0;">
              UGX ${user.campusCashBalance.toLocaleString('en-US')}
            </div>
            <button class="bb-btn bb-btn-yellow bb-btn-sm" id="topupWalletBtn" style="width: 100%; font-size: 0.75rem; padding: 0.35rem;">+ Top Up (UGX 10,000)</button>
          </div>

          <div style="background: var(--bb-bg-surface); border-radius: var(--bb-radius-md); padding: 1rem; box-shadow: var(--bb-shadow-sm);">
            <div style="font-size: 0.72rem; color: var(--bb-text-muted); font-weight: 700; text-transform: uppercase;">BiteBox Points</div>
            <div style="font-size: 1.55rem; font-weight: 900; color: var(--bb-orange-primary); margin: 0.2rem 0;">
              ${user.campusPoints} pts
            </div>
            <span style="font-size: 0.74rem; color: var(--bb-text-secondary);">Redeem for Free Meals</span>
          </div>
        </div>

        <!-- Saved Delivery Spot -->
        <div class="bb-input-group" style="margin-bottom: 1.5rem;">
          <label class="bb-label">Default Delivery Location</label>
          <div style="background: var(--bb-bg-input); padding: 0.8rem 1rem; border-radius: var(--bb-radius-md); font-size: 0.88rem;">
            <div style="font-weight: 700; display: flex; align-items: center; gap: 0.35rem;">
              <span style="display:flex; color: var(--bb-orange-primary);">${ICONS.pin}</span>
              ${state.selectedLocation.name}
            </div>
            <div style="color: var(--bb-text-muted); font-size: 0.78rem; margin-top: 0.2rem;">${user.roomNumber} • ${user.dropoffNote}</div>
          </div>
        </div>

        <!-- Meal Plan -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; font-size: 0.88rem;">
          <span>Meal Plan:</span>
          <button class="bb-btn bb-btn-ghost bb-btn-sm" id="profilePlansBtn" style="padding: 0.25rem 0.5rem;">
            <strong>${state.subscription ? `${state.subscription.name} (UGX ${state.subscription.price.toLocaleString('en-US')})` : 'View Weekly & Monthly Plans'}</strong>
          </button>
        </div>

        <!-- Past Order Count -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-size: 0.88rem;">
          <span>Orders Completed:</span>
          <strong>${history.length} orders</strong>
        </div>

        <!-- Footer Actions -->
        <div style="display: flex; gap: 0.75rem;">
          <button class="bb-btn bb-btn-secondary" id="themeToggleBtn" style="flex: 1;">
            <span style="display:flex;">${isDark ? ICONS.sun : ICONS.moon}</span>
            <span>${isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button class="bb-btn bb-btn-ghost" id="logoutBtn" style="color: var(--bb-status-error); flex: 1;">
            Sign Out
          </button>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    modal.querySelector('#profileModalClose').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    modal.querySelector('#topupWalletBtn')?.addEventListener('click', () => {
      user.campusCashBalance += 10000;
      state.updateProfile({ campusCashBalance: user.campusCashBalance });
      showToast('Added UGX 10,000 to Campus Cash Wallet', 'success');
      render();
    });

    modal.querySelector('#profilePlansBtn')?.addEventListener('click', () => {
      modal.remove();
      state.setView('subscriptions');
    });

    modal.querySelector('#themeToggleBtn')?.addEventListener('click', () => {
      state.toggleTheme();
      showToast(`Switched to ${state.theme} mode`, 'info');
      render();
    });

    modal.querySelector('#logoutBtn')?.addEventListener('click', () => {
      state.logout();
      showToast('Signed out of BiteBox', 'info');
      modal.remove();
    });
  }

  document.body.appendChild(modal);
  render();
}

window.openAuthModal = openAuthModal;
window.openProfileModal = openProfileModal;
