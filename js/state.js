/**
 * BiteBox Application State Manager
 * UGX Currency Support & Landing Page Auth State
 */

import { CAMPUS_LOCATIONS, PROMOS, MOCK_STUDENT_USER, RESTAURANTS } from './data.js';

class StateStore {
  constructor() {
    this.listeners = new Map();
    
    // Load persisted state or set defaults
    this.user = this.load('bitebox_user', MOCK_STUDENT_USER);
    this.isLoggedIn = this.load('bitebox_logged_in', false); // Default to false so landing page is Sign In / Sign Up!
    this.selectedLocation = this.load('bitebox_location', CAMPUS_LOCATIONS[0]);
    this.cart = this.load('bitebox_cart', []);
    this.activePromo = this.load('bitebox_promo', null);
    this.activeOrder = this.load('bitebox_active_order', null);
    this.orderHistory = this.load('bitebox_order_history', []);
    this.theme = this.load('bitebox_theme', 'dark');
    this.subscription = this.load('bitebox_subscription', null);
    
    // UI temporary states
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.activeFilters = {
      underFive: false,
      fastDelivery: false,
      lateNightOnly: false,
      campusLegend: false
    };
    this.currentView = 'landing'; // App always opens on the Sign In page. 'landing' | 'home' | 'restaurant' | 'tracking' | 'subscriptions'
    this.activeRestaurantId = null;
    this.modalItem = null;

    if (this.activeOrder && this.activeOrder.status !== 'completed' && this.activeOrder.status !== 'cancelled') {
      this.resumeOrderSimulation();
    }
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Error loading state for ${key}`, e);
      return fallback;
    }
  }

  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error saving state for ${key}`, e);
    }
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data));
    }
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(cb => cb({ event, data }));
    }
  }

  setLocation(locationId) {
    const loc = CAMPUS_LOCATIONS.find(l => l.id === locationId) || CAMPUS_LOCATIONS[0];
    this.selectedLocation = loc;
    this.save('bitebox_location', loc);
    this.emit('location_changed', loc);
  }

  login(userData) {
    this.user = { ...MOCK_STUDENT_USER, ...userData };
    this.isLoggedIn = true;
    this.save('bitebox_user', this.user);
    this.save('bitebox_logged_in', true);
    this.emit('auth_changed', { user: this.user, isLoggedIn: true });
  }

  logout() {
    this.isLoggedIn = false;
    this.save('bitebox_logged_in', false);
    this.emit('auth_changed', { user: this.user, isLoggedIn: false });
  }

  startSubscription(plan) {
    const startedAt = new Date();
    const renewsAt = new Date(startedAt);
    renewsAt.setDate(renewsAt.getDate() + (plan.period === 'weekly' ? 7 : 30));
    this.subscription = { ...plan, startedAt: startedAt.toISOString(), renewsAt: renewsAt.toISOString() };
    this.save('bitebox_subscription', this.subscription);
    this.emit('subscription_changed', this.subscription);
  }

  cancelSubscription() {
    this.subscription = null;
    this.save('bitebox_subscription', null);
    this.emit('subscription_changed', null);
  }

  updateProfile(updates) {
    this.user = { ...this.user, ...updates };
    this.save('bitebox_user', this.user);
    this.emit('profile_updated', this.user);
  }

  setView(view, params = {}) {
    this.currentView = view;
    if (params.restaurantId) this.activeRestaurantId = params.restaurantId;
    this.emit('view_changed', { view, params });
  }

  setCategory(catId) {
    this.selectedCategory = catId;
    this.emit('filter_changed', { category: catId, query: this.searchQuery, filters: this.activeFilters });
  }

  setSearchQuery(query) {
    this.searchQuery = query;
    this.emit('filter_changed', { category: this.selectedCategory, query: this.searchQuery, filters: this.activeFilters });
  }

  toggleFilter(filterKey) {
    this.activeFilters[filterKey] = !this.activeFilters[filterKey];
    this.emit('filter_changed', { category: this.selectedCategory, query: this.searchQuery, filters: this.activeFilters });
  }

  addToCart(item, quantity = 1, selectedSize = null, selectedAddons = [], spiceLevel = null, specialInstructions = '', restaurant = null) {
    const sizePrice = selectedSize ? selectedSize.priceAdd : 0;
    const addonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = item.price + sizePrice + addonsPrice;

    const itemHash = `${item.id}_${selectedSize ? selectedSize.name : 'def'}_${selectedAddons.map(a => a.name).sort().join(',')}_${spiceLevel || ''}_${specialInstructions}`;
    
    if (this.cart.length > 0 && restaurant && this.cart[0].restaurantId !== restaurant.id) {
      if (!confirm(`Your cart has items from "${this.cart[0].restaurantName}". Start a new order with "${restaurant.name}"?`)) {
        return false;
      }
      this.cart = [];
    }

    const existingIndex = this.cart.findIndex(cartItem => cartItem.hash === itemHash);
    
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        hash: itemHash,
        itemId: item.id,
        name: item.name,
        image: item.image,
        basePrice: item.price,
        unitPrice: unitPrice,
        quantity: quantity,
        selectedSize: selectedSize ? selectedSize.name : null,
        selectedAddons: selectedAddons,
        spiceLevel: spiceLevel,
        specialInstructions: specialInstructions,
        restaurantId: restaurant ? restaurant.id : (this.activeRestaurantId || 'mama-kevina'),
        restaurantName: restaurant ? restaurant.name : 'Mama Kevina Campus Kitchen'
      });
    }

    this.save('bitebox_cart', this.cart);
    this.emit('cart_updated', this.getCartSummary());
    return true;
  }

  updateCartQuantity(hash, change) {
    const index = this.cart.findIndex(i => i.hash === hash);
    if (index > -1) {
      this.cart[index].quantity += change;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
      this.save('bitebox_cart', this.cart);
      this.emit('cart_updated', this.getCartSummary());
    }
  }

  removeFromCart(hash) {
    this.cart = this.cart.filter(i => i.hash !== hash);
    this.save('bitebox_cart', this.cart);
    this.emit('cart_updated', this.getCartSummary());
  }

  clearCart() {
    this.cart = [];
    this.activePromo = null;
    this.save('bitebox_cart', this.cart);
    this.save('bitebox_promo', null);
    this.emit('cart_updated', this.getCartSummary());
  }

  applyPromoCode(code) {
    const promo = PROMOS.find(p => p.code.toUpperCase() === code.trim().toUpperCase());
    if (!promo) {
      return { success: false, message: 'Invalid code. Try BITEBOX50 or CAMPUSFREE' };
    }

    const subtotal = this.cart.reduce((sum, i) => sum + (i.unitPrice * i.quantity), 0);
    if (promo.minOrder && subtotal < promo.minOrder) {
      return { success: false, message: `Minimum order is UGX ${promo.minOrder.toLocaleString('en-US')}` };
    }

    this.activePromo = promo;
    this.save('bitebox_promo', promo);
    this.emit('cart_updated', this.getCartSummary());
    return { success: true, message: `Promo applied: ${promo.title}` };
  }

  removePromoCode() {
    this.activePromo = null;
    this.save('bitebox_promo', null);
    this.emit('cart_updated', this.getCartSummary());
  }

  getCartSummary() {
    const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    
    let discount = 0;
    let deliveryFee = 0; // Always 100% Free Campus Drop-off!
    let serviceFee = subtotal > 0 ? 500 : 0; // UGX 500 service fee

    if (this.activePromo) {
      if (this.activePromo.freeDelivery) {
        deliveryFee = 0;
      }
      if (this.activePromo.discountPercent) {
        const rawDiscount = Math.round((subtotal * this.activePromo.discountPercent) / 100); // UGX has no cents
        discount = Math.min(rawDiscount, this.activePromo.maxDiscount || rawDiscount);
      }
      if (this.activePromo.discountFixed) {
        discount = Math.min(subtotal, this.activePromo.discountFixed);
      }
    }

    const total = Math.max(0, subtotal - discount + deliveryFee + serviceFee);

    return {
      items: this.cart,
      itemCount,
      subtotal,
      discount,
      deliveryFee,
      serviceFee,
      total,
      activePromo: this.activePromo
    };
  }

  placeOrder(orderDetails) {
    const summary = this.getCartSummary();
    if (summary.itemCount === 0) return null;

    const orderId = 'BB-' + Math.floor(100000 + Math.random() * 900000);
    const restaurant = RESTAURANTS.find(r => r.id === this.cart[0].restaurantId) || RESTAURANTS[0];

    const newOrder = {
      orderId,
      status: 'received',
      createdAt: new Date().toISOString(),
      etaMinutes: 14,
      items: [...this.cart],
      summary,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.image,
        location: restaurant.locationTag
      },
      delivery: {
        location: this.selectedLocation.name,
        roomNumber: orderDetails.roomNumber || this.user.roomNumber,
        dropoffNote: orderDetails.dropoffNote || this.user.dropoffNote,
        scheduleType: orderDetails.scheduleType || 'ASAP',
        phone: orderDetails.phone || this.user.phone
      },
      payment: {
        method: orderDetails.paymentMethod || 'Campus Cash Wallet',
        paid: true,
        amount: summary.total
      },
      courier: {
        name: 'Jordan K. (Campus Boda Courier)',
        phone: '+256 755 889 012',
        rating: 4.94,
        vehicle: 'Yellow BiteBox Boda Boda',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        progressPercent: 10
      },
      statusHistory: [
        { status: 'received', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), message: 'Order sent to campus kitchen' }
      ]
    };

    if (orderDetails.paymentMethod === 'Campus Cash Wallet' && this.user.campusCashBalance >= summary.total) {
      this.user.campusCashBalance = this.user.campusCashBalance - summary.total;
      this.user.campusPoints += Math.floor(summary.total / 100);
      this.save('bitebox_user', this.user);
    }

    this.activeOrder = newOrder;
    this.orderHistory.unshift(newOrder);
    this.save('bitebox_active_order', this.activeOrder);
    this.save('bitebox_order_history', this.orderHistory);

    this.cart = [];
    this.activePromo = null;
    this.save('bitebox_cart', []);
    this.save('bitebox_promo', null);
    this.emit('cart_updated', this.getCartSummary());

    this.setView('tracking');
    this.emit('order_created', this.activeOrder);

    this.startOrderSimulation();
    return newOrder;
  }

  startOrderSimulation() {
    if (this._simulationTimer) clearTimeout(this._simulationTimer);

    const steps = [
      { status: 'preparing', delay: 3500, message: 'Chef is dishing up your hot matooke and beef stew', progress: 35, eta: 11 },
      { status: 'on_the_way', delay: 9000, message: 'Jordan picked up your BiteBox! Riding through campus towards your hall', progress: 75, eta: 5 },
      { status: 'arrived', delay: 16000, message: 'Courier has arrived at your hostel security gate!', progress: 95, eta: 1 },
      { status: 'completed', delay: 24000, message: 'Order delivered! Enjoy your meal & good luck studying', progress: 100, eta: 0 }
    ];

    let currentStepIndex = 0;

    const runNextStep = () => {
      if (!this.activeOrder || currentStepIndex >= steps.length) return;
      const step = steps[currentStepIndex];

      this._simulationTimer = setTimeout(() => {
        if (!this.activeOrder) return;
        this.activeOrder.status = step.status;
        this.activeOrder.etaMinutes = step.eta;
        this.activeOrder.courier.progressPercent = step.progress;
        this.activeOrder.statusHistory.push({
          status: step.status,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          message: step.message
        });

        this.save('bitebox_active_order', this.activeOrder);
        this.emit('order_status_updated', this.activeOrder);

        currentStepIndex++;
        if (currentStepIndex < steps.length) {
          runNextStep();
        }
      }, step.delay);
    };

    runNextStep();
  }

  resumeOrderSimulation() {
    if (this.activeOrder && this.activeOrder.status !== 'completed') {
      this.startOrderSimulation();
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.save('bitebox_theme', this.theme);
    document.documentElement.setAttribute('data-theme', this.theme);
    this.emit('theme_changed', this.theme);
  }
}

export const state = new StateStore();
