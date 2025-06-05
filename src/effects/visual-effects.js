// ==========================================
// 📄 src/effects/visual-effects.js
// ==========================================

/**
 * 👻 Configuración de efectos visuales para diferentes tipos de eventos DOM
 * Cada efecto define la clase CSS a aplicar y su duración
 */
export const VISUAL_EFFECTS_CONFIG = {
  // Eventos de click
  click: { 
    class: 'ghost-effect-active', // 👻 CAMBIO: sea-effect-* → ghost-effect-*
    duration: 150,
    description: 'Efecto de click con escala reducida y sombra',
    trigger: 'immediate'
  },
  dblclick: { 
    class: 'ghost-effect-active', // 👻 CAMBIO
    duration: 200,
    description: 'Efecto de doble click más duradero',
    trigger: 'immediate'
  },
  
  // Eventos de mouse
  mousedown: { 
    class: 'ghost-effect-pressed', // 👻 CAMBIO
    duration: 100,
    description: 'Efecto al presionar el botón del mouse',
    trigger: 'immediate'
  },
  mouseup: { 
    class: 'ghost-effect-released', // 👻 CAMBIO
    duration: 50,
    description: 'Efecto al soltar el botón del mouse',
    trigger: 'immediate'
  },
  mouseenter: { 
    class: 'ghost-effect-hover', // 👻 CAMBIO
    duration: 0,
    description: 'Efecto hover al entrar con el mouse',
    trigger: 'immediate'
  },
  mouseleave: { 
    class: 'ghost-effect-hover', // 👻 CAMBIO
    duration: 0, 
    remove: true,
    description: 'Remover efecto hover al salir con el mouse',
    trigger: 'immediate'
  },
  
  // Eventos de foco
  focus: { 
    class: 'ghost-effect-focused', // 👻 CAMBIO
    duration: 0,
    description: 'Efecto de elemento enfocado',
    trigger: 'immediate'
  },
  blur: { 
    class: 'ghost-effect-focused', // 👻 CAMBIO
    duration: 0, 
    remove: true,
    description: 'Remover efecto de foco',
    trigger: 'immediate'
  },
  
  // Eventos de formulario
  submit: { 
    class: 'ghost-effect-submitting', // 👻 CAMBIO
    duration: 300,
    description: 'Efecto de envío de formulario',
    trigger: 'immediate'
  },
  change: {
    class: 'ghost-effect-changed', // 👻 CAMBIO
    duration: 200,
    description: 'Efecto cuando cambia el valor de un input',
    trigger: 'immediate'
  },
  input: {
    class: 'ghost-effect-typing', // 👻 CAMBIO
    duration: 100,
    description: 'Efecto mientras se escribe en un input',
    trigger: 'immediate'
  },
  
  // Eventos de teclado
  keydown: {
    class: 'ghost-effect-keypress', // 👻 CAMBIO
    duration: 80,
    description: 'Efecto al presionar una tecla',
    trigger: 'immediate'
  },
  keyup: {
    class: 'ghost-effect-keyrelease', // 👻 CAMBIO
    duration: 40,
    description: 'Efecto al soltar una tecla',
    trigger: 'immediate'
  },
  
  // Eventos de scroll
  scroll: {
    class: 'ghost-effect-scrolling', // 👻 CAMBIO
    duration: 100,
    description: 'Efecto durante el scroll',
    trigger: 'immediate'
  }
};

/**
 * Tipos de eventos DOM soportados
 */
export const EVENT_TYPES = [
  'click', 'dblclick', 'mousedown', 'mouseup',
  'mouseenter', 'mouseleave',
  'keydown', 'keyup', 'input', 'change',
  'focus', 'blur', 'submit', 'scroll'
];

/**
 * Configuración de timing para diferentes categorías de efectos
 */
export const EFFECT_TIMINGS = {
  fast: 50,
  normal: 150,
  slow: 300,
  persistent: 0 // No se remueve automáticamente
};

/**
 * 👻 Configuración de colores para los efectos (tema fantasma)
 */
export const EFFECT_COLORS = {
  primary: 'rgba(99, 102, 241, 0.3)',    // 👻 CAMBIO: púrpura fantasma
  success: 'rgba(16, 185, 129, 0.3)',    // 👻 CAMBIO: verde más moderno
  warning: 'rgba(245, 158, 11, 0.3)',    // 👻 CAMBIO: ámbar más suave
  danger: 'rgba(239, 68, 68, 0.3)',      // 👻 CAMBIO: rojo más moderno
  info: 'rgba(59, 130, 246, 0.3)',       // 👻 CAMBIO: azul más vibrante
  focus: 'rgb(99, 102, 241)'             // 👻 CAMBIO: púrpura fantasma sólido
};

// ==========================================
// 👻 CONFIGURACIONES ADICIONALES PARA GHOSTCURSOR
// ==========================================

/**
 * Configuración de colores del cursor fantasma
 */
export const GHOST_CURSOR_COLORS = {
  default: '#6366f1',         // Púrpura fantasma
  green: '#10b981',           // Verde esmeralda
  blue: '#3b82f6',            // Azul cielo
  purple: '#8b5cf6',          // Púrpura violeta
  pink: '#ec4899',            // Rosa vibrante
  orange: '#f59e0b',          // Ámbar
  red: '#ef4444',             // Rojo
  cyan: '#06b6d4',            // Cian
  emerald: '#059669',         // Esmeralda oscuro
  indigo: '#4f46e5'           // Índigo
};

/**
 * Configuración de velocidades del cursor fantasma
 */
export const GHOST_CURSOR_SPEEDS = {
  slow: 1200,      // Muy lento y dramático
  normal: 800,     // Velocidad normal
  fast: 400,       // Rápido
  instant: 100     // Casi instantáneo
};

