/**
 * BiteBox Campus Food Delivery - Authentic Local Ugandan Campus Data Store
 * Real student meals: Matooke, Posho & Beans, Rolex, Kikomando, Katogo, Sweet Potatoes, Muchomo
 */

export const CAMPUS_LOCATIONS = [
  { id: 'mandela', name: 'Nelson Mandela Hall', zone: 'North Campus', timeOffset: 0 },
  { id: 'uhall', name: 'University Central Hall', zone: 'Main Quad', timeOffset: 2 },
  { id: 'africa', name: 'Africa Hall (Ladies Hostel)', zone: 'Central', timeOffset: 3 },
  { id: 'mitchell', name: 'Mitchell Hall', zone: 'East Campus', timeOffset: 4 },
  { id: 'library', name: 'Main Campus Library Steps', zone: 'Study Zone', timeOffset: 1 },
  { id: 'tech_quad', name: 'Engineering & Tech Complex', zone: 'South Campus', timeOffset: 5 },
  { id: 'olympia', name: 'Olympia Off-Campus Hostel', zone: 'Kikoni Perimeter', timeOffset: 7 },
  { id: 'akamwesi', name: 'Akamwesi Mega Hostel', zone: 'Wandegeya Valley', timeOffset: 8 },
  { id: 'nana', name: 'Nana Hostel Block B', zone: 'Kikoni Valley', timeOffset: 6 },
  { id: 'biz_school', name: 'Business & Economics Quad', zone: 'West Campus', timeOffset: 4 }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Spots', iconKey: 'categoryAll', desc: 'All campus kitchens open now' },
  { id: 'local', name: 'Matooke & Stews', iconKey: 'categoryLocal', desc: 'Steamed matooke & rich beef stew' },
  { id: 'rolex', name: 'Rolex & Kikomando', iconKey: 'categoryCombos', desc: 'Monster rolex & bean mixes' },
  { id: 'posho', name: 'Posho & Beans', iconKey: 'categoryHealthy', desc: 'Student daily survival meals' },
  { id: 'muchomo', name: 'Chicken & Muchomo', iconKey: 'categoryBurgers', desc: 'Seasoned local chicken & skewers' },
  { id: 'breakfast', name: 'Katogo & Tea', iconKey: 'categoryCoffee', desc: 'Morning matooke katogo & spiced tea' },
  { id: 'snacks', name: 'Mandazi & Samosas', iconKey: 'categorySnacks', desc: 'Study snacks, sodas & water' }
];

export const SUBSCRIPTION_PLANS = [
  // Weekly plans (UGX 35,000 - 50,000)
  {
    id: 'weekly-lite',
    period: 'weekly',
    name: 'Weekly Lite',
    price: 35000,
    tagline: 'One hot lunch a day',
    features: ['7 lunch meals per week', 'Free hostel drop-off', 'Posho, beans, rolex & katogo menu']
  },
  {
    id: 'weekly-plus',
    period: 'weekly',
    name: 'Weekly Plus',
    price: 50000,
    tagline: 'Lunch + supper sorted',
    popular: true,
    features: ['7 lunch + 7 supper meals', 'Free hostel drop-off', 'Full campus menu incl. matooke & muchomo', 'Priority delivery at peak hours']
  },
  // Monthly plans (UGX 150,000 - 300,000)
  {
    id: 'monthly-lite',
    period: 'monthly',
    name: 'Monthly Lite',
    price: 150000,
    tagline: 'One hot lunch a day',
    features: ['30 lunch meals per month', 'Free hostel drop-off', 'Posho, beans, rolex & katogo menu', 'Save vs. weekly billing']
  },
  {
    id: 'monthly-standard',
    period: 'monthly',
    name: 'Monthly Standard',
    price: 220000,
    tagline: 'Lunch + supper on weekdays',
    popular: true,
    features: ['Lunch daily + supper Mon-Fri', 'Free hostel drop-off', 'Full campus menu incl. matooke & muchomo', 'Priority delivery at peak hours']
  },
  {
    id: 'monthly-premium',
    period: 'monthly',
    name: 'Monthly Premium',
    price: 300000,
    tagline: 'Every meal, every day',
    features: ['Breakfast, lunch & supper daily', 'Free hostel drop-off', 'Full menu + late night study snacks', 'Priority delivery & roommate meal sharing']
  }
];

