/**
 * BiteBox Landing Page (Dedicated Sign In & Sign Up Experience)
 */

import { state } from '../state.js';
import { CAMPUS_LOCATIONS } from '../data.js';
import { ICONS } from '../icons.js';
import { showToast } from './toast.js';

export function renderLandingPage(containerId = 'mainAppContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  let activeTab = 'signin'; // 'signin' | 'signup'
  const isDark = state.theme === 'dark';

  function render() {
    container.innerHTML = `
      <div class="bb-landing-wrapper fade-in">
        
        <!-- Top Landing Nav -->
        <header class="bb-landing-nav">
          <div class="bb-logo">
            <img 
              src="${state.theme === 'dark' ? 'assets/logo-dark.png' : 'assets/logo-light.png'}" 
              alt="BiteBox Logo" 
              class="bb-brand-logo" 
              style="height: 52px;"
            />
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="bb-theme-toggle-btn" id="landingThemeBtn" title="Toggle Light / Dark Mode">
              ${state.theme === 'dark' ? ICONS.sun : ICONS.moon}
            </button>
            <button class="bb-btn bb-btn-secondary bb-btn-sm" id="landingGuestBtn">
              Explore as Guest ➔
            </button>
          </div>
        </header>

        <!-- Main Split Screen Landing Hero -->
        <div class="bb-landing-grid">
          
          <!-- Left Column: High-converting Sign In / Sign Up Card -->
          <div class="bb-landing-auth-card">
            
            <div style="margin-bottom: 1.5rem;">
              <span class="bb-badge bb-badge-glow" style="margin-bottom: 0.5rem;">Campus Student Portal</span>
              <h1 style="font-size: 1.85rem; font-weight: 900; line-height: 1.2; margin-top: 0.35rem;">
                Food Delivery for <span>Campus Students</span>
              </h1>
              <p style="color: var(--bb-text-secondary); font-size: 0.9rem; margin-top: 0.4rem;">
                Hot matooke, rolex, posho & muchomo delivered to your hostel room with UGX 0 delivery fee.
              </p>
            </div>

            <!-- Auth Mode Switcher Tabs -->
            <div class="bb-landing-tabs">
              <button class="bb-landing-tab ${activeTab === 'signin' ? 'active' : ''}" id="landTabSignIn">
                Sign In
              </button>
              <button class="bb-landing-tab ${activeTab === 'signup' ? 'active' : ''}" id="landTabSignUp">
                Create Student Account
              </button>
            </div>

            ${activeTab === 'signin' ? `
              <!-- Sign In Form -->
              <form id="landingSignInForm" class="fade-in">
                <div class="bb-input-group">
                  <label class="bb-label">Campus Email or Student ID</label>
                  <input 
                    type="text" 
                    class="bb-input" 
                    id="landSignInEmail" 
                    placeholder="alex.j@campus.edu or STU-2024-9981" 
                    required 
                    value="alex.j@campus.edu" 
                  />
                </div>

                <div class="bb-input-group">
                  <label class="bb-label">Password</label>
                  <input 
                    type="password" 
                    class="bb-input" 
                    id="landSignInPass" 
                    placeholder="••••••••" 
                    required 
                    value="campus123" 
                  />
                </div>

                <button type="submit" class="bb-btn bb-btn-primary bb-btn-block bb-btn-lg" style="margin-top: 0.5rem;">
                  <span>Sign In & Order Food</span>
                  <span style="display:flex;">${ICONS.arrowRight}</span>
                </button>
              </form>

              <!-- Quick 1-Click Demo Login -->
              <div style="margin-top: 1rem; text-align: center;">
                <button class="bb-btn bb-btn-yellow bb-btn-block bb-btn-sm" id="landDemoLoginBtn">
                  ⚡ 1-Click Quick Student Login (Alex)
                </button>
              </div>
            ` : `
              <!-- Sign Up Form -->
              <form id="landingSignUpForm" class="fade-in">
                <div class="bb-input-group">
                  <label class="bb-label">Full Name</label>
                  <input type="text" class="bb-input" id="landRegName" placeholder="e.g. Sarah Namukasa" required />
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                  <div class="bb-input-group">
                    <label class="bb-label">Student Email</label>
                    <input type="email" class="bb-input" id="landRegEmail" placeholder="student@campus.ac" required />
                  </div>
                  <div class="bb-input-group">
                    <label class="bb-label">Student ID No.</label>
                    <input type="text" class="bb-input" id="landRegId" placeholder="STU-2026-..." required />
                  </div>
                </div>

                <div class="bb-input-group">
                  <label class="bb-label">Your Campus Hostel / Hall</label>
                  <select class="bb-select" id="landRegHostel">
                    ${CAMPUS_LOCATIONS.map(l => `
                      <option value="${l.id}">${l.name} (${l.zone})</option>
                    `).join('')}
                  </select>
                </div>

                <div class="bb-input-group">
                  <label class="bb-label">Create Password</label>
                  <input type="password" class="bb-input" id="landRegPass" placeholder="••••••••" required />
                </div>

                <button type="submit" class="bb-btn bb-btn-primary bb-btn-block bb-btn-lg" style="margin-top: 0.5rem;">
                  <span>Create Account (+UGX 10,000 Bonus)</span>
                  <span style="display:flex;">${ICONS.arrowRight}</span>
                </button>
              </form>
            `}

            <div style="margin-top: 1.25rem; padding-top: 1rem; text-align: center; font-size: 0.78rem; color: var(--bb-text-muted);">
              Instant Single Sign-On for campus students with verified university email
            </div>

          </div>

          <!-- Right Column: Visual Student Perks Showcase -->
          <div class="bb-landing-showcase">
            
            <div class="bb-showcase-visual-box">
              <img 
                src="assets/branding-mockup.jpg" 
                alt="BiteBox Campus Delivery Showcase" 
                class="bb-showcase-img"
              />
            </div>

            <!-- Campus Perks Highlights -->
            <div class="bb-showcase-perks-grid">
              <div class="bb-perk-card">
                <div class="bb-perk-icon" style="color: var(--bb-orange-primary);">${ICONS.scooter}</div>
                <div>
                  <h4 style="font-size: 0.92rem; font-weight: 800;">Free Hostel Drop-off</h4>
                  <p style="font-size: 0.78rem; color: var(--bb-text-muted);">Mandela, Africa, Mitchell, Olympia & all halls</p>
                </div>
              </div>

              <div class="bb-perk-card">
                <div class="bb-perk-icon" style="color: var(--bb-yellow-primary);">${ICONS.tag}</div>
                <div>
                  <h4 style="font-size: 0.92rem; font-weight: 800;">Real Student Prices</h4>
                  <p style="font-size: 0.78rem; color: var(--bb-text-muted);">Posho, Matooke, Rolex & Kikomando from UGX 2,500</p>
                </div>
              </div>

              <div class="bb-perk-card">
                <div class="bb-perk-icon" style="color: var(--bb-orange-primary);">${ICONS.mobile}</div>
                <div>
                  <h4 style="font-size: 0.92rem; font-weight: 800;">Mobile Money & Cash</h4>
                  <p style="font-size: 0.78rem; color: var(--bb-text-muted);">MTN MoMo, Airtel Money, Campus Wallet or COD</p>
                </div>
              </div>

              <div class="bb-perk-card">
                <div class="bb-perk-icon" style="color: var(--bb-yellow-primary);">${ICONS.users}</div>
                <div>
                  <h4 style="font-size: 0.92rem; font-weight: 800;">Split with Roommates</h4>
                  <p style="font-size: 0.78rem; color: var(--bb-text-muted);">Divide order total with your roommates in 1 tap</p>
                </div>
              </div>
            </div>

            <!-- Meal Plans Teaser -->
            <div class="bb-perk-card">
              <div class="bb-perk-icon" style="color: var(--bb-orange-primary);">${ICONS.calendar}</div>
              <div>
                <h4 style="font-size: 0.92rem; font-weight: 800;">Weekly & Monthly Meal Plans</h4>
                <p style="font-size: 0.78rem; color: var(--bb-text-muted);">Weekly from UGX 35,000 – 50,000 &middot; Monthly from UGX 150,000 – 300,000. Sign in to subscribe.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;

    attachLandingEvents();
  }

  function attachLandingEvents() {
    // Theme Switcher
    container.querySelector('#landingThemeBtn')?.addEventListener('click', () => {
      state.toggleTheme();
      render();
    });

    // Tab Switchers
    container.querySelector('#landTabSignIn')?.addEventListener('click', () => {
      activeTab = 'signin';
      render();
    });

    container.querySelector('#landTabSignUp')?.addEventListener('click', () => {
      activeTab = 'signup';
      render();
    });

    // Guest Preview Button
    container.querySelector('#landingGuestBtn')?.addEventListener('click', () => {
      state.login({ name: 'Campus Student Guest' });
      showToast('Welcome to BiteBox Campus Eats!', 'success');
      state.setView('home');
    });

    // 1-Click Demo Login
    container.querySelector('#landDemoLoginBtn')?.addEventListener('click', () => {
      state.login({
        name: 'Alex Johnson',
        email: 'alex.j@campus.edu',
        studentId: 'STU-2024-9981'
      });
      showToast('Logged in as Alex Johnson (Nelson Mandela Hall)!', 'success');
      state.setView('home');
    });

    // Sign In Submit
    const signInForm = container.querySelector('#landingSignInForm');
    if (signInForm) {
      signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = container.querySelector('#landSignInEmail').value;
        state.login({ email });
        showToast(`Welcome back, ${state.user.name}!`, 'success');
        state.setView('home');
      });
    }

    // Sign Up Submit
    const signUpForm = container.querySelector('#landingSignUpForm');
    if (signUpForm) {
      signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#landRegName').value;
        const email = container.querySelector('#landRegEmail').value;
        const studentId = container.querySelector('#landRegId').value;
        const hostel = container.querySelector('#landRegHostel').value;

        state.login({
          name,
          email,
          studentId,
          hostel,
          campusCashBalance: 25000,
          campusPoints: 100
        });

        showToast(`Account created! UGX 10,000 welcome cash credited`, 'success');
        state.setView('home');
      });
    }
  }

  render();
}
