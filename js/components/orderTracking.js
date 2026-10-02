/**
 * BiteBox Live Campus Order Tracking & Map Simulator
 * Clean Minimal Iconography, Zero Emojis & Borderless Surfaces
 */

import { state } from '../state.js';
import { ICONS } from '../icons.js';
import { showToast } from './toast.js';

export function renderOrderTracking(containerId = 'mainAppContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const order = state.activeOrder;
  if (!order) {
    container.innerHTML = `
      <div class="bb-container" style="text-align: center; padding: 4rem 1rem;">
        <div style="color: var(--bb-text-muted); opacity: 0.4; margin-bottom: 1rem;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18.5" cy="17.5" r="3.5"></circle><circle cx="5.5" cy="17.5" r="3.5"></circle><path d="M15 6h4l2 6.5-6 1.5"></path><path d="M15 17.5V6H9v11.5"></path></svg>
        </div>
        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No Active Deliveries</h2>
        <p style="color: var(--bb-text-secondary); max-width: 380px; margin: 0 auto 1.5rem auto;">
          You don't have any ongoing deliveries right now. Order meals to your hostel!
        </p>
        <button class="bb-btn bb-btn-primary" id="trackingGoHomeBtn">Explore Campus Menus</button>
      </div>
    `;
    document.getElementById('trackingGoHomeBtn')?.addEventListener('click', () => {
      state.setView('home');
    });
    return;
  }

  const statusMap = {
    received: { label: 'Order Received', step: 1, desc: 'Kitchen received your ticket' },
    preparing: { label: 'Chef Cooking', step: 2, desc: 'Food is sizzling in the kitchen' },
    on_the_way: { label: 'Courier En Route', step: 3, desc: 'Jordan is cruising towards your hall' },
    arrived: { label: 'Arrived at Hall', step: 4, desc: 'Courier is waiting outside entrance' },
    completed: { label: 'Delivered', step: 5, desc: 'Delivered hot and fresh' }
  };

  const currentStep = statusMap[order.status]?.step || 1;

  container.innerHTML = `
    <div class="bb-container bb-tracking-view fade-in">
      
      <!-- Top Header Navigation -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
        <button class="bb-btn bb-btn-secondary bb-btn-sm" id="trackingBackHomeBtn">
          <span style="display: flex;">${ICONS.arrowLeft}</span> Back to Campus Eats
        </button>
        <span class="bb-badge bb-badge-glow">Order #${order.orderId}</span>
      </div>

      <!-- Main Tracking Card (Borderless) -->
      <div class="bb-tracking-card">
        
        <!-- Live Campus Map Canvas -->
        <div class="bb-tracking-map-container">
          <canvas id="campusMapCanvas"></canvas>

          <div class="bb-map-overlay-badge">
            <span style="display: flex; color: var(--bb-yellow-primary); animation: pulseGlow 1.5s infinite;">●</span>
            <span>Live Campus Courier Tracking</span>
          </div>

          <div class="bb-tracking-eta-box">
            <div class="bb-eta-num" id="liveEtaDisplay">${order.etaMinutes} min</div>
            <div class="bb-eta-label">Estimated ETA</div>
          </div>
        </div>

        <!-- 4-Step Status Bar -->
        <div class="bb-status-stepper">
          <div class="bb-status-step ${currentStep >= 1 ? (currentStep > 1 ? 'completed' : 'active') : ''}">
            <div class="bb-step-icon">
              <span style="display:flex;">${ICONS.tag}</span>
            </div>
            <div class="bb-step-label">Received</div>
          </div>

          <div class="bb-status-step ${currentStep >= 2 ? (currentStep > 2 ? 'completed' : 'active') : ''}">
            <div class="bb-step-icon">
              <span style="display:flex;">${ICONS.clock}</span>
            </div>
            <div class="bb-step-label">Cooking</div>
          </div>

          <div class="bb-status-step ${currentStep >= 3 ? (currentStep > 3 ? 'completed' : 'active') : ''}">
            <div class="bb-step-icon">
              <span style="display:flex;">${ICONS.scooter}</span>
            </div>
            <div class="bb-step-label">On the Way</div>
          </div>

          <div class="bb-status-step ${currentStep >= 4 ? (currentStep > 4 ? 'completed' : 'active') : ''}">
            <div class="bb-step-icon">
              <span style="display:flex;">${ICONS.pin}</span>
            </div>
            <div class="bb-step-label">Arrived</div>
          </div>
        </div>

        <!-- Courier Info Box -->
        <div class="bb-courier-row">
          <div class="bb-courier-profile">
            <div class="bb-courier-avatar">
              <img src="${order.courier.avatar}" alt="${order.courier.name}" />
            </div>
            <div>
              <div style="font-weight: 800; font-size: 1rem; display: flex; align-items: center; gap: 0.4rem;">
                <span>${order.courier.name}</span>
                <span style="color: var(--bb-yellow-primary); font-size: 0.82rem; display: flex; align-items: center; gap: 0.2rem;">
                  <span style="display:flex;">${ICONS.star}</span> ${order.courier.rating}
                </span>
              </div>
              <div style="font-size: 0.78rem; color: var(--bb-text-muted);">
                ${order.courier.vehicle} • Campus Courier
              </div>
            </div>
          </div>

          <div class="bb-courier-actions">
            <button class="bb-btn bb-btn-secondary bb-btn-sm" id="chatRiderBtn">
              <span style="display: flex;">${ICONS.message}</span> Chat
            </button>
            <button class="bb-btn bb-btn-yellow bb-btn-sm" id="callRiderBtn">
              <span style="display: flex;">${ICONS.phone}</span> Call
            </button>
          </div>
        </div>

      </div>

      <!-- Two-Column Details Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        
        <!-- Live Status Activity Feed (Borderless) -->
        <div style="background: var(--bb-bg-card); border-radius: var(--bb-radius-lg); padding: 1.5rem; box-shadow: var(--bb-shadow-sm);">
          <h3 style="font-size: 1.15rem; margin-bottom: 1.25rem; font-weight: 800;">
            Real-Time Campus Updates
          </h3>

          <div style="display: flex; flex-direction: column; gap: 1rem;" id="trackingHistoryLogs">
            ${order.statusHistory.map(log => `
              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--bb-yellow-primary); margin-top: 6px; flex-shrink: 0; box-shadow: 0 0 8px var(--bb-yellow-glow);"></div>
                <div>
                  <div style="font-weight: 700; font-size: 0.88rem; color: var(--bb-text-primary);">${log.message}</div>
                  <div style="font-size: 0.72rem; color: var(--bb-text-muted);">${log.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Receipt & Drop-off Summary (Borderless) -->
        <div style="background: var(--bb-bg-card); border-radius: var(--bb-radius-lg); padding: 1.5rem; box-shadow: var(--bb-shadow-sm);">
          <h3 style="font-size: 1.15rem; margin-bottom: 1.25rem; font-weight: 800;">
            Order Receipt (${order.restaurant.name})
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem;">
            <div style="font-size: 0.85rem; color: var(--bb-text-secondary);">
              <strong>Deliver to:</strong> ${order.delivery.location} (${order.delivery.roomNumber})
            </div>
            <div style="font-size: 0.82rem; color: var(--bb-text-muted);">
              <strong>Instructions:</strong> ${order.delivery.dropoffNote}
            </div>
            <div style="font-size: 0.82rem; color: var(--bb-text-muted);">
              <strong>Payment:</strong> ${order.payment.method} (UGX ${order.summary.total.toLocaleString('en-US')})
            </div>
          </div>

          <div style="padding-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${order.items.map(item => `
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span>${item.quantity}x ${item.name}</span>
                <span style="font-weight: 700; color: var(--bb-text-yellow);">UGX ${(item.unitPrice * item.quantity).toLocaleString('en-US')}</span>
              </div>
            `).join('')}

            <div style="display: flex; justify-content: space-between; font-size: 1rem; font-weight: 800; padding-top: 0.5rem; color: var(--bb-text-primary);">
              <span>Total Paid</span>
              <span style="color: var(--bb-text-yellow);">UGX ${order.summary.total.toLocaleString('en-US')}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  document.getElementById('trackingBackHomeBtn')?.addEventListener('click', () => {
    state.setView('home');
  });

  document.getElementById('chatRiderBtn')?.addEventListener('click', () => {
    openRiderChatModal(order);
  });

  document.getElementById('callRiderBtn')?.addEventListener('click', () => {
    showToast(`Calling Jordan K. (${order.courier.phone})...`, 'info');
  });

  initCampusMapCanvas(order);
}

/**
 * Animated Canvas Campus Map (Clean vector style, zero emojis)
 */
function initCampusMapCanvas(order) {
  const canvas = document.getElementById('campusMapCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio || 800;
  canvas.height = rect.height * window.devicePixelRatio || 320;
  ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

  const w = rect.width;
  const h = rect.height;

  const restaurantPos = { x: w * 0.15, y: h * 0.75, name: order.restaurant.name };
  const campusLibrary = { x: w * 0.45, y: h * 0.45, name: 'Main Campus Quad' };
  const destinationPos = { x: w * 0.85, y: h * 0.3, name: order.delivery.location };

  const path = [
    restaurantPos,
    { x: w * 0.28, y: h * 0.75 },
    { x: w * 0.38, y: h * 0.55 },
    campusLibrary,
    { x: w * 0.65, y: h * 0.45 },
    { x: w * 0.72, y: h * 0.3 },
    destinationPos
  ];

  let scooterProgress = order.courier?.progressPercent || 15;
  let pulseRadius = 0;

  function getPointOnPath(t) {
    const totalSegments = path.length - 1;
    const segmentFraction = 100 / totalSegments;
    const currentSegment = Math.min(Math.floor(t / segmentFraction), totalSegments - 1);
    const localT = (t - (currentSegment * segmentFraction)) / segmentFraction;

    const p0 = path[currentSegment];
    const p1 = path[currentSegment + 1];

    return {
      x: p0.x + (p1.x - p0.x) * localT,
      y: p0.y + (p1.y - p0.y) * localT
    };
  }

  function render() {
    ctx.clearRect(0, 0, w, h);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // 1. Campus Background
    ctx.fillStyle = isLight ? '#EAECEF' : '#0E1015';
    ctx.fillRect(0, 0, w, h);

    // 2. Campus Green Parks / Quads
    ctx.fillStyle = isLight ? 'rgba(16, 185, 129, 0.15)' : 'rgba(20, 50, 35, 0.5)';
    ctx.beginPath();
    ctx.roundRect(w * 0.25, h * 0.15, w * 0.3, h * 0.25, 12);
    ctx.fill();

    ctx.fillStyle = isLight ? 'rgba(255, 194, 0, 0.12)' : 'rgba(255, 194, 0, 0.05)';
    ctx.beginPath();
    ctx.roundRect(w * 0.6, h * 0.6, w * 0.25, h * 0.3, 12);
    ctx.fill();

    // 3. Draw Campus Roads
    ctx.strokeStyle = isLight ? '#D0D4DC' : '#1C202B';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    path.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // Route Track Highlight (Orange Line)
    ctx.strokeStyle = '#FF6B00';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 4. Restaurant Vector Pin
    ctx.fillStyle = '#FF6B00';
    ctx.beginPath();
    ctx.arc(restaurantPos.x, restaurantPos.y, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 11px Plus Jakarta Sans';
    ctx.fillStyle = isLight ? '#12141A' : '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(restaurantPos.name.substring(0, 16), restaurantPos.x, restaurantPos.y + 22);

    // 5. Destination Vector Pin
    ctx.fillStyle = '#FFC200';
    ctx.beginPath();
    ctx.arc(destinationPos.x, destinationPos.y, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '700 11px Plus Jakarta Sans';
    ctx.fillStyle = isLight ? '#12141A' : '#FFC200';
    ctx.fillText(destinationPos.name.substring(0, 18), destinationPos.x, destinationPos.y - 16);

    // 6. Moving Courier Marker (Yellow Glowing Vector Circle)
    const currentPos = getPointOnPath(scooterProgress);

    pulseRadius = (pulseRadius + 0.3) % 25;
    ctx.strokeStyle = `rgba(255, 194, 0, ${Math.max(0, 1 - pulseRadius / 25)})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(currentPos.x, currentPos.y, 10 + pulseRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#FFC200';
    ctx.beginPath();
    ctx.arc(currentPos.x, currentPos.y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#090A0E';
    ctx.stroke();

    ctx.font = 'bold 10px Plus Jakarta Sans';
    ctx.fillStyle = isLight ? '#12141A' : '#FFFFFF';
    ctx.fillText('Courier (Jordan)', currentPos.x, currentPos.y + 26);

    requestAnimationFrame(render);
  }

  render();

  state.subscribe('order_status_updated', (updatedOrder) => {
    if (updatedOrder) {
      scooterProgress = updatedOrder.courier.progressPercent;
      const etaEl = document.getElementById('liveEtaDisplay');
      if (etaEl) etaEl.textContent = `${updatedOrder.etaMinutes} min`;
    }
  });
}

/**
 * Simulated Live Courier Chat Modal
 */
function openRiderChatModal(order) {
  const modal = document.createElement('div');
  modal.className = 'bb-modal-overlay active';

  let messages = [
    { sender: 'rider', text: `Hi ${state.user.name}, I just picked up your order from ${order.restaurant.name}. Heading to ${order.delivery.location} now.` }
  ];

  function renderChat() {
    modal.innerHTML = `
      <div class="bb-modal-container bb-chat-modal" style="padding: 1.5rem;">
        <button class="bb-modal-close" id="chatCloseBtn">&times;</button>

        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; padding-bottom: 0.75rem;">
          <div class="bb-courier-avatar" style="width: 44px; height: 44px;">
            <img src="${order.courier.avatar}" alt="${order.courier.name}" />
          </div>
          <div>
            <div style="font-weight: 800; font-size: 1rem;">${order.courier.name}</div>
            <div style="font-size: 0.75rem; color: var(--bb-status-success);">● Online on Campus</div>
          </div>
        </div>

        <div class="bb-chat-messages" id="chatMsgsContainer">
          ${messages.map(m => `
            <div class="bb-chat-bubble ${m.sender}">
              ${m.text}
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <input type="text" class="bb-input" id="chatInputBox" placeholder="Type message to courier..." style="padding: 0.6rem 0.9rem; font-size: 0.88rem;" />
          <button class="bb-btn bb-btn-primary bb-btn-sm" id="chatSendBtn">Send</button>
        </div>

        <div style="display: flex; gap: 0.35rem; margin-top: 0.5rem; flex-wrap: wrap;">
          <button class="bb-chip chat-quick-msg" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">"I'm at the front steps"</button>
          <button class="bb-chip chat-quick-msg" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">"Leave with gate security"</button>
        </div>
      </div>
    `;

    modal.querySelector('#chatCloseBtn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    const sendMsg = (txt) => {
      if (!txt.trim()) return;
      messages.push({ sender: 'student', text: txt });
      renderChat();

      const box = modal.querySelector('#chatMsgsContainer');
      if (box) box.scrollTop = box.scrollHeight;

      setTimeout(() => {
        const replies = [
          "Got it. Pulling up to the gate now.",
          "Great, see you in 1 minute at the entrance.",
          "Understood, enjoy the meal."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        messages.push({ sender: 'rider', text: randomReply });
        renderChat();
        const b = modal.querySelector('#chatMsgsContainer');
        if (b) b.scrollTop = b.scrollHeight;
      }, 1300);
    };

    modal.querySelector('#chatSendBtn').addEventListener('click', () => {
      const inp = modal.querySelector('#chatInputBox');
      sendMsg(inp.value);
    });

    modal.querySelector('#chatInputBox').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMsg(e.target.value);
      }
    });

    modal.querySelectorAll('.chat-quick-msg').forEach(btn => {
      btn.addEventListener('click', () => {
        sendMsg(btn.textContent.replace(/"/g, ''));
      });
    });
  }

  document.body.appendChild(modal);
  renderChat();
}