export const PROMOS = [
  {
    code: 'BITEBOX50',
    title: '50% OFF First Campus Order',
    description: 'Use code BITEBOX50 at checkout. Max discount UGX 5,000.',
    discountPercent: 50,
    maxDiscount: 5000,
    minOrder: 4000,
    badge: 'NEW STUDENT'
  },
  {
    code: 'CAMPUSFREE',
    title: 'Free Delivery to All Halls',
    description: 'Free courier drop-off anywhere within campus.',
    freeDelivery: true,
    minOrder: 3000,
    badge: 'FREE DROP-OFF'
  },
  {
    code: 'EXAMPOSHO',
    title: 'UGX 2,000 OFF Late Night Study',
    description: 'Valid on all late night rolex and meals after 9PM.',
    discountFixed: 2000,
    minOrder: 5000,
    badge: 'MIDNIGHT'
  },
  {
    code: 'ROOMIESPLIT',
    title: '20% OFF Group Orders (UGX 15K+)',
    description: 'Order together with roommates and save.',
    discountPercent: 20,
    maxDiscount: 6000,
    minOrder: 15000,
    badge: 'ROOMMATE DEAL'
  }
];

export const RESTAURANTS = [
  {
    id: 'mama-kevina',
    name: "Mama Kevina's Campus Kitchen",
    tagline: 'Authentic steamed matooke, beef stew, posho, sweet potatoes & fresh beans',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    categories: ['local', 'posho', 'breakfast'],
    rating: 4.95,
    reviewCount: 1240,
    deliveryTime: '12-18 min',
    deliveryFee: 0,
    minOrder: 2500,
    priceRange: 'UGX',
    isCampusLegend: true,
    isOpenLate: true,
    acceptsCampusCash: true,
    studentDiscountBadge: 'Legendary Campus Food',
    locationTag: 'Behind Nelson Mandela Hall Gate',
    distance: '0.2 km away',
    menu: [
      {
        id: 'mk-1',
        name: 'Steamed Matooke & Tender Beef Stew',
        description: 'Piping hot mashed green plantains (matooke) with rich spiced beef gravy, steamed greens (dodo), and a slice of avocado.',
        price: 6000,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        category: 'Matooke & Stews',
        isBestseller: true,
        isStudentFavorite: true,
        calories: '650 kcal',
        prepTime: '6 min',
        options: {
          sizes: [
            { name: 'Standard Student Plate', priceAdd: 0 },
            { name: 'Heavy Portion (+ Extra Beef Chunk & Matooke)', priceAdd: 2000 }
          ],
          addons: [
            { name: 'Extra Ripe Avocado Slice', price: 500 },
            { name: 'Add Fried Red Beans Scoop', price: 1000 },
            { name: 'Add Extra Beef Gravy Cup', price: 800 }
          ],
          spiceLevels: ['Mild Stew', 'Medium Chili Zing', 'Hot Pilipili']
        }
      },
      {
        id: 'mk-2',
        name: 'The Campus Survival: Posho & Savory Beans',
        description: 'Thick steaming white posho served with savory slow-simmered spiced red kidney beans and seasoned cabbage soup.',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        category: 'Posho & Beans',
        isBestseller: true,
        isStudentFavorite: true,
        calories: '720 kcal',
        prepTime: '4 min',
        options: {
          sizes: [
            { name: 'Standard Survival Plate', priceAdd: 0 },
            { name: 'Jumbo Portion (+ Double Posho Block)', priceAdd: 1000 }
          ],
          addons: [
            { name: 'Add Fried Egg on Top', price: 800 },
            { name: 'Add Avocado Slice', price: 500 },
            { name: 'Add Beef Soup Splash', price: 600 }
          ],
          spiceLevels: ['Gentle Seasoning', 'Spicy Pepper']
        }
      },
      {
        id: 'mk-3',
        name: 'Steamed Sweet Potatoes & Fresh Peas Stew',
        description: 'Yellow sweet potatoes steamed tender, served with sweet green peas in creamy tomato-onion gravy.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        category: 'Matooke & Stews',
        calories: '490 kcal',
        prepTime: '5 min',
        options: {
          sizes: [
            { name: 'Standard Plate', priceAdd: 0 },
            { name: 'Mixed Sweet Potatoes & Matooke', priceAdd: 1000 }
          ],
          addons: [
            { name: 'Extra Peas Ladle', price: 1000 },
            { name: 'Add Avocado Slice', price: 500 }
          ]
        }
      },
      {
        id: 'mk-4',
        name: 'Morning Katogo Feast (Matooke + Beef Offals & Beans)',
        description: 'Traditional campus morning energy breakfast: steamed matooke cooked inside tender beef offals (ebinyebwa/byenda) and beans.',
        price: 4000,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        category: 'Katogo & Breakfast',
        isBestseller: true,
        calories: '580 kcal',
        prepTime: '4 min',
        options: {
          sizes: [
            { name: 'Standard Bowl', priceAdd: 0 },
            { name: 'Heavy Student Katogo Bowl', priceAdd: 1500 }
          ],
          addons: [
            { name: 'Add Hot Spiced Tea Cup', price: 1000 },
            { name: 'Add Hard Boiled Egg', price: 800 }
          ]
        }
      }
    ]
  },
  {
    id: 'kikoni-rolex-base',
    name: 'Kikoni Rolex & Kikomando Base 24/7',
    tagline: 'Fresh eggs on hot chapatis, sliced Kikomando & late night study bites',
    image: 'assets/food/rolex.jpg',
    bannerImage: 'assets/food/rolex.jpg',
    categories: ['rolex', 'snacks', 'breakfast'],
    rating: 4.96,
    reviewCount: 1850,
    deliveryTime: '8-14 min',
    deliveryFee: 0,
    minOrder: 2000,
    priceRange: 'UGX',
    isCampusLegend: true,
    isOpenLate: true,
    acceptsCampusCash: true,
    studentDiscountBadge: 'Fastest 10min Drop-off',
    locationTag: 'Hostel Valley Junction - Station 4',
    distance: '0.15 km away',
    menu: [
      {
        id: 'kr-1',
        name: 'The Quad-Egg Monster Rolex',
        description: '4 Farm-fresh eggs whisked with diced red tomatoes, onions, cabbage, rolled sizzling hot in two layered buttery chapatis.',
        price: 3500,
        image: 'assets/food/rolex.jpg',
        category: 'Campus Rolex',
        isBestseller: true,
        isStudentFavorite: true,
        calories: '520 kcal',
        prepTime: '3 min',
        options: {
          sizes: [
            { name: 'Standard 2 Eggs, 1 Chapati', priceAdd: -1000 },
            { name: 'Double Chapati 4 Eggs Monster', priceAdd: 0 },
            { name: 'Titanic 6 Eggs + 3 Chapatis (Feeds 2)', priceAdd: 2000 }
          ],
          addons: [
            { name: 'Add Minced Beef / Sausage Layer', price: 1200 },
            { name: 'Add Sliced Avocado Inside', price: 500 },
            { name: 'Add Cheddar Cheese Melt', price: 1000 }
          ],
          spiceLevels: ['No Pepper', 'Mild Green Pepper', 'Street Hot Pilipili']
        }
      },
      {
        id: 'kr-2',
        name: 'Titanic Kikomando (3 Chapatis + Thick Beans + Avocado)',
        description: '3 Fresh flaky chapatis cut into bite-sized strips, smothered in hot spiced fried red beans gravy and fresh avocado slices.',
        price: 3000,
        image: 'assets/food/shawarma.jpg',
        category: 'Kikomando',
        isBestseller: true,
        isStudentFavorite: true,
        calories: '680 kcal',
        prepTime: '3 min',
        options: {
          sizes: [
            { name: 'Standard Kikomando (2 Chapatis)', priceAdd: -500 },
            { name: 'Titanic Portion (3 Chapatis + Double Beans)', priceAdd: 0 },
            { name: 'Hostel Share Tray (5 Chapatis)', priceAdd: 2500 }
          ],
          addons: [
            { name: 'Add Fried Sunny-Side Egg on top', price: 800 },
            { name: 'Add Beef Soup Dip Cup', price: 600 },
            { name: 'Extra Fried Beans Ladle', price: 800 }
          ],
          spiceLevels: ['Normal Flavor', 'Spicy Pepper']
        }
      },
      {
        id: 'kr-3',
        name: 'Hot Spiced African Ginger Milk Tea + 2 Fresh Mandazis',
        description: 'Brewed whole milk spiced with fresh crushed ginger and tea leaves, served steaming with 2 soft golden sweet mandazis.',
        price: 2500,
        image: 'assets/food/boba.jpg',
        category: 'Tea & Snacks',
        calories: '340 kcal',
        prepTime: '2 min',
        options: {
          sizes: [
            { name: 'Single Cup (400ml)', priceAdd: 0 },
            { name: 'Study Session Flask (750ml)', priceAdd: 1500 }
          ],
          addons: [
            { name: 'Add Extra Mandazi (2 pcs)', price: 1000 },
            { name: 'Add Beef Samosa (2 pcs)', price: 1500 }
          ]
        }
      }
    ]
  },
  {
    id: 'campus-muchomo',
    name: 'Campus Muchomo & Local Chicken Spot',
    tagline: 'Fried seasoned chicken, roasted beef skewers, golden plantains (gonja) & chips',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    categories: ['muchomo', 'local', 'snacks'],
    rating: 4.88,
    reviewCount: 910,
    deliveryTime: '15-22 min',
    deliveryFee: 0,
    minOrder: 4000,
    priceRange: 'UGX',
    isCampusLegend: false,
    isOpenLate: true,
    acceptsCampusCash: true,
    studentDiscountBadge: 'Free Soda with Chicken Box',
    locationTag: 'West Gate Quad Arcade',
    distance: '0.4 km away',
    menu: [
      {
        id: 'cm-1',
        name: 'Fried Local Chicken Quarter & Savory Rice',
        description: 'Deep-fried marinated local chicken thigh and leg served with spiced yellow rice, steamed plantains, and tomato onion salsa (kachumbari).',
        price: 8500,
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80',
        category: 'Local Chicken & Rice',
        isBestseller: true,
        isStudentFavorite: true,
        calories: '780 kcal',
        prepTime: '10 min',
        options: {
          sizes: [
            { name: 'Quarter Chicken + Rice', priceAdd: 0 },
            { name: 'Half Chicken Mega Feast (+ Double Rice)', priceAdd: 6000 }
          ],
          addons: [
            { name: 'Add Roasted Gonja Skewer', price: 1500 },
            { name: 'Add Cold Coca-Cola 350ml Glass', price: 1500 },
            { name: 'Add Extra Chili Kachumbari', price: 500 }
          ],
          spiceLevels: ['Mild Herb', 'Spicy BBQ Peri Peri', 'Flame Hot']
        }
      },
      {
        id: 'cm-2',
        name: 'Beef Muchomo Skewers (3 Sticks) & Roasted Gonja',
        description: 'Tender charcoal-grilled beef skewers seasoned with East African spices, paired with sweet caramelized roasted plantains.',
        price: 6500,
        image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80',
        category: 'Muchomo & Skewers',
        isBestseller: true,
        calories: '550 kcal',
        prepTime: '8 min',
        options: {
          sizes: [
            { name: '3 Beef Sticks + Gonja', priceAdd: 0 },
            { name: '5 Beef Sticks + Double Gonja (Dorm Pack)', priceAdd: 3500 }
          ],
          addons: [
            { name: 'Extra Chili Dip Pot', price: 500 },
            { name: 'Add Sliced Raw Red Onions', price: 300 }
          ]
        }
      },
      {
        id: 'cm-3',
        name: 'Crispy Samosa Box (4 pcs - Beef or Veggie)',
        description: 'Golden fried triangular pastry filled with spiced minced beef, spring onions, and garlic pepper.',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
        category: 'Snacks & Samosas',
        calories: '380 kcal',
        prepTime: '4 min',
        options: {
          sizes: [
            { name: '4 Samosas (Solo)', priceAdd: 0 },
            { name: '8 Samosas (Study Group)', priceAdd: 2800 }
          ]
        }
      }
    ]
  },
  {
    id: 'hostel-daily-cafe',
    name: 'Hostel Valley Daily Cafeteria',
    tagline: 'Student-budget daily specials: Posho, beans, matooke, peas, rice & greens',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    categories: ['posho', 'local', 'breakfast'],
    rating: 4.82,
    reviewCount: 760,
    deliveryTime: '10-16 min',
    deliveryFee: 0,
    minOrder: 2000,
    priceRange: 'UGX',
    isCampusLegend: false,
    isOpenLate: false,
    acceptsCampusCash: true,
    studentDiscountBadge: 'From UGX 2,500',
    locationTag: 'Hostel Valley Concourse',
    distance: '0.25 km away',
    menu: [
      {
        id: 'hd-1',
        name: 'The Semester Saver (Posho + Double Beans + Greens)',
        description: 'Generous serving of white posho cake with thick red beans stew and steamed sukuma greens. The daily campus lifeline.',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        category: 'Posho & Beans',
        isBestseller: true,
        isStudentFavorite: true,
        calories: '680 kcal',
        prepTime: '4 min',
        options: {
          sizes: [
            { name: 'Standard Saver Plate', priceAdd: 0 },
            { name: 'Heavy Duty Portion (+Extra Beans & Posho)', priceAdd: 1000 }
          ],
          addons: [
            { name: 'Add Fresh Avocado Slice', price: 500 },
            { name: 'Add Beef Gravy Soup Splash', price: 500 }
          ]
        }
      },
      {
        id: 'hd-2',
        name: 'White Steamed Rice & Fresh Green Peas Stew',
        description: 'Fluffy white rice topped with freshly shelled sweet green peas stew and carrots.',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        category: 'Rice & Peas',
        calories: '510 kcal',
        prepTime: '5 min',
        options: {
          sizes: [
            { name: 'Standard Plate', priceAdd: 0 },
            { name: 'Heavy Hungry Student Plate', priceAdd: 1200 }
          ],
          addons: [
            { name: 'Add Fried Egg', price: 800 },
            { name: 'Add Avocado Slice', price: 500 }
          ]
        }
      }
    ]
  }
];

export const MOCK_STUDENT_USER = {
  name: 'Alex Johnson',
  email: 'alex.j@campus.edu',
  studentId: 'STU-2024-9981',
  phone: '+256 701 234 567',
  hostel: 'mandela',
  roomNumber: 'Room B-204, 2nd Floor',
  dropoffNote: 'Call on arrival or leave with hostel security desk',
  campusPoints: 480,
  campusCashBalance: 25000, // UGX 25,000 balance!
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};
