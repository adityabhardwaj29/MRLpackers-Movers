import { ServiceItem, PricingPlan, Testimonial, GalleryItem } from './types';

export const COMPANY_INFO = {
  name: 'MRL Packers & Movers',
  legalName: 'MRL PACKERS AND MOVERS',
  udyamRegNo: 'UDYAM-MH-18-0182820',
  udyamTitle: 'UDYAM REGISTRATION NUMBER: UDYAM-MH-18-0182820',
  brandShort: 'MRL',
  tagline: 'Govt. MSME Registered ISO Certified Relocation Specialists in Mumbai',
  subHeading: 'Safe, Fast & Affordable Relocation Services Across India',

  // === OFFICIAL PHONE NUMBERS ===
  // Primary: 7777042041 | Display: +91 77770 42041 | Tel link: +917777042041
  phonePrimary: '+91 77770 42041',
  phonePrimaryRaw: '7777042041',
  phonePrimaryTel: '+917777042041',      // Use for tel: href links

  // Secondary: 8657972041 | Display: +91 86579 72041 | Tel link: +918657972041
  phoneSecondary: '+91 86579 72041',
  phoneSecondaryRaw: '8657972041',
  phoneSecondaryTel: '+918657972041',    // Use for tel: href links

  // WhatsApp: 7777042041 is the configured WhatsApp Business number
  whatsappNumber: '917777042041',        // Primary WhatsApp (7777042041)
  whatsappNumberAlt: '918657972041',     // Alt WhatsApp if needed

  email: 'mrlpackersmovers7777@gmail.com',
  supportEmail: 'mrlpackersmovers7777@gmail.com',
  experienceText: 'Experienced & Trusted',
  happyClientsCount: '15,000+',
  successfulShiftingsCount: '18,200+',
  satisfactionRate: '99.8%',
  headOfficeAddress: 'BOX C-8, NATRAJ CHS, KRANTI NAGAR, KANDIVALI EAST, MUMBAI, PIN - 400101',
  branchOffice: 'Kranti Nagar, Kandivali East, Western Express Highway Corridor, Mumbai - 400101',
  operatingCities: ['Mumbai', 'Kandivali East', 'Borivali', 'Andheri', 'Goregaon', 'Malad', 'Thane', 'Navi Mumbai', 'Pune', 'Pan-India'],
  workingHours: '24/7 Operations & Live GPS Tracking',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.245842880629!2d72.86835267498717!3d19.208479582025686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b738a16db8a9%3A0x6a19f2a96dcbe9be!2sKranti%20Nagar%2C%20Kandivali%20East%2C%20Mumbai%2C%20Maharashtra%20400101!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'household-shifting',
    title: 'Household Shifting',
    category: 'residential',
    iconName: 'Home',
    shortDesc: 'Complete home relocation with zero stress. 3-layer bubble wrapping, furniture disassembly, and setup.',
    fullDesc: 'Our specialized household shifting team handles everything from delicate crockery to heavy furniture with double-layer corrugated boxes, bubble cushion wraps, and custom wooden crates.',
    features: ['Multi-layer Protective Wrapping', 'Furniture Disassembly & Assembly', 'Electronics & Appliance Handling', 'Unpacking & Room Setup'],
    startingPrice: '₹4,999',
    popular: true,
  },
  {
    id: 'office-shifting',
    title: 'Office & Corporate Relocation',
    category: 'commercial',
    iconName: 'Building2',
    shortDesc: 'Minimal downtime corporate shifting. Desktop servers, office furniture, IT equipment, & confidential files.',
    fullDesc: 'Seamless office moves planned during off-hours or weekends to ensure uninterrupted business operations. Labeled anti-static packaging for servers and IT gear.',
    features: ['Off-Peak & Weekend Shifting', 'IT Server & Hardware Safety', 'Numbered Labeling System', 'Modular Desk Assembly'],
    startingPrice: '₹12,499',
  },
  {
    id: 'packing-moving',
    title: 'Packing & Unpacking',
    category: 'packing',
    iconName: 'PackageCheck',
    shortDesc: 'High-grade German bubble wrapping, corrugated rolls, stretch films, and waterproof tarpaulin sheets.',
    fullDesc: 'We use industrial-strength packaging materials to safeguard your valuables against bumps, moisture, and scratches during transit.',
    features: ['Waterproof Tarpaulin Protection', 'Air-Bubble Cushioning', 'Corrugated Wardrobe Boxes', 'Color-Coded Inventory Tags'],
    startingPrice: '₹2,499',
  },
  {
    id: 'loading-unloading',
    title: 'Loading & Unloading',
    category: 'residential',
    iconName: 'Truck',
    shortDesc: 'Trained, uniform-clad heavy lifting crew equipped with ramps, hydraulic dollies, and safety belts.',
    fullDesc: 'Our experienced staff handles high-rise elevators, narrow staircases, and heavy items like pianos or double-door fridges with specialized lifting equipment.',
    features: ['Hydraulic Lifting Equipment', 'Staircase & Elevator Safety Pads', 'Floor & Wall Corner Guards', 'Uniformed & Verified Laborers'],
    startingPrice: '₹1,999',
  },
  {
    id: 'car-bike-transport',
    title: 'Car & Bike Transport',
    category: 'vehicle',
    iconName: 'Car',
    shortDesc: 'Enclosed multi-car carriers and customized bike transport racks with door-to-door pickup & delivery.',
    fullDesc: 'Safe, scratch-free vehicle shipping across Mumbai, Maharashtra, and all Indian cities with live GPS tracking and full transit insurance coverage.',
    features: ['Enclosed Car Container Trucks', 'Customized Bike Foam Wrapping', 'Pre-Trip Inspection Report', 'Doorstep Pickup & Delivery'],
    startingPrice: '₹2,999',
    popular: true,
  },
  {
    id: 'warehouse-storage',
    title: 'Warehouse & Safe Storage',
    category: 'storage',
    iconName: 'Warehouse',
    shortDesc: '24/7 CCTV monitored, pest-controlled, climate-safe storage facilities for short-term and long-term needs.',
    fullDesc: 'Secure storage units in Mumbai with individual lockable bays, weekly inspection logs, and flexible monthly rental plans for household or commercial goods.',
    features: ['24/7 Live CCTV Access', 'Pest & Moisture Controlled', 'Insured Storage Vaults', 'Flexible Weekly/Monthly Plans'],
    startingPrice: '₹1,499/mo',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: '1bhk-plan',
    title: '1 BHK Shifting',
    moveType: '1BHK',
    startingPrice: 4999,
    originalPrice: 6500,
    discountBadge: '100% INCLUDES TRANSIT INSURANCE',
    crewCount: '3 Professional Crew Members',
    packingMaterials: 'Included (Bubble Wrap + Corrugated Boxes)',
    truckType: '14ft Closed Container Vehicle',
    features: [
      'Complete Loading & Unloading',
      'Free Basic Dismantling & Reassembly',
      'Door-to-Door Local Relocation',
      'Transit Insurance Coverage up to ₹50,000',
      'Dedicated Move Manager',
    ],
  },
  {
    id: '2bhk-plan',
    title: '2 BHK Shifting',
    moveType: '2BHK',
    startingPrice: 7999,
    originalPrice: 9999,
    discountBadge: 'MOST POPULAR (BEST VALUE)',
    crewCount: '4-5 Professional Crew Members',
    packingMaterials: '3-Layer Premium Protection Included',
    truckType: '17ft Closed Container Vehicle',
    recommended: true,
    features: [
      'Double-Layer Furniture Bubble Wrap',
      'TV, Fridge & AC Safe Handling',
      'Complete Unpacking & Furniture Setup',
      'Transit Insurance Coverage up to ₹1,50,000',
      '0% Hidden Charges Guarantee',
      '24/7 Live GPS Vehicle Tracking',
    ],
  },
  {
    id: '3bhk-plan',
    title: '3 BHK / Duplex Shifting',
    moveType: '3BHK',
    startingPrice: 11999,
    originalPrice: 14999,
    discountBadge: 'COMPREHENSIVE FULL PACKING',
    crewCount: '6-7 Senior Relocation Experts',
    packingMaterials: 'Heavy Duty German Materials + Wooden Crate',
    truckType: '19ft / 22ft Heavy Container',
    features: [
      'Heavy Furniture & Glassware Crating',
      'Full Packing + Unpacking & Room Placement',
      'Electronics Disassembly & Re-mounting',
      'Transit Insurance Coverage up to ₹3,00,000',
      'Priority Delivery Slot',
      'Post-Move Cleaning Assistance',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Anand Kulkarni',
    location: 'Shifted from Kandivali East to Powai, Mumbai',
    moveType: '2 BHK Household Move',
    rating: 5,
    review: 'MRL Packers & Movers did an incredible job! They packed our 55-inch OLED TV and delicate crockery with so much precision. Not even a single scratch! The team arrived on time at 8 AM in Kandivali and completed everything smoothly in Powai.',
    date: '3 days ago',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Sneha Deshmukh',
    location: 'Shifted from Borivali West to Kharghar, Navi Mumbai',
    moveType: '3 BHK House + Bike Transport',
    rating: 5,
    review: 'I was really stressed about moving my 3BHK household and Royal Enfield bike. MRL Packers & Movers handled both seamlessly. The bike was transported in a covered rack without any damage. Very polite staff and transparent pricing with no extra demands.',
    date: '1 week ago',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Vikram Mehta (Tech Corp)',
    location: 'Shifted Office from BKC to Lower Parel, Mumbai',
    moveType: 'Corporate Office Relocation',
    rating: 5,
    review: 'We hired MRL Packers & Movers to shift our 40-seater tech office over a Sunday. They labeled all desktop monitors, server racks, and files systematically. Monday morning our staff resumed work without any glitch. Highly recommended for corporate moves!',
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Pooja Iyer',
    location: 'Intercity Move from Mumbai to Pune',
    moveType: '1 BHK Relocation',
    rating: 5,
    review: 'Fastest intercity move ever! Picked up from Kandivali East at 7 AM and reached Pune Wakad by 2 PM same day. Live GPS updates gave me total peace of mind throughout the highway travel.',
    date: '1 month ago',
    verified: true,
  },
];

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Professional Household Packing in Progress',
    category: 'Packing',
    imageUrl: '/src/assets/images/household_packing_1785558040208.jpg',
    tag: '3-Layer Bubble Wrap',
  },
  {
    id: 'gal-2',
    title: 'MRL Heavy-Duty Transport Fleet',
    category: 'Vehicles',
    imageUrl: '/src/assets/images/hero_moving_truck_1785558026217.jpg',
    tag: 'GPS Tracked Container',
  },
  {
    id: 'gal-3',
    title: 'Modern Climate-Controlled Storage',
    category: 'Warehouse',
    imageUrl: '/src/assets/images/warehouse_storage_1785558054725.jpg',
    tag: '24/7 CCTV Security',
  },
  {
    id: 'gal-4',
    title: 'Sofa & Furniture Cushion Shielding',
    category: 'Household',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tag: 'Zero Scratch Safety',
  },
  {
    id: 'gal-5',
    title: 'Corporate Office IT Hardware Packing',
    category: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    tag: 'Systematic Labeling',
  },
  {
    id: 'gal-6',
    title: 'Enclosed Bike & Vehicle Transport',
    category: 'Vehicles',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    tag: 'Scratch-Proof Foam Harness',
  },
  {
    id: 'gal-7',
    title: 'Fragile Crockery & Glassware Crating',
    category: 'Packing',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    tag: 'Wooden Crating Support',
  },
  {
    id: 'gal-8',
    title: 'Living Room Setup & Final Placement',
    category: 'Household',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    tag: 'Complete Unpacking',
  },
  {
    id: 'gal-9',
    title: 'Commercial Bulk Goods & Pallet Transport',
    category: 'Warehouse',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    tag: 'Palletized Storage',
  },
];

