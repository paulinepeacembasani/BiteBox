# BiteBox 📦

> **Campus Food Delivery Web Application** — Glovo-style on-demand meal prep and food delivery engineered for campus students.

---

## 🎨 Design & Theme Identity
- **Strict Brand Palette**: Vibrant Orange (`#FF6B00`), Electric Yellow (`#FFC200`), and Deep Onyx Black (`#090A0E`).
- **Dual-Mode System**: Seamless **Dark Mode** (default sleek campus aesthetic) and **Light Mode** with high-contrast typography and glowing accents.
- **Borderless Modern UI**: Clean, floating cards with soft elevations and zero harsh boundaries/borders.
- **Zero-Emoji Clean Iconography**: High-fidelity vector SVG iconography throughout the app.

---

## 🚀 Key Features

1. **Campus Delivery Spot Selector**:
   - Deliver directly to specific campus halls, hostels, library steps, or tech quads (e.g. *Nelson Mandela Hall*, *Africa Hall*, *Olympia Hostel*).
   - UGX 0 Free Campus Drop-off built-in.

2. **Glovo-Style Category Bubbles**:
   - Circular interactive category bubbles: *Campus Combos*, *Burgers & Wraps*, *Late Night 24/7*, *Campus Kitchen*, *Pizza & Wings*, *Boba & Shakes*, *Healthy & Fuel*, *UniMart & Snacks*, and *Coffee & Bakery*.

3. **Interactive Search & Instant Filters**:
   - Search by dish or restaurant name.
   - Quick filters: *Under UGX 4,000 Student Meals*, *Fastest (< 15 mins)*, *Open 24/7 Late Night*, and *Campus Legends*.

4. **Restaurant Details & Food Customization**:
   - Categorized menus with preparation times, calories, and badges.
   - Interactive item modal: Portion sizes, add-ons (extra cheese, bacon, dips), spice level selection, and special instructions for the kitchen.

5. **Slide-Out Cart & Campus Promo Engine**:
   - Live item quantity steppers.
   - Working student promo codes:
     - `BITEBOX50`: 50% OFF first order.
     - `CAMPUSFREE`: 100% Free delivery across all hostels.
     - `EXAMPOSHO`: UGX 2,000 OFF late night study meals.
     - `ROOMIESPLIT`: 20% OFF group orders (UGX 15,000+).

6. **Multi-Step Campus Checkout Flow**:
   - **Step 1: Delivery Location & Timing**: Hostel drop-off, room/flat number, student phone, ASAP or study break schedule.
   - **Step 2: Payment & Roommate Split**: Campus Cash Wallet (with live balance), Mobile Money (*M-Pesa / MTN / Airtel*), Student Card, or Cash on Delivery.
   - **Roommate Bill Splitter**: Divide the total evenly among 2, 3, or 4 roommates.

7. **Live Campus Map & Order Tracker**:
   - **HTML5 Canvas Campus Map**: Real-time animation of the yellow electric scooter courier driving along campus roads from the restaurant to the student's hostel.
   - **4-Step Status Stepper**: *Received* ➔ *Cooking* ➔ *On the Way* ➔ *Arrived*.
   - **Courier Interaction**: Rider info, real-time phone dial simulation, and an **interactive instant chat modal** with realistic automated courier responses.

8. **Weekly & Monthly Meal Plans** (Subscriptions page):
   - Weekly plans: UGX 35,000 (Weekly Lite) – UGX 50,000 (Weekly Plus).
   - Monthly plans: UGX 150,000 (Lite), UGX 220,000 (Standard), UGX 300,000 (Premium).
   - Pay from the Campus Cash Wallet or Mobile Money; switch or cancel any time.

9. **Student Auth & Profile Management**:
   - The app always opens on the Sign In page.
   - Student Sign In & Sign Up with student ID, campus email (`.edu`), and hostel selection.
   - Campus Cash Wallet top-up and BiteBox Loyalty Points tracker.

---

## 💻 Running the App Locally

Start any static HTTP server in the repository root:

```bash
# Using Node / npx
npx -y serve -l 3000

# Or using Python
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
