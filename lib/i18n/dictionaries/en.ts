import type { Dictionary } from '@/lib/i18n/types';

export const en = {
  nav: {
    home: 'Home',
    homeLabel: 'home',
    products: 'Products',
    catalogue: 'Catalogue',
    simulator: 'Simulator',
    suppliers: 'Suppliers',
    tracking: 'Tracking',
    about: 'About',
    legal: 'Legal framework',
    contact: 'Contact',
    wholesale: 'Wholesale / resellers',
    supplierSpace: 'Supplier space',
    login: 'Log in',
    reserve: 'Order',
    reservePack: 'Reserve my pack',
    whatsapp: 'Chat on WhatsApp',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    whatsappMessage: 'Hello ALMERÍAGA, I have a question.',
  },

  language: {
    label: 'Language',
    choose: 'Choose language',
    current: 'Current language',
    hybridNote: 'French + Algerian Arabic',
    switching: 'Switching language…',
  },

  common: {
    brandTagline: 'Global sourcing & micro-import',
    priceOnRequest: 'Price on request',
    warranty: '{months}-month warranty',
    warrantyShort: '{months}m warranty',
    callback: 'Request a callback',
    close: 'Close',
    all: 'All',
    whatsapp: 'WhatsApp',
    required: 'Required field',
    noOnlinePayment: 'No online payment',
  },

  hero: {
    badge: 'Available on reservation — Direct sourcing from Spain',
    title: 'From Spain to your door.',
    titleAccent: 'من إسبانيا إلى باب منزلك',
    subtitle:
      'High-precision global sourcing and micro-import. Order your PS5 Slim + GTA VI pack with complete peace of mind and pay on delivery in your wilaya.',
    ctaProducts: 'View products',
    ctaCallback: 'Request a callback',
    whatsapp: 'Direct WhatsApp',
    trust: ['Declared import', 'Invoice & warranty', 'Payment on delivery'],
    route: {
      eyebrow: 'International sourcing & logistics',
      corridor: 'Almería → Oran → Algiers',
      spain: 'SPAIN',
      algeria: 'ALGERIA',
      almeria: 'Almería',
      oran: 'Oran',
      alger: 'Algiers',
      bullets: ['Direct sourcing in Almería', 'Secure sea crossing', 'Home delivery (wilaya)'],
    },
    whatsappMessage: 'Hello ALMERÍAGA, I would like to reserve the PS5 Slim + GTA VI pack.',
  },

  products: {
    badge: 'Catalogue',
    title: 'Our products & equipment',
    lead:
      'A carefully curated selection of consoles, VR headsets, gaming PCs and accessories. Transparent availability and price on request.',
    availability: {
      PreOrder: 'Available on reservation',
      OnDemand: 'Made to order',
      OnQuote: 'On quote',
      AtRelease: 'Available at release',
      InStock: 'In stock',
    },
    items: {
      'ps5-slim-1to-gta6': {
        name: 'PS5 Slim 1 TB + GTA VI pack',
        bullets: ['PS5 Slim 1 TB console', 'Wireless controllers', 'GTA VI', 'Invoice and seller warranty'],
      },
      'ps5-edition-speciale': {
        name: 'PS5 Special Edition',
        bullets: ['Special Edition console', 'Matching controller', 'Invoice and warranty'],
      },
      'manette-dualsense': {
        name: 'DualSense controller',
        bullets: ['DualSense wireless controller', 'Seller warranty'],
      },
      'casque-vr': {
        name: 'VR headset (Meta Quest)',
        bullets: ['High-definition VR headset', 'Invoice and warranty'],
      },
      'lunettes-vr-mixte': {
        name: 'VR / mixed reality glasses',
        bullets: ['Mixed reality glasses', 'Invoice and warranty'],
      },
      'pc-gaming': {
        name: 'Gaming PC',
        bullets: ['Build on quote', 'Parts and labour warranty'],
      },
      'gta-vi-seul': {
        name: 'GTA VI only',
        bullets: ['GTA VI game'],
      },
    },
  },

  pack: {
    badge: 'The flagship pack',
    title: 'What your PS5 + GTA VI pack includes',
    lead: 'Designed for demanding enthusiasts, with no compromise on authenticity or safety.',
    items: [
      { title: 'PS5 Slim 1 TB console', body: 'Brand new, with a disc drive.' },
      { title: 'Wireless controllers', body: 'Quantity confirmed on the call. Ready to play out of the box.' },
      { title: 'GTA VI', body: 'Edition and delivery method confirmed on the call.' },
      { title: 'Invoice and seller warranty', body: 'Invoice supplied with the pack.' },
    ],
    banner: {
      badge: 'Exclusive atmosphere',
      title: 'GTA VI — Release announced for 19/11/2026',
      body:
        'Immerse yourself in the ultimate next-gen experience. The official PS5 Slim 1 TB + GTA VI pack makes sure you are ready on day one, with a phone confirmation and payment on delivery in your wilaya.',
      eventLabel: 'Major event',
      date: '19 NOVEMBER 2026',
      note: 'Reserve now to secure your pack.',
    },
  },

  reserve: {
    badge: 'Reservation',
    title: 'Reserve your pack',
    callbackDelay: 'the same day',
    note: 'The exact delivery time is confirmed to you during the confirmation call.',
    lead: 'Callback {delay}. {note}',
    whatsapp: 'WhatsApp',
    whatsappMessage: 'Hello ALMERÍAGA, PS5 info.',
    fallback: 'Form not working? Message us and we will record your request by hand.',
  },

  how: {
    badge: 'Process',
    title: 'How does it work?',
    lead: 'Four simple, secure steps with no online payment.',
    steps: [
      { title: 'Reservation', body: 'Fill in the form in a few seconds.' },
      { title: 'Confirmation call', body: 'We call you during the day to confirm the details.' },
      { title: 'Shipping', body: 'Your pack is carefully prepared and transported securely.' },
      { title: 'Payment on delivery', body: 'You inspect your parcel and pay on receipt in your wilaya.' },
    ],
  },

  simulatorPreview: {
    badge: 'Reseller tool',
    title: 'Profitability & legal cap simulator',
    lead:
      'Instantly calculate your landed costs, net margins, break-even point and compliance with the 1,800,000 DA legal cap per trip.',
    stats: [
      { label: 'Legal cap', value: '1.8M DA' },
      { label: 'Scenarios', value: '3 modes' },
      { label: 'Exchange rate', value: 'Real / Bank' },
    ],
    cta: 'Open the full simulator',
    panelLabel: 'Live preview',
    panelTitle: 'Master your micro-import',
    panelBody:
      'The simulator includes transport, ferry, customs and exchange-rate costs to give you a clear, secure view of your business.',
  },

  suppliers: {
    badge: 'Supplier space (demo)',
    title: 'Test partner directory',
    lead:
      'The real verified-supplier directory is coming soon. Below is a fictional demonstration preview.',
    all: 'All',
    categories: {
      'Consoles & Jeux': 'Consoles & games',
      'Accessoires VR': 'VR accessories',
      'Composants PC': 'PC components',
      'Électronique générale': 'General electronics',
    },
    statuses: {
      'À vérifier': 'To verify',
      'En attente d’audit': 'Pending audit',
    },
    countries: { Espagne: 'Spain' },
    notes: {
      'sup-1': 'Sample record — no real contact. Used to test the B2B directory structure.',
      'sup-2': 'Sample record — no real contact. Export licence checks under way.',
      'sup-3': 'Sample record — no real contact. Potential partner for gaming stations.',
      'sup-4': 'Sample record — no real contact. Sourcing of peripherals and accessories.',
    },
    footerNote: 'Stay informed about the verified directory launch.',
    cta: 'Join the waiting list',
  },

  tracking: {
    badge: 'Administrative information',
    title: 'Micro-importer journey & file tracking',
    lead: 'The 5 key regulatory steps to structure your business legally in Algeria.',
    step: 'Step {n}',
    steps: [
      { title: 'ANAE', body: 'Craftsperson / micro-entrepreneur card.' },
      { title: 'CASNOS', body: 'Social security affiliation for self-employed workers.' },
      { title: 'NIF / Registry', body: 'Tax and legal identification.' },
      { title: 'File preparation', body: 'Travel documents and invoices.' },
      { title: 'Visa guidance', body: 'Consular sourcing procedures.' },
    ],
    verifyTitle: 'File verification',
    placeholder: 'Tracking number (e.g. ALM-2026-XXXX)',
    soon: 'Coming soon',
    disclaimer:
      '* No guarantee of obtaining a visa or an appointment. ALMERÍAGA is not an official body.',
  },

  about: {
    badge: 'About us',
    title: 'ALMERÍAGA — Sourcing & micro-import',
    body:
      'Inspired by the sourcing hubs of Almería, {brand} connects Algerian enthusiasts and resellers with the most sought-after next-gen equipment. Founded by {seller}, a self-employed micro-importer ({city}, Algeria), we stand for full transparency, declared imports and payment on delivery.',
    anae: 'ANAE no.',
    nif: 'NIF',
    hq: 'Head office',
  },

  faq: {
    badge: 'FAQ',
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Can I pay online?',
        a: 'No. No online payment is requested. You pay directly on delivery when you receive your pack in your wilaya.',
      },
      {
        q: 'When will I be called after reserving?',
        a: 'Our team contacts you during the day to confirm your order details and plan the shipping.',
      },
      {
        q: 'Are the consoles covered by a warranty?',
        a: 'Yes, every new console comes with a 12-month seller warranty and an official invoice.',
      },
    ],
  },

  home: {
    hero: {
      eyebrow: 'Spain → Algeria',
      title: 'The other shore.',
      titleSecond: 'Within your reach.',
      lead:
        'Your products bought in Spain, handed over in Algeria. You choose, an adviser calls you back, you pay on delivery.',
      cta: 'Browse the catalogue',
      note: 'No online payment. A human confirmation.',
    },
    map: {
      label: 'Schematic route',
      spain: 'Spain',
      mediterranean: 'Mediterranean',
      algeria: 'Algeria',
      almeria: 'Almería',
      alicante: 'Alicante',
      oran: 'Oran',
      tlemcen: 'Tlemcen',
      sidi: 'Sidi Bel Abbès',
      caption: 'Almería / Alicante → Oran and western Algeria',
    },
    trust: [
      {
        kicker: '01 / Intended framework',
        title: 'Declared micro-import',
        body: 'ANAE · NIF · CASNOS · authorisation to verify.',
      },
      {
        kicker: '02 / Handover',
        title: 'Oran and its region',
        body: 'Oran, Tlemcen and Sidi Bel Abbès. Terms to be confirmed.',
      },
      {
        kicker: '03 / Transparency',
        title: 'Prices in DZD',
        body: 'Price and availability confirmed by phone.',
      },
    ],
    steps: {
      eyebrow: 'Simple, from start to handover.',
      title: 'Three steps.',
      titleSecond: 'Nothing superfluous.',
      items: [
        { number: '01', title: 'Choose.', body: 'Browse the authorised products and send your request.' },
        {
          number: '02',
          title: 'We call you back.',
          body: 'An adviser confirms the product, the price and the handover terms.',
        },
        {
          number: '03',
          title: 'Pay on delivery.',
          body: 'Pay when your product is handed over. No card online.',
        },
      ],
    },
    faq: {
      eyebrow: 'Before you start',
      title: 'Everything simple,',
      titleSecond: 'in complete clarity.',
      lead: 'Useful answers for a calm first request.',
      items: [
        {
          q: 'How do I place an order?',
          a: 'Choose a product and leave your details. An adviser calls you to confirm your request before any handover.',
        },
        {
          q: 'When and how do I pay?',
          a: 'Payment is made on delivery. No online payment and no card number is ever requested.',
        },
        {
          q: 'Where is handover possible?',
          a: 'The planned areas are Oran, Tlemcen and Sidi Bel Abbès. The place, timing and terms are confirmed with the adviser.',
        },
        {
          q: 'Are prices and availability final?',
          a: 'No. The amounts shown are examples to be replaced. The adviser confirms the DZD price and availability before you agree.',
        },
        {
          q: 'Which products can be requested?',
          a: 'Almeríaga is a multi-product platform. Only authorised products compatible with the applicable framework may be offered.',
        },
      ],
    },
    cta: {
      eyebrow: 'Your next request starts here.',
      title: 'The choice is yours.',
      lead: 'Browse the products; we take care of the confirmation.',
      button: 'Browse the catalogue',
    },
  },

  shop: {
    catalogue: {
      eyebrow: 'The selection · Spain → Algeria',
      title: 'Every need, its product.',
      lead:
        'Care, accessories or everyday essentials: a multi-product selection, without detours. Open a product page to prepare your request.',
      notice:
        'The prices shown are examples to be replaced. Availability and the DZD price will be confirmed by an adviser.',
      categoryLabel: 'Category',
      count: '4 example products',
      all: 'View all',
      categories: { personal: 'Personal care', accessories: 'Accessories', daily: 'Everyday' },
      available: 'Available',
      order: 'Made to order',
      priceNote: 'Example price · to be replaced',
      availableNote: 'Available: confirmation request possible. Made to order: prior quote, no firm price.',
      legalNote: 'Only authorised products may be offered.',
      items: {
        lisseur: { name: 'Hair straightener', price: '6,500 DZD', category: 'personal', status: 'available' },
        tondeuse: { name: 'Hair clipper', price: '9,000 DZD', category: 'personal', status: 'order' },
        ecouteurs: { name: 'Earphones pack', price: '3,500 DZD', category: 'accessories', status: 'available' },
        capsules: { name: 'Coffee capsules · pack of 50', price: '4,000 DZD', category: 'daily', status: 'order' },
      },
    },
    product: {
      breadcrumb: 'Catalogue / Personal care / Straightener',
      title: 'Hair straightener',
      price: '6,500 DZD',
      estimate: 'Estimate · example price to be replaced. Price and availability to be confirmed by phone.',
      sectionEyebrow: 'An everyday essential',
      body:
        'A hair straightener for your personal care routine, bought in Spain. The exact model, specifications and product contents must be verified and specified before publication.',
      genericBody:
        'An everyday accessory, bought in Spain. The exact model, specifications and product contents must be verified and specified before publication.',
      originLabel: 'Purchase origin',
      origin: 'Spain · Almería / Alicante',
      handoverLabel: 'Planned handover',
      handover: 'Oran, Tlemcen, Sidi Bel Abbès',
      paymentLabel: 'Payment',
      payment: 'On handover, after confirmation',
      gallery: ['Main view', 'Detail', 'Overall view'],
      requestTitle: 'Your request, simply.',
      requestLead: 'No online payment. An adviser calls you back to confirm the details.',
      submit: 'Confirm my request',
      formNote: 'Your details are only used to follow up this request. Nothing is sent in this mockup.',
      whatsapp: 'Or via WhatsApp · number to be provided',
      security:
        'No card details are entered. The request is not a confirmation: an adviser validates the details with you before handover.',
    },
    quote: {
      breadcrumb: 'Catalogue / Made to order / Example product',
      eyebrow: 'Selection to be defined · Spain',
      title: 'Your need.',
      titleSecond: 'A dedicated search.',
      lead:
        'Generic example product, with no model or brand defined. The visual and reference will be added after verification.',
      badge: 'Made to order / no firm price',
      stepsEyebrow: 'How it works',
      steps: [
        { title: 'Describe the product', body: 'Specify the reference you are looking for, quantities and useful details.' },
        {
          title: 'We check feasibility',
          body: 'The product must be authorised. Availability and terms remain to be confirmed.',
        },
        {
          title: 'You approve the quote',
          body: 'An adviser calls you back. No firm price or guaranteed lead time is shown here.',
        },
      ],
      panelTitle: 'Made-to-order product',
      panelLead:
        'Price on quote. Describe your need: we contact you to check the possibilities, with no commitment on availability.',
      requestTitle: 'Your quote request.',
      submit: 'Request a quote',
      whatsapp: 'WhatsApp · number to be provided',
      security:
        'No online payment. If confirmed, payment is made on handover under the terms agreed with the adviser.',
    },
  },

  request: {
    name: 'Name',
    namePlaceholder: 'Your full name',
    phone: 'Phone',
    phoneHint: 'Algerian mobile number. We call you back to confirm.',
    wilaya: 'Wilaya',
    wilayaPlaceholder: 'Select a wilaya',
    wilayaHint: 'Oran, Tlemcen or Sidi Bel Abbès.',
    message: 'Message (optional)',
    messagePlaceholder: 'Anything to add?',
    messageRequired: 'Your need',
    messageRequiredPlaceholder: 'Product, quantity and useful details…',
    store: 'Shop name',
    storePlaceholder: 'Your business name',
    shopType: 'Business type',
    shopTypePlaceholder: 'Choose your activity',
    volume: 'Expected volume',
    volumePlaceholder: 'Estimated quantities or frequency',
    consent:
      'I agree that my information may be used to process my request and contact me. See the legal notice.',
    sending: 'Sending',
    error: 'Something went wrong. Please try again in a moment.',
    errors: {
      name: 'Please enter your name.',
      phone: 'Enter a valid Algerian mobile number (e.g. 0550 12 34 56).',
      wilaya: 'Choose your wilaya.',
      message: 'Tell us what you need.',
      consent: 'Your consent is required to process the request.',
      store: 'Enter your shop name.',
      volume: 'Specify the expected volume.',
    },
  },

  trade: {
    gros: {
      eyebrow: 'Professionals / Wholesale',
      title: 'A need in quantity.',
      titleSecond: 'A dedicated exchange.',
      lead:
        'Tell us about your wholesale search. We study the need and the sourcing possibility in Spain, only for authorised products.',
      blockEyebrow: 'A proposal, after discussion.',
      blockTitle: 'No public pricing.',
      blockSecond: 'A need first.',
      blockLead:
        'Indicate the products, quantities and preferred handover wilaya. The adviser calls you back to clarify your request and check its feasibility.',
      bullets: [
        'Products and volumes studied case by case.',
        'Price, availability and terms subject to confirmation.',
        'No guaranteed lead time and no online payment.',
      ],
      notice:
        'This form opens a commercial discussion. It is neither a confirmed order nor a supply commitment.',
      whatsapp: 'Prefer WhatsApp · number to be provided',
      formTitle: 'Describe your need.',
      submit: 'Send my wholesale request',
    },
    revendeurs: {
      eyebrow: 'Professionals / Resellers',
      title: 'Your shop.',
      titleSecond: 'Our starting point.',
      lead:
        'Do you run a shop in Oran, Tlemcen or Sidi Bel Abbès? Present your activity to open a discussion suited to your resale needs.',
      blockEyebrow: 'A path for your business',
      steps: [
        { number: '01', title: 'Present your shop.' },
        { number: '02', title: 'Specify your activity and volumes.' },
        { number: '03', title: 'Talk with an adviser.' },
      ],
      blockLead:
        'This path differs from a one-off wholesale request. It is meant to understand your business and its resale needs, with no automatic partnership commitment.',
      notice:
        'Authorised products only. Prices, volumes, availability and terms will be studied during the discussion. No commercial condition is assumed.',
      formTitle: 'Let’s talk about your shop.',
      submit: 'Send my reseller request',
    },
  },

  contactPage: {
    eyebrow: 'Contact stays human.',
    title: 'A question? Let’s talk.',
    lead:
      'For a product, an ongoing request or a detail about handover, prepare your question and your wilaya. No online payment will ever be requested.',
    whatsappEyebrow: 'The preferred channel',
    whatsappTitle: 'WhatsApp',
    whatsappBody: 'Talk to an adviser to clarify your need.',
    whatsappCta: 'Message on WhatsApp',
    whatsappNote: 'Official number shown below.',
    emailEyebrow: 'If you prefer to write',
    emailTitle: 'Email',
    emailBody:
      'Describe your request and leave your callback details. Avoid sending sensitive documents by default.',
    emailCta: 'Contact by email',
    emailNote: 'Official address shown below.',
    algeriaEyebrow: 'Algerian side',
    algeriaTitle: 'Oran · Tlemcen · Sidi Bel Abbès',
    algeriaBody: 'The place, terms and availability are confirmed with the adviser.',
    hoursEyebrow: 'Availability',
    hoursBody: 'An adviser calls you back depending on current requests.',
    hoursNote: 'No guaranteed response time is announced.',
    notice:
      'No online payment. The contact details shown are the operator’s and can be verified before publication.',
  },

  thanks: {
    eyebrow: 'Received.',
    title: 'Thank you.',
    titleSecond: 'What follows is human.',
    body1:
      'Your request has been received. An adviser calls you to confirm the product, price and handover terms.',
    body2:
      'Keep your phone close. No payment is requested now: you pay on delivery.',
    cta: 'Back to the catalogue',
    stepsEyebrow: 'What now?',
    notice: 'No online payment. The adviser confirms price, availability and place before any agreement.',
  },

  legalPage: {
    eyebrow: 'A framework to verify, not a promise.',
    title: 'Declare. Verify. Then move forward.',
    lead:
      'Almeríaga aims for a declared micro-import activity. This page sets out the steps to verify; it certifies neither a completed registration nor a granted authorisation.',
    notice:
      'Before publication: have the ANAE, CASNOS and NIF evidence and the Ministry of Foreign Trade authorisation checked. No number or approval is provided in this mockup.',
  },

  authPage: {
    eyebrow: 'Almeríaga / your space',
    title: 'Welcome,',
    titleSecond: 'simply.',
    lead:
      'Sign in or create your account to access your Almeríaga space. No online payment here either.',
    panelTitle: 'Good to see you again.',
    panelLead: 'Choose a method to continue.',
    google: 'Continue with Google',
    or: 'or',
    phone: 'Phone',
    phonePlaceholder: 'Your number',
    phoneHint: 'International dialling code required. The code will be sent after validation.',
    email: 'Email',
    emailPlaceholder: 'Your email address',
    submit: 'Receive a code',
    signup: 'Create my account',
    note: 'The code is never sent in this mockup.',
    privacy: 'Personal data and its uses must be documented before publication.',
  },

  form: {
    name: 'Full name',
    namePlaceholder: 'e.g. Karim Benali',
    phone: 'Mobile phone',
    phonePlaceholder: '0550 12 34 56',
    phoneHint: 'We call this number to confirm.',
    wilayaRetail: 'Delivery wilaya',
    wilayaWholesale: 'Wilaya',
    wilayaWaitlist: 'Wilaya (optional)',
    choose: 'Choose…',
    unavailable: ' (not served)',
    quantity: 'Quantity',
    packOne: '{n} pack',
    packMany: '{n} packs',
    volume: 'Desired volume',
    shop: 'Shop name (optional)',
    message: 'Message / desired product',
    messagePlaceholder: 'Tell us the model, quantity or your question…',
    messageHint: 'Optional — 500 characters maximum.',
    volumes: {
      '5-9': '5 to 9 consoles',
      '10-24': '10 to 24 consoles',
      '25-49': '25 to 49 consoles',
      '50+': '50 consoles or more',
    },
    copy: {
      retail: {
        submit: 'Reserve my pack',
        sending: 'Sending…',
        footnote: 'No online payment. You pay on delivery.',
        success: 'your reservation is recorded.',
        consent:
          'I agree to be called on the number provided for this reservation. My data is only used to process my request.',
      },
      wholesale: {
        submit: 'Request a callback',
        sending: 'Sending…',
        footnote: 'No commitment. We call you to discuss volumes and terms.',
        success: 'your callback request is recorded.',
        consent:
          'I agree to be called on the number provided for this request. My data is only used to process my request.',
      },
      waitlist: {
        submit: 'Notify me',
        sending: 'Sending…',
        footnote: 'No commitment.',
        success: 'you are on the list.',
        consent:
          'I agree to be contacted on the number provided. My data is only used to process my request.',
      },
    },
    thanks: 'Thank you',
    thanksWithName: 'Thank you, {name}',
    thanksSeparator: ', ',
    successBody: 'We will call you on {phone} during the day. Keep your phone handy.',
    successNoPayment: 'No payment is requested before delivery.',
    errorGeneral: 'Something went wrong. Please try again in a moment.',
    errorNetwork: 'The connection failed. Check your network and try again.',
    errorWhatsapp: 'Message us on WhatsApp',
    errors: {
      nameRequired: 'Please enter your name.',
      nameInvalid: 'Enter a valid name (letters only).',
      phoneInvalid: 'Enter a valid Algerian mobile number (e.g. 0550 12 34 56).',
      wilayaRequired: 'Choose your wilaya.',
      wilayaUnavailable: 'This wilaya is not served at the moment.',
      quantity: 'Choose a quantity between 1 and {max}.',
      volume: 'Choose a volume.',
      shop: 'Enter a valid shop name.',
      consent: 'Your consent is required for us to call you.',
    },
    whatsappRetailMessage: 'Hello ALMERÍAGA, I would like to reserve the {product}.',
    whatsappWholesaleMessage: 'Hello ALMERÍAGA, I would like to buy wholesale.',
  },

  footer: {
    role: 'Self-employed · Micro-importer',
    anae: 'ANAE no.',
    nif: 'NIF',
    city: 'Algeria',
    navTitle: 'Navigation',
    contactTitle: 'Contact by department',
    poles: {
      general: 'General',
      orders: 'Orders',
      wholesale: 'Resellers',
      suppliers: 'Suppliers',
      support: 'Support',
    },
    whatsappMessage: 'Hello ALMERÍAGA, I have a question.',
    rights: 'All rights reserved.',
    legal: 'Legal notice',
    tagline:
      'A simple link between Spain and Algeria. Authorised products, a human confirmation and payment on delivery.',
    twoShores: 'Two shores, one link.',
    route: 'Almería · Alicante → Oran',
    routeCities: 'Tlemcen · Sidi Bel Abbès',
    noPayment: 'No online payment.',
    copyright: '© Almeríaga — Spain → Algeria',
    legalNote: 'Micro-import · Algeria',
    trademarks:
      'PlayStation and PS5 are trademarks of Sony Interactive Entertainment; ALMERÍAGA is not affiliated with Sony. Grand Theft Auto is a trademark of Take-Two Interactive.',
  },

  pages: {
    gros: {
      badge: 'B2B space / Resellers',
      title: 'Wholesale supply',
      titleAccent: 'البيع بالجملة',
      lead:
        'Do you own a video game shop or work as a reseller? Enjoy preferential terms and a direct, regular supply.',
      features: [
        {
          title: 'Tiered pricing',
          body: 'Attractive margins for partner shops based on ordered volumes (from 5 units).',
        },
        {
          title: 'Verified products',
          body: 'Brand-new original consoles, boxed and guaranteed. Traceability and compliance assured.',
        },
        {
          title: 'Dedicated follow-up',
          body: 'A single contact for your orders, delivery schedules and logistics questions.',
        },
      ],
      formBadge: 'B2B callback',
      formTitle: 'Request a callback',
      formAccent: 'طلب اتصال',
      formLead: 'Leave your details and expected volume.',
      contactLabel: 'Direct contact',
      whatsappMessage: 'Hello ALMERÍAGA, I am a reseller and would like wholesale information.',
    },
    suppliers: {
      badge: 'Coming soon',
      title: 'Supplier & micro-importer space',
      titleAccent: 'فضاء الموردين',
      lead:
        'Practical guides (ANAE, CASNOS, customs), a sourcing directory and best practices to run your micro-import legally.',
      cards: [
        {
          title: 'ANAE / CASNOS guides',
          body: 'All the administrative steps to declare your self-employed activity without ambiguity.',
        },
        {
          title: 'Verified directory',
          body: 'A list of trusted contacts and wholesalers tested in the field.',
        },
        {
          title: 'Message templates',
          body: 'Professional scripts to negotiate and communicate effectively with suppliers abroad.',
        },
        {
          title: 'Travel & visa checklist',
          body: 'Logistics advice and trip preparation. (No visa appointment sales or fake invitations).',
        },
      ],
      formBadge: 'Waiting list',
      formTitle: 'Get notified at launch',
      formAccent: 'سجل الآن',
      formLead: 'Sign up to receive access as soon as the resources open.',
      contactLabel: 'Contact',
      whatsappMessage: 'Hello ALMERÍAGA, I would like to know more about the supplier space.',
    },
    catalogue: {
      eyebrow: 'Catalogue',
      title: 'Sourcing in Spain, delivery in Algeria',
      subtitle: 'Your trusted partner for Spain-Algeria import and logistics',
    },
    legal: {
      badge: 'Compliance',
      intro: 'Mandatory information under applicable law.',
      eyebrow: 'Transparency / working document',
      title: 'Legal notice.',
      lead: 'A complete reading structure, to be filled in and checked before publication. Bracketed fields are not verified legal information.',
      notice: 'Incomplete document for publication. No compliance is asserted: the operator’s details and evidence have not been provided.',
    },
  },

  catalogGrid: {
    filterLabel: 'Filter by category',
    all: 'All',
    categories: {
      'High-Tech': 'High-tech',
      'Beauté & Soins': 'Beauty & care',
      'Café & Épicerie': 'Coffee & groceries',
      Parfums: 'Perfumes',
      Accessoires: 'Accessories',
    },
    mockNote: 'Indicative prices to be confirmed on the call. The products shown are examples.',
    visualSoon: 'Image coming soon',
    onOrder: 'Made to order',
    spain: 'Spain',
    delivered: 'Delivered to Algeria (est.)',
    minimum: 'Minimum {n} units',
    cta: 'Simulate margin & order wholesale',
    empty: 'No products in this category at the moment.',
    profit: {
      eyebrow: 'Indicative simulation',
      quantity: 'Quantity',
      minHint: 'Minimum {n} units',
      sellPrice: 'Target selling price (DZD / unit)',
      belowMin: 'Quantity below the minimum order.',
      capOver: 'Over the 1,800,000 DA cap',
      capNear: 'Near the cap (over 90 %)',
      capUnder: 'Under the 1,800,000 DA cap',
      declared: 'Estimated declared value: {value} (rate {rate} DA/€, indicative).',
      totalCost: 'Total landed cost',
      totalRevenue: 'Total revenue',
      netMargin: 'Net margin',
      margin: 'Margin',
      disclaimer: 'Indicative, non-contractual estimate. Excludes delivery costs, returns and advertising.',
      cta: 'Order wholesale',
    },
  },

  simulator: {
    badge: 'Official simulator',
    title: 'Profitability simulator',
    titleAccent: 'محاكي الربحية',
    lead: 'Estimate your costs and margins per trip (legal cap 1,800,000 DA).',
    reset: 'Reset',
    paramsTitle: 'Main parameters',
    labels: {
      bankRate: 'Bank rate (DZD/€)',
      realRate: 'Real rate (DZD/€)',
      unitPrice: 'Unit purchase price (€)',
      quantity: 'Quantity',
      sellDetail: 'Retail selling price (DZD)',
      ferry: 'Ferry & trip (€)',
      packGame: 'Game / GTA VI cost (DZD)',
      packControllers: 'Extra controllers cost (DZD)',
      packOther: 'Other accessories (DZD)',
    },
    packTitle: 'Retail pack costs (DZD)',
    summary: 'Summary',
    overCap: '⚠️ Over 1.8M DA',
    compliant: '✓ Within 1.8M DA',
    declaredValue: 'Declared value',
    unitCost: 'Landed cost',
    fixedCosts: 'Total fixed costs',
    chartTitle: 'Costs vs revenue comparison (retail scenario)',
    chartHandmade: 'Hand-made SVG',
    costsTotal: 'Total costs',
    revenue: 'Revenue',
    scenarios: 'Scenarios',
    roi: 'ROI: {value}',
    threshold: 'Break-even: {value}',
    unitShort: '{n} u',
    disclaimer:
      '* Indicative, non-contractual estimate. Margins before delivery costs, returns, advertising, and the cost of the pack game/controllers.',
    scenarioLabels: { superGros: 'Super wholesale', gros: 'Wholesale', detail: 'Retail' },
  },

  api: {
    forbidden: 'Unauthorised origin.',
    invalidFormat: 'Invalid request format.',
    invalidRequest: 'Invalid request.',
    unreadable: 'Unreadable request.',
    tooLarge: 'Request too large.',
    rateLimited: 'Too many attempts. Please try again in a few minutes.',
    tooFast: 'Please try again in a moment.',
    validationSummary: 'Some fields are invalid.',
    misconfigured: 'Service temporarily unavailable.',
    upstream: 'We could not record your request. Message us on WhatsApp.',
  },
} satisfies Dictionary;