export const FAQS = [
  {
    question: 'How far in advance should I book MRL Packers & Movers?',
    answer: 'We recommend booking 2 to 4 days prior to your preferred moving date for local Mumbai relocations. However, we also support urgent same-day or next-day shifting subject to truck slot availability.',
  },
  {
    question: 'Are there any hidden charges added after the quote?',
    answer: 'No! MRL Packers & Movers strictly adheres to a transparent, zero-hidden-fee guarantee. Your initial written quote includes packing materials, loading, toll charges, transport, and unloading.',
  },
  {
    question: 'Is my household items insured during transit?',
    answer: 'Yes, we provide 100% comprehensive transit insurance covering accidental damage or unforeseen events during travel between pickup and drop destination.',
  },
  {
    question: 'Do you dismantle and re-assemble ACs, TV wall mounts, and beds?',
    answer: 'Yes, our trained technician team handles standard furniture disassembly and reassembly (beds, dining tables, wardrobes). AC un-installation/installation service is also available upon request.',
  },
  {
    question: 'How do you calculate the estimated cost for shifting?',
    answer: 'Cost depends on the volume of goods (1BHK/2BHK/3BHK), distance between locations, elevator/staircase access at both sides, and packaging tier required.',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: '100% Goods Safety Guarantee',
    desc: 'Multi-layer bubble wrap, edge guards, and waterproof tarpaulins protect every item.',
    icon: 'ShieldCheck',
  },
  {
    title: '24/7 Dedicated Support',
    desc: 'Personal move coordinator assigned to assist you before, during, and after shifting.',
    icon: 'Headphones',
  },
  {
    title: 'Verified & Experienced Crew',
    desc: 'Background-checked, full-time trained moving staff with years of experience in high-rise Mumbai towers.',
    icon: 'UserCheck',
  },
  {
    title: 'Transparent Pricing & No Hidden Fees',
    desc: 'Upfront itemized quotes. What you see is what you pay—guaranteed!',
    icon: 'Receipt',
  },
];
