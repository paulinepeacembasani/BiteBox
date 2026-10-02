/**
 * BiteBox Toast Notifications
 * Zero emojis, clean SVGs
 */

import { ICONS } from '../icons.js';

export function showToast(message, type = 'info', duration = 3500) {
  let container = document.querySelector('.bb-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'bb-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `bb-toast ${type}`;
  
  let iconSvg = ICONS.check;
  if (type === 'error') {
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else if (type === 'info') {
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="color: var(--bb-yellow-primary); display: flex;">${iconSvg}</span>
      <span>${message}</span>
    </div>
    <span class="bb-toast-close">&times;</span>
  `;

  const closeBtn = toast.querySelector('.bb-toast-close');
  closeBtn.addEventListener('click', () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  });

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 250);
    }
  }, duration);
}
