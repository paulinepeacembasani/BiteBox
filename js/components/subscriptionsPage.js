/**
 * BiteBox Meal Subscriptions Page (Weekly & Monthly Plans in UGX)
 */

import { state } from '../state.js';
import { SUBSCRIPTION_PLANS } from '../data.js';
import { ICONS } from '../icons.js';
import { showToast } from './toast.js';

export function renderSubscriptionsPage(containerId = 'mainAppContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  let activePeriod = state.subscription?.period || 'weekly'; // 'weekly' | 'monthly'

  function render() {
    const plans = SUBSCRIPTION_PLANS.filter(p => p.period === activePeriod);
    const current = state.subscription;
    const periodLabel = activePeriod === 'weekly' ? 'week' : 'month';

    container.innerHTML = `
      <section class="bb-subs-page fade-in">
        <button class="bb-btn bb-btn-ghost bb-btn-sm" id="subsBackBtn" style="margin-bottom: 1rem;">
          <span style="display: flex;">${ICONS.arrowLeft}</span> Back to Campus Eats
        </button>

        <div class="bb-subs-header">
          <span class="bb-badge bb-badge-glow">BiteBox Meal Plans</span>
          <h1 class="bb-subs-title">Never worry about <span>your next meal</span></h1>
          <p class="bb-subs-desc">
            Subscribe weekly or monthly and get hot campus meals delivered free to your hostel. Pay once, eat all ${periodLabel}.
          </p>

          <div class="bb-landing-tabs bb-subs-toggle">
            <button class="bb-landing-tab ${activePeriod === 'weekly' ? 'active' : ''}" data-period="weekly">Weekly</button>
            <button class="bb-landing-tab ${activePeriod === 'monthly' ? 'active' : ''}" data-period="monthly">Monthly</button>
          </div>
        </div>

        ${current ? `
          <div class="bb-subs-current">
            <div>
              <div class="bb-subs-current-label">Your current plan</div>
              <div class="bb-subs-current-name">${current.name} &middot; UGX ${current.price.toLocaleString('en-US')} / ${current.period === 'weekly' ? 'week' : 'month'}</div>
              <div class="bb-subs-current-sub">Renews on ${new Date(current.renewsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </div>
            <button class="bb-btn bb-btn-ghost bb-btn-sm" id="subsCancelBtn" style="color: var(--bb-status-error);">Cancel Plan</button>
          </div>
        ` : ''}

        <div class="bb-subs-grid">
          ${plans.map(plan => {
            const isCurrent = current && current.id === plan.id;
            return `
              <div class="bb-subs-card ${plan.popular ? 'popular' : ''}">
                ${plan.popular ? '<span class="bb-badge bb-badge-glow bb-subs-popular">Most Popular</span>' : ''}
                <h3 class="bb-subs-plan-name">${plan.name}</h3>
                <p class="bb-subs-plan-tagline">${plan.tagline}</p>
                <div class="bb-subs-price">
                  <span class="bb-subs-currency">UGX</span>
                  <span class="bb-subs-amount">${plan.price.toLocaleString('en-US')}</span>
                  <span class="bb-subs-per">/ ${periodLabel}</span>
                </div>
                <ul class="bb-subs-features">
                  ${plan.features.map(f => `
                    <li><span class="bb-subs-check">${ICONS.check}</span><span>${f}</span></li>
                  `).join('')}
                </ul>
                <button
                  class="bb-btn ${plan.popular ? 'bb-btn-primary' : 'bb-btn-secondary'} bb-btn-block"
                  data-plan-id="${plan.id}"
                  ${isCurrent ? 'disabled' : ''}
                >
                  ${isCurrent ? 'Current Plan' : (current ? 'Switch to this Plan' : 'Subscribe')}
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <p class="bb-subs-footnote">
          Pay with Campus Cash Wallet or Mobile Money. Cancel any time before your renewal date.
        </p>
      </section>
    `;

    attachEvents();
  }

  function attachEvents() {
    container.querySelector('#subsBackBtn')?.addEventListener('click', () => state.setView('home'));

    container.querySelectorAll('[data-period]').forEach(btn => {
      btn.addEventListener('click', () => {
        activePeriod = btn.dataset.period;
        render();
      });
    });

    container.querySelector('#subsCancelBtn')?.addEventListener('click', () => {
      if (!confirm('Cancel your BiteBox meal plan?')) return;
      state.cancelSubscription();
      showToast('Meal plan cancelled', 'info');
      render();
    });

    container.querySelectorAll('[data-plan-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === btn.dataset.planId);
        if (!plan) return;

        const price = `UGX ${plan.price.toLocaleString('en-US')}`;
        const balance = state.user.campusCashBalance;
        let paidWith = 'Campus Cash';

        if (balance >= plan.price) {
          if (!confirm(`Subscribe to ${plan.name} for ${price}? This will be paid from your Campus Cash Wallet.`)) return;
          state.updateProfile({ campusCashBalance: balance - plan.price });
        } else {
          if (!confirm(`Your Campus Cash (UGX ${balance.toLocaleString('en-US')}) is not enough. Pay ${price} with MTN MoMo / Airtel Money instead?`)) return;
          paidWith = 'Mobile Money';
        }

        state.startSubscription(plan);
        showToast(`Subscribed to ${plan.name} — ${price} paid via ${paidWith}`, 'success');
        render();
      });
    });
  }

  render();
}
