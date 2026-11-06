import type { Dictionary } from '@/lib/i18n/types';

export const es = {
  nav: {
    home: 'Inicio',
    homeLabel: 'inicio',
    products: 'Productos',
    catalogue: 'Catálogo',
    simulator: 'Simulador',
    suppliers: 'Proveedores',
    tracking: 'Seguimiento',
    about: 'Nosotros',
    legal: 'Marco legal',
    contact: 'Contacto',
    wholesale: 'Mayoristas / revendedores',
    supplierSpace: 'Espacio proveedores',
    login: 'Iniciar sesión',
    reserve: 'Encargar',
    reservePack: 'Reservar mi pack',
    whatsapp: 'Hablar por WhatsApp',
    menuOpen: 'Abrir el menú',
    menuClose: 'Cerrar el menú',
    mainNav: 'Navegación principal',
    mobileNav: 'Navegación móvil',
    whatsappMessage: 'Hola ALMERÍAGA, tengo una pregunta.',
  },

  language: {
    label: 'Idioma',
    choose: 'Elegir idioma',
    current: 'Idioma actual',
    hybridNote: 'Francés + árabe argelino',
    switching: 'Cambiando de idioma…',
  },

  common: {
    brandTagline: 'Global sourcing y microimportación',
    priceOnRequest: 'Precio bajo consulta',
    warranty: 'Garantía de {months} meses',
    warrantyShort: 'Garantía {months}m',
    callback: 'Solicitar una llamada',
    close: 'Cerrar',
    all: 'Todos',
    whatsapp: 'WhatsApp',
    required: 'Campo obligatorio',
    noOnlinePayment: 'Sin pago en línea',
  },

  hero: {
    badge: 'Disponible por reserva — Sourcing directo desde España',
    title: 'De España a tu puerta.',
    titleAccent: 'من إسبانيا إلى باب منزلك',
    subtitle:
      'Global sourcing y microimportación de alta precisión. Reserva tu pack PS5 Slim + GTA VI con total tranquilidad y paga a la entrega en tu wilaya.',
    ctaProducts: 'Ver los productos',
    ctaCallback: 'Solicitar una llamada',
    whatsapp: 'WhatsApp directo',
    trust: ['Importación declarada', 'Factura y garantía', 'Pago a la entrega'],
    route: {
      eyebrow: 'Sourcing internacional y logística',
      corridor: 'Almería → Orán → Argel',
      spain: 'ESPAÑA',
      algeria: 'ARGELIA',
      almeria: 'Almería',
      oran: 'Orán',
      alger: 'Argel',
      bullets: ['Sourcing directo Almería', 'Travesía marítima segura', 'Entrega a domicilio (wilaya)'],
    },
    whatsappMessage: 'Hola ALMERÍAGA, quiero reservar el pack PS5 Slim + GTA VI.',
  },

  products: {
    badge: 'Catálogo',
    title: 'Nuestros productos y equipos',
    lead:
      'Selección rigurosa de consolas, cascos VR, PC gaming y accesorios. Disponibilidad transparente y precio bajo consulta.',
    availability: {
      PreOrder: 'Disponible por reserva',
      OnDemand: 'Bajo pedido',
      OnQuote: 'Bajo presupuesto',
      AtRelease: 'Disponible en el lanzamiento',
      InStock: 'En stock',
    },
    items: {
      'ps5-slim-1to-gta6': {
        name: 'Pack PS5 Slim 1 TB + GTA VI',
        bullets: ['Consola PS5 Slim 1 TB', 'Mandos inalámbricos', 'GTA VI', 'Factura y garantía del vendedor'],
      },
      'ps5-edition-speciale': {
        name: 'PS5 Edición especial',
        bullets: ['Consola Edición Especial', 'Mando a juego', 'Factura y garantía'],
      },
      'manette-dualsense': {
        name: 'Mando DualSense',
        bullets: ['Mando inalámbrico DualSense', 'Garantía del vendedor'],
      },
      'casque-vr': {
        name: 'Casco VR (Meta Quest)',
        bullets: ['Casco VR de alta definición', 'Factura y garantía'],
      },
      'lunettes-vr-mixte': {
        name: 'Gafas VR / realidad mixta',
        bullets: ['Gafas de realidad mixta', 'Factura y garantía'],
      },
      'pc-gaming': {
        name: 'PC gaming',
        bullets: ['Configuración bajo presupuesto', 'Garantía de piezas y mano de obra'],
      },
      'gta-vi-seul': {
        name: 'GTA VI solo',
        bullets: ['Juego GTA VI'],
      },
    },
  },

  pack: {
    badge: 'El pack estrella',
    title: 'Qué incluye tu pack PS5 + GTA VI',
    lead: 'Diseñado para aficionados exigentes, sin concesiones en autenticidad y seguridad.',
    items: [
      { title: 'Consola PS5 Slim 1 TB', body: 'Nueva, con lector de discos.' },
      { title: 'Mandos inalámbricos', body: 'Cantidad confirmada por teléfono. Listo para jugar al abrirlo.' },
      { title: 'GTA VI', body: 'Edición y entrega confirmadas por teléfono.' },
      { title: 'Factura y garantía del vendedor', body: 'Factura entregada con el pack.' },
    ],
    banner: {
      badge: 'Ambiente exclusivo',
      title: 'GTA VI — Lanzamiento anunciado el 19/11/2026',
      body:
        'Sumérgete en la experiencia next-gen definitiva. El pack oficial PS5 Slim 1 TB + GTA VI te asegura estar listo el día del lanzamiento, con confirmación telefónica y pago a la entrega en tu wilaya.',
      eventLabel: 'Evento destacado',
      date: '19 DE NOVIEMBRE DE 2026',
      note: 'Reserva ahora para asegurar tu pack.',
    },
  },

  reserve: {
    badge: 'Reserva',
    title: 'Reservar tu pack',
    callbackDelay: 'en el día',
    note: 'El plazo de entrega exacto se te comunica en la llamada de confirmación.',
    lead: 'Llamada {delay}. {note}',
    whatsapp: 'WhatsApp',
    whatsappMessage: 'Hola ALMERÍAGA, información sobre la PS5.',
    fallback: '¿El formulario no funciona? Escríbenos y registramos tu solicitud manualmente.',
  },

  how: {
    badge: 'Proceso',
    title: '¿Cómo funciona?',
    lead: 'Cuatro pasos sencillos, seguros y sin pago en línea.',
    steps: [
      { title: 'Reserva', body: 'Completa el formulario en unos segundos.' },
      { title: 'Llamada de confirmación', body: 'Te llamamos durante el día para validar los detalles.' },
      { title: 'Envío', body: 'Preparamos tu pack con cuidado y lo transportamos de forma segura.' },
      { title: 'Pago a la entrega', body: 'Revisas tu paquete y pagas al recibirlo en tu wilaya.' },
    ],
  },

  simulatorPreview: {
    badge: 'Herramienta para revendedores',
    title: 'Simulador de rentabilidad y límites',
    lead:
      'Calcula al instante tus costes, márgenes netos, punto de equilibrio y el cumplimiento del límite legal de 1 800 000 DA por viaje.',
    stats: [
      { label: 'Límite legal', value: '1,8 M DA' },
      { label: 'Escenarios', value: '3 modos' },
      { label: 'Tipo de cambio', value: 'Real / Banco' },
    ],
    cta: 'Abrir el simulador completo',
    panelLabel: 'Vista directa',
    panelTitle: 'Domina tu microimportación',
    panelBody:
      'El simulador integra transporte, ferry, aduanas y tipo de cambio para darte una visión clara y segura de tu actividad.',
  },

  suppliers: {
    badge: 'Espacio proveedores (demo)',
    title: 'Directorio de prueba de socios',
    lead:
      'El directorio real de proveedores verificados llegará pronto. Descubre abajo una vista ficticia de demostración.',
    all: 'Todos',
    categories: {
      'Consoles & Jeux': 'Consolas y juegos',
      'Accessoires VR': 'Accesorios VR',
      'Composants PC': 'Componentes PC',
      'Électronique générale': 'Electrónica general',
    },
    statuses: {
      'À vérifier': 'Por verificar',
      'En attente d’audit': 'Pendiente de auditoría',
    },
    countries: { Espagne: 'España' },
    notes: {
      'sup-1': 'Ficha de ejemplo — sin contacto real. Destinada a probar la estructura del directorio B2B.',
      'sup-2': 'Ficha de ejemplo — sin contacto real. Verificación de licencias de exportación en curso.',
      'sup-3': 'Ficha de ejemplo — sin contacto real. Socio potencial para estaciones de juego.',
      'sup-4': 'Ficha de ejemplo — sin contacto real. Sourcing de periféricos y accesorios.',
    },
    footerNote: 'Mantente informado del lanzamiento del directorio verificado.',
    cta: 'Apuntarme a la lista de espera',
  },

  tracking: {
    badge: 'Información administrativa',
    title: 'Itinerario y seguimiento del expediente de microimportador',
    lead: 'Las 5 etapas clave para estructurar tu actividad con total legalidad en Argelia.',
    step: 'Etapa {n}',
    steps: [
      { title: 'ANAE', body: 'Tarjeta de artesano / microempresario.' },
      { title: 'CASNOS', body: 'Afiliación a la seguridad social de no asalariados.' },
      { title: 'NIF / Registro', body: 'Identificación fiscal y legal.' },
      { title: 'Preparación del expediente', body: 'Justificantes de viaje y facturas.' },
      { title: 'Orientación para el visado', body: 'Trámites consulares de sourcing.' },
    ],
    verifyTitle: 'Verificación de expediente',
    placeholder: 'Número de seguimiento (ej.: ALM-2026-XXXX)',
    soon: 'Próximamente',
    disclaimer:
      '* Sin garantía de obtención de visado o cita. ALMERÍAGA no es un organismo oficial.',
  },

  about: {
    badge: 'Sobre nosotros',
    title: 'ALMERÍAGA — Sourcing y microimportación',
    body:
      'Inspirado en los hubs de sourcing de Almería, {brand} conecta a los aficionados y revendedores argelinos con los equipos next-gen más buscados. Fundado por {seller}, microempresario importador ({city}, Argelia), defendemos la transparencia total, la importación declarada y el pago a la entrega.',
    anae: 'N.º ANAE',
    nif: 'NIF',
    hq: 'Sede',
  },

  faq: {
    badge: 'FAQ',
    title: 'Preguntas frecuentes',
    items: [
      {
        q: '¿El pago se hace en línea?',
        a: 'No. No se solicita ningún pago en línea. Pagas directamente a la entrega cuando recibes tu pack en tu wilaya.',
      },
      {
        q: '¿Cuándo me llamarán tras la reserva?',
        a: 'Nuestro equipo te contacta durante el día para confirmar los detalles del pedido y planificar el envío.',
      },
      {
        q: '¿Las consolas tienen garantía?',
        a: 'Sí, cada consola nueva incluye una garantía del vendedor de 12 meses con factura oficial.',
      },
    ],
  },

  home: {
    hero: {
      eyebrow: 'España → Argelia',
      title: 'La otra orilla.',
      titleSecond: 'A tu alcance.',
      lead:
        'Tus productos comprados en España, entregados en Argelia. Tú eliges, un asesor te llama y pagas en la entrega.',
      cta: 'Descubrir el catálogo',
      note: 'Sin pago en línea. Una confirmación humana.',
    },
    map: {
      label: 'Itinerario esquemático',
      spain: 'España',
      mediterranean: 'Mediterráneo',
      algeria: 'Argelia',
      almeria: 'Almería',
      alicante: 'Alicante',
      oran: 'Orán',
      tlemcen: 'Tremecén',
      sidi: 'Sidi Bel Abbes',
      caption: 'Almería / Alicante → Orán y el oeste argelino',
    },
    trust: [
      {
        kicker: '01 / Marco previsto',
        title: 'Microimportación declarada',
        body: 'ANAE · NIF · CASNOS · autorización por verificar.',
      },
      {
        kicker: '02 / Entrega',
        title: 'Orán y su región',
        body: 'Orán, Tremecén y Sidi Bel Abbes. Modalidades por confirmar.',
      },
      {
        kicker: '03 / Transparencia',
        title: 'Precios en DZD',
        body: 'Precio y disponibilidad confirmados por teléfono.',
      },
    ],
    steps: {
      eyebrow: 'Simple, del inicio a la entrega.',
      title: 'Tres pasos.',
      titleSecond: 'Nada superfluo.',
      items: [
        { number: '01', title: 'Elige.', body: 'Explora los productos autorizados y envía tu solicitud.' },
        {
          number: '02',
          title: 'Te llamamos.',
          body: 'Un asesor confirma el producto, el precio y las modalidades de entrega.',
        },
        {
          number: '03',
          title: 'Paga en la entrega.',
          body: 'Paga al recibir tu producto. Ninguna tarjeta bancaria en línea.',
        },
      ],
    },
    faq: {
      eyebrow: 'Antes de empezar',
      title: 'Todo simple,',
      titleSecond: 'con total claridad.',
      lead: 'Las respuestas útiles para una primera solicitud serena.',
      items: [
        {
          q: '¿Cómo hacer un pedido?',
          a: 'Elige un producto y deja tus datos. Un asesor te llama para confirmar tu solicitud antes de cualquier entrega.',
        },
        {
          q: '¿Cuándo y cómo se paga?',
          a: 'El pago se realiza en la entrega. No se solicita ningún pago en línea ni número de tarjeta bancaria.',
        },
        {
          q: '¿Dónde es posible la entrega?',
          a: 'Las zonas previstas son Orán, Tremecén y Sidi Bel Abbes. El lugar, el plazo y las modalidades se confirman con el asesor.',
        },
        {
          q: '¿Los precios y la disponibilidad son definitivos?',
          a: 'No. Los importes mostrados son ejemplos a sustituir. El asesor confirma el precio en DZD y la disponibilidad antes de tu acuerdo.',
        },
        {
          q: '¿Qué productos se pueden pedir?',
          a: 'Almeríaga es una plataforma multiproducto. Solo pueden proponerse productos autorizados y compatibles con el marco aplicable.',
        },
      ],
    },
    cta: {
      eyebrow: 'Tu próxima solicitud empieza aquí.',
      title: 'Ahora te toca elegir.',
      lead: 'Descubre los productos, nosotros nos ocupamos de la confirmación.',
      button: 'Descubrir el catálogo',
    },
  },

  shop: {
    catalogue: {
      eyebrow: 'La selección · España → Argelia',
      title: 'Cada necesidad, su producto.',
      lead:
        'Cuidado, accesorios o día a día: una selección multiproducto, sin rodeos. Entra en una ficha para preparar tu solicitud.',
      notice:
        'Los precios mostrados son ejemplos a sustituir. La disponibilidad y el precio en DZD serán confirmados por un asesor.',
      categoryLabel: 'Categoría',
      count: '4 productos de ejemplo',
      all: 'Ver todo',
      categories: { personal: 'Cuidado personal', accessories: 'Accesorios', daily: 'Día a día' },
      available: 'Disponible',
      order: 'Bajo pedido',
      priceNote: 'Precio de ejemplo · a sustituir',
      availableNote: 'Disponible: solicitud de confirmación posible. Bajo pedido: presupuesto previo, sin precio firme.',
      legalNote: 'Solo pueden proponerse productos autorizados.',
      items: {
        lisseur: { name: 'Plancha de pelo', price: '6 500 DZD', category: 'personal', status: 'available' },
        tondeuse: { name: 'Cortapelos', price: '9 000 DZD', category: 'personal', status: 'order' },
        ecouteurs: { name: 'Pack de auriculares', price: '3 500 DZD', category: 'accessories', status: 'available' },
        capsules: { name: 'Cápsulas de café · lote de 50', price: '4 000 DZD', category: 'daily', status: 'order' },
      },
    },
    product: {
      breadcrumb: 'Catálogo / Cuidado personal / Plancha',
      title: 'Plancha de pelo',
      price: '6 500 DZD',
      estimate: 'Estimación · precio de ejemplo a sustituir. Precio y disponibilidad a confirmar por teléfono.',
      sectionEyebrow: 'Un esencial del día a día',
      body:
        'Una plancha para tu rutina de cuidado personal, comprada en España. El modelo, las características exactas y el contenido del producto deben verificarse y precisarse antes de su publicación.',
      genericBody:
        'Un accesorio de uso diario, comprado en España. El modelo, las características exactas y el contenido del producto deben verificarse y precisarse antes de su publicación.',
      originLabel: 'Origen de compra',
      origin: 'España · Almería / Alicante',
      handoverLabel: 'Entrega prevista',
      handover: 'Orán, Tremecén, Sidi Bel Abbes',
      paymentLabel: 'Pago',
      payment: 'En la entrega, tras confirmación',
      gallery: ['Vista principal', 'Detalle', 'Vista general'],
      requestTitle: 'Tu solicitud, simplemente.',
      requestLead: 'Sin pago en línea. Un asesor te llama para confirmar los detalles.',
      submit: 'Confirmar mi solicitud',
      formNote: 'Tus datos solo sirven para el seguimiento de esta solicitud. No se realiza ningún envío en esta maqueta.',
      whatsapp: 'O por WhatsApp · número por indicar',
      security:
        'No se introduce ningún dato de tarjeta. La solicitud no equivale a confirmación: un asesor valida los detalles contigo antes de la entrega.',
    },
    quote: {
      breadcrumb: 'Catálogo / Bajo pedido / Producto ejemplo',
      eyebrow: 'Selección por definir · España',
      title: 'Tu necesidad.',
      titleSecond: 'Una búsqueda dedicada.',
      lead:
        'Producto genérico de ejemplo, sin modelo ni marca definidos. La imagen y la referencia se añadirán tras verificación.',
      badge: 'Bajo pedido / sin precio firme',
      stepsEyebrow: 'Cómo funciona',
      steps: [
        { title: 'Describe el producto', body: 'Indica la referencia buscada, las cantidades y los detalles útiles.' },
        {
          title: 'Verificamos la viabilidad',
          body: 'El producto debe estar autorizado. La disponibilidad y las modalidades quedan por confirmar.',
        },
        {
          title: 'Validas el presupuesto',
          body: 'Un asesor te llama. Aquí no se muestra ningún precio firme ni plazo garantizado.',
        },
      ],
      panelTitle: 'Producto bajo pedido',
      panelLead:
        'Precio bajo presupuesto. Describe tu necesidad: te contactamos para verificar las posibilidades, sin compromiso de disponibilidad.',
      requestTitle: 'Tu solicitud de presupuesto.',
      submit: 'Solicitar presupuesto',
      whatsapp: 'WhatsApp · número por indicar',
      security:
        'Sin pago en línea. En caso de confirmación, el pago se realiza en la entrega según las modalidades acordadas con el asesor.',
    },
  },

  request: {
    name: 'Nombre',
    namePlaceholder: 'Tu nombre completo',
    phone: 'Teléfono',
    phoneHint: 'Número móvil argelino. Te llamamos para confirmar.',
    wilaya: 'Wilaya',
    wilayaPlaceholder: 'Seleccionar una wilaya',
    wilayaHint: 'Orán, Tremecén o Sidi Bel Abbes.',
    message: 'Mensaje (opcional)',
    messagePlaceholder: '¿Un detalle que compartir?',
    messageRequired: 'Tu necesidad',
    messageRequiredPlaceholder: 'Producto, cantidad y detalles útiles…',
    store: 'Nombre de la tienda',
    storePlaceholder: 'Tu enseña',
    shopType: 'Tipo de comercio',
    shopTypePlaceholder: 'Elegir tu actividad',
    volume: 'Volumen previsto',
    volumePlaceholder: 'Cantidades o frecuencia estimadas',
    consent:
      'Acepto que mis datos se utilicen para tratar mi solicitud y contactarme. Ver el aviso legal.',
    sending: 'Enviando',
    error: 'Se ha producido un error. Inténtalo de nuevo en un momento.',
    errors: {
      name: 'Indica tu nombre.',
      phone: 'Introduce un móvil argelino válido (ej.: 0550 12 34 56).',
      wilaya: 'Elige tu wilaya.',
      message: 'Indica tu necesidad.',
      consent: 'Tu consentimiento es necesario para tratar la solicitud.',
      store: 'Indica el nombre de tu tienda.',
      volume: 'Precisa el volumen previsto.',
    },
  },

  trade: {
    gros: {
      eyebrow: 'Profesionales / Mayorista',
      title: 'Una necesidad en cantidad.',
      titleSecond: 'Un intercambio dedicado.',
      lead:
        'Cuéntanos tu búsqueda al por mayor. Estudiamos la necesidad y la posibilidad de suministro en España, solo para productos autorizados.',
      blockEyebrow: 'Una propuesta, tras el intercambio.',
      blockTitle: 'Sin tarifa pública.',
      blockSecond: 'Primero, una necesidad.',
      blockLead:
        'Indica los productos, las cantidades y la wilaya de entrega deseada. El asesor te llama para precisar tu solicitud y verificar su viabilidad.',
      bullets: [
        'Productos y volúmenes a estudiar caso por caso.',
        'Precio, disponibilidad y modalidades sujetos a confirmación.',
        'Sin plazo garantizado y sin pago en línea.',
      ],
      notice:
        'Este formulario abre un intercambio comercial. No constituye un pedido confirmado ni un compromiso de suministro.',
      whatsapp: 'Preferir WhatsApp · número por indicar',
      formTitle: 'Describe tu necesidad.',
      submit: 'Enviar mi solicitud mayorista',
    },
    revendeurs: {
      eyebrow: 'Profesionales / Revendedores',
      title: 'Tu comercio.',
      titleSecond: 'Nuestro punto de partida.',
      lead:
        '¿Tienes una tienda en Orán, Tremecén o Sidi Bel Abbes? Presenta tu actividad para abrir un intercambio adaptado a tu necesidad de reventa.',
      blockEyebrow: 'Un recorrido para tu actividad',
      steps: [
        { number: '01', title: 'Presenta tu tienda.' },
        { number: '02', title: 'Precisa tu actividad y tus volúmenes.' },
        { number: '03', title: 'Habla con un asesor.' },
      ],
      blockLead:
        'Este recorrido es distinto de una solicitud de compra al por mayor puntual. Sirve para entender tu comercio y sus necesidades de reventa, sin compromiso automático de asociación.',
      notice:
        'Solo productos autorizados. Tarifas, volúmenes, disponibilidad y condiciones se estudiarán durante el intercambio. Ninguna condición comercial se presume adquirida.',
      formTitle: 'Hablemos de tu comercio.',
      submit: 'Enviar mi solicitud revendedor',
    },
  },

  contactPage: {
    eyebrow: 'El contacto sigue siendo humano.',
    title: '¿Una pregunta? Hablemos.',
    lead:
      'Para un producto, una solicitud en curso o una precisión sobre la entrega, prepara tu pregunta y tu wilaya. No se te pedirá ningún pago en línea.',
    whatsappEyebrow: 'El canal preferente',
    whatsappTitle: 'WhatsApp',
    whatsappBody: 'Habla con un asesor para precisar tu necesidad.',
    whatsappCta: 'Escribir por WhatsApp',
    whatsappNote: 'Número oficial mostrado abajo.',
    emailEyebrow: 'Si prefieres escribir',
    emailTitle: 'Correo electrónico',
    emailBody:
      'Describe tu solicitud e indica tus datos de contacto. Evita enviar documentos sensibles por defecto.',
    emailCta: 'Contactar por correo',
    emailNote: 'Dirección oficial mostrada abajo.',
    algeriaEyebrow: 'Lado argelino',
    algeriaTitle: 'Orán · Tremecén · Sidi Bel Abbes',
    algeriaBody: 'El lugar, las modalidades y la disponibilidad se confirman con el asesor.',
    hoursEyebrow: 'Disponibilidad',
    hoursBody: 'Un asesor te llama según las solicitudes en curso.',
    hoursNote: 'No se anuncia ningún plazo de respuesta garantizado.',
    notice:
      'Sin pago en línea. Los datos mostrados son los del operador y pueden verificarse antes de la publicación.',
  },

  thanks: {
    eyebrow: 'Bien recibido.',
    title: 'Gracias.',
    titleSecond: 'Lo que sigue es humano.',
    body1:
      'Tu solicitud ha sido recibida. Un asesor te llama para confirmar el producto, el precio y las modalidades de entrega.',
    body2:
      'Mantén el teléfono a mano. No se pide ningún pago ahora: pagas en la entrega.',
    cta: 'Volver al catálogo',
    stepsEyebrow: '¿Y ahora?',
    notice: 'Sin pago en línea. El asesor confirma precio, disponibilidad y lugar antes de cualquier acuerdo.',
  },

  legalPage: {
    eyebrow: 'Un marco por verificar, no una promesa.',
    title: 'Declarar. Verificar. Y avanzar.',
    lead:
      'Almeríaga aspira a una actividad de microimportación declarada. Esta página presenta los trámites a verificar; no certifica ninguna inscripción obtenida ni autorización concedida.',
    notice:
      'Antes de publicar: hacer controlar los justificantes ANAE, CASNOS, NIF y la autorización del Ministerio de Comercio Exterior. No se facilita ningún número ni acreditación en esta maqueta.',
  },

  authPage: {
    eyebrow: 'Almeríaga / tu espacio',
    title: 'Bienvenido,',
    titleSecond: 'simplemente.',
    lead:
      'Inicia sesión o crea tu cuenta para acceder a tu espacio Almeríaga. Aquí tampoco hay pago en línea.',
    panelTitle: 'Nos alegra verte de nuevo.',
    panelLead: 'Elige un método para continuar.',
    google: 'Continuar con Google',
    or: 'o',
    phone: 'Teléfono',
    phonePlaceholder: 'Tu número',
    phoneHint: 'Se requiere prefijo internacional. El código se enviará tras la validación.',
    email: 'Correo electrónico',
    emailPlaceholder: 'Tu dirección de correo',
    submit: 'Recibir un código',
    signup: 'Crear mi cuenta',
    note: 'El código nunca se envía en esta maqueta.',
    privacy: 'Los datos personales y sus usos deben documentarse antes de la publicación.',
  },

  form: {
    name: 'Nombre completo',
    namePlaceholder: 'Ej.: Karim Benali',
    phone: 'Teléfono móvil',
    phonePlaceholder: '0550 12 34 56',
    phoneHint: 'Te llamamos a este número para confirmar.',
    wilayaRetail: 'Wilaya de entrega',
    wilayaWholesale: 'Wilaya',
    wilayaWaitlist: 'Wilaya (opcional)',
    choose: 'Elegir…',
    unavailable: ' (no cubierta)',
    quantity: 'Cantidad',
    packOne: '{n} pack',
    packMany: '{n} packs',
    volume: 'Volumen deseado',
    shop: 'Nombre de la tienda (opcional)',
    message: 'Mensaje / producto deseado',
    messagePlaceholder: 'Indica el modelo, la cantidad o tu pregunta…',
    messageHint: 'Opcional — 500 caracteres como máximo.',
    volumes: {
      '5-9': '5 a 9 consolas',
      '10-24': '10 a 24 consolas',
      '25-49': '25 a 49 consolas',
      '50+': '50 consolas o más',
    },
    copy: {
      retail: {
        submit: 'Reservar mi pack',
        sending: 'Enviando…',
        footnote: 'Sin pago en línea. Pagas a la entrega.',
        success: 'tu reserva ha quedado registrada.',
        consent:
          'Acepto que me llamen al número indicado para esta reserva. Mis datos solo se usan para gestionar mi solicitud.',
      },
      wholesale: {
        submit: 'Solicitar una llamada',
        sending: 'Enviando…',
        footnote: 'Sin compromiso. Te llamamos para hablar de volúmenes y condiciones.',
        success: 'tu solicitud de llamada ha quedado registrada.',
        consent:
          'Acepto que me llamen al número indicado para esta solicitud. Mis datos solo se usan para gestionar mi solicitud.',
      },
      waitlist: {
        submit: 'Avisadme',
        sending: 'Enviando…',
        footnote: 'Sin compromiso.',
        success: 'estás en la lista.',
        consent:
          'Acepto que me contacten al número indicado. Mis datos solo se usan para gestionar mi solicitud.',
      },
    },
    thanks: 'Gracias',
    thanksWithName: 'Gracias, {name}',
    thanksSeparator: ', ',
    successBody: 'Te llamamos al {phone} durante el día. Mantén el teléfono a mano.',
    successNoPayment: 'No se solicita ningún pago antes de la entrega.',
    errorGeneral: 'Se ha producido un error. Inténtalo de nuevo en un momento.',
    errorNetwork: 'La conexión ha fallado. Comprueba tu red y vuelve a intentarlo.',
    errorWhatsapp: 'Escríbenos por WhatsApp',
    errors: {
      nameRequired: 'Indica tu nombre.',
      nameInvalid: 'Introduce un nombre válido (solo letras).',
      phoneInvalid: 'Introduce un móvil argelino válido (ej.: 0550 12 34 56).',
      wilayaRequired: 'Elige tu wilaya.',
      wilayaUnavailable: 'Esta wilaya no está cubierta por el momento.',
      quantity: 'Elige una cantidad entre 1 y {max}.',
      volume: 'Elige un volumen.',
      shop: 'Introduce un nombre de tienda válido.',
      consent: 'Tu consentimiento es necesario para que podamos llamarte.',
    },
    whatsappRetailMessage: 'Hola ALMERÍAGA, quiero reservar el {product}.',
    whatsappWholesaleMessage: 'Hola ALMERÍAGA, quiero comprar al por mayor.',
  },

  footer: {
    role: 'Microempresario · Microimportador',
    anae: 'N.º ANAE',
    nif: 'NIF',
    city: 'Argelia',
    navTitle: 'Navegación',
    contactTitle: 'Contacto por área',
    poles: {
      general: 'General',
      orders: 'Pedidos',
      wholesale: 'Revendedores',
      suppliers: 'Proveedores',
      support: 'Soporte',
    },
    whatsappMessage: 'Hola ALMERÍAGA, tengo una pregunta.',
    rights: 'Todos los derechos reservados.',
    legal: 'Aviso legal',
    tagline:
      'Un vínculo simple entre España y Argelia. Productos autorizados, una confirmación humana y pago en la entrega.',
    twoShores: 'Dos orillas, un vínculo.',
    route: 'Almería · Alicante → Orán',
    routeCities: 'Tremecén · Sidi Bel Abbes',
    noPayment: 'Sin pago en línea.',
    copyright: '© Almeríaga — España → Argelia',
    legalNote: 'Microimportación · Argelia',
    trademarks:
      'PlayStation y PS5 son marcas de Sony Interactive Entertainment; ALMERÍAGA no está afiliada a Sony. Grand Theft Auto es una marca de Take-Two Interactive.',
  },

  pages: {
    gros: {
      badge: 'Espacio B2B / Revendedores',
      title: 'Compra al por mayor',
      titleAccent: 'البيع بالجملة',
      lead:
        '¿Tienes una tienda de videojuegos o eres revendedor? Disfruta de condiciones preferentes y un suministro directo y regular.',
      features: [
        {
          title: 'Precios decrecientes',
          body: 'Márgenes atractivos para tiendas asociadas según el volumen pedido (desde 5 unidades).',
        },
        {
          title: 'Productos verificados',
          body: 'Consolas nuevas de origen, embaladas y garantizadas. Trazabilidad y conformidad aseguradas.',
        },
        {
          title: 'Seguimiento dedicado',
          body: 'Un único interlocutor para tus pedidos, planificación de entregas y dudas logísticas.',
        },
      ],
      formBadge: 'Llamada B2B',
      formTitle: 'Solicitar una llamada',
      formAccent: 'طلب اتصال',
      formLead: 'Indica tus datos y el volumen previsto.',
      contactLabel: 'Contacto directo',
      whatsappMessage: 'Hola ALMERÍAGA, soy revendedor y quiero información sobre la compra al por mayor.',
    },
    suppliers: {
      badge: 'Próximamente',
      title: 'Espacio proveedores y microimportadores',
      titleAccent: 'فضاء الموردين',
      lead:
        'Guías prácticas (ANAE, CASNOS, aduanas), directorio de sourcing y buenas prácticas para lograr tu microimportación con total legalidad.',
      cards: [
        {
          title: 'Guías ANAE / CASNOS',
          body: 'Todos los trámites administrativos para declarar tu actividad de microempresario sin ambigüedad.',
        },
        {
          title: 'Directorio verificado',
          body: 'Lista de contactos y mayoristas de confianza probados sobre el terreno.',
        },
        {
          title: 'Plantillas de mensajes',
          body: 'Guiones profesionales para negociar y comunicarte con tus proveedores en el extranjero.',
        },
        {
          title: 'Lista de viaje y visado',
          body: 'Consejos logísticos y preparación del viaje. (Sin venta de citas de visado ni invitaciones falsas).',
        },
      ],
      formBadge: 'Lista de espera',
      formTitle: 'Avísame del lanzamiento',
      formAccent: 'سجل الآن',
      formLead: 'Regístrate para recibir acceso en cuanto se abran los recursos.',
      contactLabel: 'Contacto',
      whatsappMessage: 'Hola ALMERÍAGA, quiero saber más sobre el espacio proveedores.',
    },
    catalogue: {
      eyebrow: 'Catálogo',
      title: 'Sourcing en España, entrega en Argelia',
      subtitle: 'Tu socio de confianza en importación y logística España-Argelia',
    },
    legal: {
      badge: 'Conformidad',
      intro: 'Información obligatoria conforme a la legislación vigente.',
      eyebrow: 'Transparencia / documento de trabajo',
      title: 'Aviso legal.',
      lead: 'Una estructura de lectura completa, a completar y verificar antes de su publicación. Los campos entre corchetes no constituyen información legal verificada.',
      notice: 'Documento incompleto para su publicación. No se afirma ninguna conformidad: no se han facilitado los datos del operador ni sus justificantes.',
    },
  },

  catalogGrid: {
    filterLabel: 'Filtrar por categoría',
    all: 'Todos',
    categories: {
      'High-Tech': 'Alta tecnología',
      'Beauté & Soins': 'Belleza y cuidado',
      'Café & Épicerie': 'Café y abarrotes',
      Parfums: 'Perfumes',
      Accessoires: 'Accesorios',
    },
    mockNote: 'Precios indicativos a confirmar por teléfono. Los productos mostrados son ejemplos.',
    visualSoon: 'Imagen próximamente',
    onOrder: 'Bajo pedido',
    spain: 'España',
    delivered: 'Entregado en Argelia (est.)',
    minimum: 'Mínimo {n} unidades',
    cta: 'Simular el margen y comprar al por mayor',
    empty: 'No hay productos en esta categoría por el momento.',
    profit: {
      eyebrow: 'Simulación indicativa',
      quantity: 'Cantidad',
      minHint: 'Mínimo {n} unidades',
      sellPrice: 'Precio de venta previsto (DZD / unidad)',
      belowMin: 'Cantidad inferior al mínimo de pedido.',
      capOver: 'Superación del límite de 1 800 000 DA',
      capNear: 'Cerca del límite (más del 90 %)',
      capUnder: 'Por debajo del límite de 1 800 000 DA',
      declared: 'Valor declarado estimado: {value} (tasa {rate} DA/€, indicativa).',
      totalCost: 'Coste total entregado',
      totalRevenue: 'Ingresos totales',
      netMargin: 'Margen neto',
      margin: 'Margen',
      disclaimer: 'Estimación indicativa, no contractual. Sin gastos de entrega, devoluciones ni publicidad.',
      cta: 'Comprar al por mayor',
    },
  },

  simulator: {
    badge: 'Simulador oficial',
    title: 'Simulador de rentabilidad',
    titleAccent: 'محاكي الربحية',
    lead: 'Estima tus costes y márgenes por viaje (límite legal 1 800 000 DA).',
    reset: 'Restablecer',
    paramsTitle: 'Parámetros principales',
    labels: {
      bankRate: 'Tasa bancaria (DZD/€)',
      realRate: 'Tasa real (DZD/€)',
      unitPrice: 'Precio unitario de compra (€)',
      quantity: 'Cantidad',
      sellDetail: 'Precio de venta minorista (DZD)',
      ferry: 'Ferry y viaje (€)',
      packGame: 'Coste juego / GTA VI (DZD)',
      packControllers: 'Coste mandos adicionales (DZD)',
      packOther: 'Otros accesorios (DZD)',
    },
    packTitle: 'Costes del pack minorista (DZD)',
    summary: 'Resumen',
    overCap: '⚠️ Supera 1,8 M DA',
    compliant: '✓ Conforme 1,8 M DA',
    declaredValue: 'Valor declarado',
    unitCost: 'Coste de adquisición',
    fixedCosts: 'Gastos fijos totales',
    chartTitle: 'Comparativa costes vs ingresos (escenario minorista)',
    chartHandmade: 'SVG artesanal',
    costsTotal: 'Costes totales',
    revenue: 'Ingresos',
    scenarios: 'Escenarios',
    roi: 'ROI: {value}',
    threshold: 'Umbral: {value}',
    unitShort: '{n} u',
    disclaimer:
      '* Estimación indicativa, no contractual. Márgenes antes de gastos de entrega, devoluciones, publicidad y coste del juego/mandos del pack.',
    scenarioLabels: { superGros: 'Súper mayorista', gros: 'Mayorista', detail: 'Minorista' },
  },

  api: {
    forbidden: 'Origen no autorizado.',
    invalidFormat: 'Formato de solicitud no válido.',
    invalidRequest: 'Solicitud no válida.',
    unreadable: 'Solicitud ilegible.',
    tooLarge: 'Solicitud demasiado grande.',
    rateLimited: 'Demasiados intentos. Vuelve a intentarlo en unos minutos.',
    tooFast: 'Vuelve a intentarlo en un instante.',
    validationSummary: 'Algunos campos no son válidos.',
    misconfigured: 'Servicio temporalmente no disponible.',
    upstream: 'No hemos podido registrar tu solicitud. Escríbenos por WhatsApp.',
  },
} satisfies Dictionary;