/**
 * Configuración de tamaños del cursor fantasma
 */
export const GHOST_CURSOR_SIZES = {
  small: 20,       // Pequeño
  normal: 24,      // Normal
  large: 32,       // Grande
  huge: 40         // Muy grande
};

/**
 * Efectos especiales del cursor fantasma
 */
export const GHOST_EFFECTS = {
  trail: {
    enabled: true,
    opacity: 0.6,
    fadeTime: 800,
    color: 'inherit'  // Hereda del cursor principal
  },
  
  ripple: {
    enabled: true,
    size: 40,
    duration: 300,
    opacity: 0.6
  },
  
  glow: {
    enabled: true,
    radius: 8,
    intensity: 0.4
  },
  
  pulse: {
    enabled: true,
    duration: 2000,
    scale: 1.1
  },
  
  sound: {
    enabled: false,   // Deshabilitado por defecto
    volume: 0.1,
    clickFrequency: 800,
    errorFrequency: 400,
    successFrequency: 1200
  }
};

// ==========================================
// 👻 TEMAS PREDEFINIDOS PARA GHOSTCURSOR
// ==========================================

/**
 * Temas completos para el cursor fantasma
 */
export const GHOST_THEMES = {
  // Tema por defecto - Púrpura fantasma
  phantom: {
    name: 'Phantom Purple',
    cursor: GHOST_CURSOR_COLORS.default,
    trail: 'rgba(99, 102, 241, 0.3)',
    effects: EFFECT_COLORS,
    speed: GHOST_CURSOR_SPEEDS.normal,
    size: GHOST_CURSOR_SIZES.normal
  },
  
  // Tema Matrix - Verde cibernético
  matrix: {
    name: 'Matrix Green',
    cursor: GHOST_CURSOR_COLORS.green,
    trail: 'rgba(16, 185, 129, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(16, 185, 129, 0.3)',
      focus: 'rgb(16, 185, 129)'
    },
    speed: GHOST_CURSOR_SPEEDS.fast,
    size: GHOST_CURSOR_SIZES.normal
  },
  
  // Tema Ocean - Azul profundo
  ocean: {
    name: 'Ocean Blue',
    cursor: GHOST_CURSOR_COLORS.blue,
    trail: 'rgba(59, 130, 246, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(59, 130, 246, 0.3)',
      focus: 'rgb(59, 130, 246)'
    },
    speed: GHOST_CURSOR_SPEEDS.normal,
    size: GHOST_CURSOR_SIZES.normal
  },
  
  // Tema Neon - Rosa vibrante
  neon: {
    name: 'Neon Pink',
    cursor: GHOST_CURSOR_COLORS.pink,
    trail: 'rgba(236, 72, 153, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(236, 72, 153, 0.3)',
      focus: 'rgb(236, 72, 153)'
    },
    speed: GHOST_CURSOR_SPEEDS.fast,
    size: GHOST_CURSOR_SIZES.large
  },
  
  // Tema Stealth - Gris oscuro
  stealth: {
    name: 'Stealth Gray',
    cursor: '#6b7280',
    trail: 'rgba(107, 114, 128, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(107, 114, 128, 0.3)',
      focus: 'rgb(107, 114, 128)'
    },
    speed: GHOST_CURSOR_SPEEDS.slow,
    size: GHOST_CURSOR_SIZES.small
  },
  
  // Tema Fire - Naranja ardiente
  fire: {
    name: 'Fire Orange',
    cursor: GHOST_CURSOR_COLORS.orange,
    trail: 'rgba(245, 158, 11, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(245, 158, 11, 0.3)',
      focus: 'rgb(245, 158, 11)'
    },
    speed: GHOST_CURSOR_SPEEDS.fast,
    size: GHOST_CURSOR_SIZES.normal
  }
};

// ==========================================
// 🎨 UTILIDADES PARA TEMAS
// ==========================================

/**
 * Aplicar un tema al cursor fantasma
 * @param {string} themeName - Nombre del tema
 * @returns {Object} - Configuración del tema
 */
export function applyGhostTheme(themeName) {
  const theme = GHOST_THEMES[themeName];
  if (!theme) {
    console.warn(`[GhostCursor] Theme '${themeName}' not found. Available themes: ${Object.keys(GHOST_THEMES).join(', ')}`);
    return GHOST_THEMES.phantom; // Fallback al tema por defecto
  }
  
  console.log(`[GhostCursor] 👻 Applied theme: ${theme.name}`);
  return theme;
}

/**
 * Obtener lista de temas disponibles
 * @returns {Array} - Lista de nombres de temas
 */
export function getAvailableThemes() {
  return Object.keys(GHOST_THEMES).map(key => ({
    key,
    name: GHOST_THEMES[key].name,
    color: GHOST_THEMES[key].cursor
  }));
}

/**
 * Crear tema personalizado
 * @param {string} name - Nombre del tema
 * @param {Object} config - Configuración del tema
 * @returns {Object} - Tema creado
 */
export function createCustomTheme(name, config) {
  const customTheme = {
    name: config.name || name,
    cursor: config.cursor || GHOST_CURSOR_COLORS.default,
    trail: config.trail || `${config.cursor}33`, // Añadir transparencia
    effects: {
      ...EFFECT_COLORS,
      primary: config.primary || config.cursor + '4D',
      focus: config.focus || config.cursor,
      ...config.effects
    },
    speed: config.speed || GHOST_CURSOR_SPEEDS.normal,
    size: config.size || GHOST_CURSOR_SIZES.normal
  };
  
  // Registrar tema personalizado
  GHOST_THEMES[name] = customTheme;
  
  console.log(`[GhostCursor] 👻 Created custom theme: ${customTheme.name}`);
  return customTheme;
}