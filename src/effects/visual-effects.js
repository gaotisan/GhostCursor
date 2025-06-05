// ==========================================
// 📄 src/effects/visual-effects.js
// ==========================================

/**
 * 🤖 Configuración de efectos visuales para diferentes tipos de eventos DOM
 * Cada efecto define la clase CSS a aplicar y su duración
 */
export const VISUAL_EFFECTS_CONFIG = {
  // Eventos de click
  click: { 
    class: 'operator-effect-active', 
    duration: 150,
    description: 'Efecto de click con escala reducida y sombra',
    trigger: 'immediate'
  },
  dblclick: { 
    class: 'operator-effect-active', // 🤖 CAMBIO
    duration: 200,
    description: 'Efecto de doble click más duradero',
    trigger: 'immediate'
  },
  
  // Eventos de mouse
  mousedown: { 
    class: 'operator-effect-pressed', // 🤖 CAMBIO
    duration: 100,
    description: 'Efecto al presionar el botón del mouse',
    trigger: 'immediate'
  },
  mouseup: { 
    class: 'operator-effect-released', // 🤖 CAMBIO
    duration: 50,
    description: 'Efecto al soltar el botón del mouse',
    trigger: 'immediate'
  },
  mouseenter: { 
    class: 'operator-effect-hover', // 🤖 CAMBIO
    duration: 0,
    description: 'Efecto hover al entrar con el mouse',
    trigger: 'immediate'
  },
  mouseleave: { 
    class: 'operator-effect-hover', // 🤖 CAMBIO
    duration: 0, 
    remove: true,
    description: 'Remover efecto hover al salir con el mouse',
    trigger: 'immediate'
  },
  
  // Eventos de foco
  focus: { 
    class: 'operator-effect-focused', // 🤖 CAMBIO
    duration: 0,
    description: 'Efecto de elemento enfocado',
    trigger: 'immediate'
  },
  blur: { 
    class: 'operator-effect-focused', // 🤖 CAMBIO
    duration: 0, 
    remove: true,
    description: 'Remover efecto de foco',
    trigger: 'immediate'
  },
  
  // Eventos de formulario
  submit: { 
    class: 'operator-effect-submitting', // 🤖 CAMBIO
    duration: 300,
    description: 'Efecto de envío de formulario',
    trigger: 'immediate'
  },
  change: {
    class: 'operator-effect-changed', // 🤖 CAMBIO
    duration: 200,
    description: 'Efecto cuando cambia el valor de un input',
    trigger: 'immediate'
  },
  input: {
    class: 'operator-effect-typing', // 🤖 CAMBIO
    duration: 100,
    description: 'Efecto mientras se escribe en un input',
    trigger: 'immediate'
  },
  
  // Eventos de teclado
  keydown: {
    class: 'operator-effect-keypress', // 🤖 CAMBIO
    duration: 80,
    description: 'Efecto al presionar una tecla',
    trigger: 'immediate'
  },
  keyup: {
    class: 'operator-effect-keyrelease', // 🤖 CAMBIO
    duration: 40,
    description: 'Efecto al soltar una tecla',
    trigger: 'immediate'
  },
  
  // Eventos de scroll
  scroll: {
    class: 'operator-effect-scrolling', // 🤖 CAMBIO
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
 * 🤖 Configuración de colores para los efectos (tema operador)
 */
export const EFFECT_COLORS = {
  primary: 'rgba(104, 255, 254, 0.3)',    // 🤖 CAMBIO: cian operador
  success: 'rgba(16, 185, 129, 0.3)',     // Verde moderno
  warning: 'rgba(245, 158, 11, 0.3)',     // Ámbar suave
  danger: 'rgba(239, 68, 68, 0.3)',       // Rojo moderno
  info: 'rgba(59, 130, 246, 0.3)',        // Azul vibrante
  focus: 'rgb(104, 255, 254)'             // 🤖 CAMBIO: cian operador sólido
};

// ==========================================
// 🤖 CONFIGURACIONES ADICIONALES PARA OPERATORCURSOR
// ==========================================

/**
 * Configuración de colores del cursor operador
 */
export const OPERATOR_CURSOR_COLORS = {
  default: '#68FFFE',         // Cian operador (tu favorito)
  cyan: '#06b6d4',            // Cian alternativo
  green: '#10b981',           // Verde esmeralda
  blue: '#3b82f6',            // Azul cielo
  purple: '#8b5cf6',          // Púrpura violeta
  pink: '#ec4899',            // Rosa vibrante
  orange: '#f59e0b',          // Ámbar
  red: '#ef4444',             // Rojo
  emerald: '#059669',         // Esmeralda oscuro
  indigo: '#4f46e5'           // Índigo
};

/**
 * Configuración de velocidades del cursor operador
 */
export const OPERATOR_CURSOR_SPEEDS = {
  slow: 1200,      // Muy lento y dramático
  normal: 800,     // Velocidad normal
  fast: 400,       // Rápido
  instant: 100     // Casi instantáneo
};

/**
 * Configuración de tamaños del cursor operador
 */
export const OPERATOR_CURSOR_SIZES = {
  small: 20,       // Pequeño
  normal: 24,      // Normal
  large: 32,       // Grande
  huge: 40         // Muy grande
};

/**
 * Efectos especiales del cursor operador
 */
export const OPERATOR_EFFECTS = {
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
    enabled: true,    // 🤖 CAMBIO: Habilitado por defecto como prefieres
    volume: 0.1,
    clickFrequency: 800,
    errorFrequency: 400,
    successFrequency: 1200
  }
};

// ==========================================
// 🤖 TEMAS PREDEFINIDOS PARA OPERATORCURSOR
// ==========================================

/**
 * Temas completos para el cursor operador
 */
export const OPERATOR_THEMES = {
  // Tema por defecto - Cian operador
  operator: {
    name: 'Operator Cyan',
    cursor: OPERATOR_CURSOR_COLORS.default,
    trail: 'rgba(104, 255, 254, 0.3)',
    effects: EFFECT_COLORS,
    speed: OPERATOR_CURSOR_SPEEDS.normal,
    size: OPERATOR_CURSOR_SIZES.large  // 🤖 CAMBIO: Grande por defecto
  },
  
  // Tema Matrix - Verde cibernético
  matrix: {
    name: 'Matrix Green',
    cursor: OPERATOR_CURSOR_COLORS.green,
    trail: 'rgba(16, 185, 129, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(16, 185, 129, 0.3)',
      focus: 'rgb(16, 185, 129)'
    },
    speed: OPERATOR_CURSOR_SPEEDS.fast,
    size: OPERATOR_CURSOR_SIZES.normal
  },
  
  // Tema Ocean - Azul profundo
  ocean: {
    name: 'Ocean Blue',
    cursor: OPERATOR_CURSOR_COLORS.blue,
    trail: 'rgba(59, 130, 246, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(59, 130, 246, 0.3)',
      focus: 'rgb(59, 130, 246)'
    },
    speed: OPERATOR_CURSOR_SPEEDS.normal,
    size: OPERATOR_CURSOR_SIZES.normal
  },
  
  // Tema Neon - Rosa vibrante
  neon: {
    name: 'Neon Pink',
    cursor: OPERATOR_CURSOR_COLORS.pink,
    trail: 'rgba(236, 72, 153, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(236, 72, 153, 0.3)',
      focus: 'rgb(236, 72, 153)'
    },
    speed: OPERATOR_CURSOR_SPEEDS.fast,
    size: OPERATOR_CURSOR_SIZES.large
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
    speed: OPERATOR_CURSOR_SPEEDS.slow,
    size: OPERATOR_CURSOR_SIZES.small
  },
  
  // Tema Fire - Naranja ardiente
  fire: {
    name: 'Fire Orange',
    cursor: OPERATOR_CURSOR_COLORS.orange,
    trail: 'rgba(245, 158, 11, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(245, 158, 11, 0.3)',
      focus: 'rgb(245, 158, 11)'
    },
    speed: OPERATOR_CURSOR_SPEEDS.fast,
    size: OPERATOR_CURSOR_SIZES.normal
  },
  
  // 🤖 Tema Robot - Especial para OperatorCursor
  robot: {
    name: 'Robot Tech',
    cursor: '#00ff41',  // Verde terminal
    trail: 'rgba(0, 255, 65, 0.3)',
    effects: {
      ...EFFECT_COLORS,
      primary: 'rgba(0, 255, 65, 0.3)',
      focus: 'rgb(0, 255, 65)'
    },
    speed: OPERATOR_CURSOR_SPEEDS.fast,
    size: OPERATOR_CURSOR_SIZES.large
  }
};

// ==========================================
// 🎨 UTILIDADES PARA TEMAS
// ==========================================

/**
 * Aplicar un tema al cursor operador
 * @param {string} themeName - Nombre del tema
 * @returns {Object} - Configuración del tema
 */
export function applyOperatorTheme(themeName) {
  const theme = OPERATOR_THEMES[themeName];
  if (!theme) {
    console.warn(`[OperatorCursor] Theme '${themeName}' not found. Available themes: ${Object.keys(OPERATOR_THEMES).join(', ')}`);
    return OPERATOR_THEMES.operator; // Fallback al tema por defecto
  }
  
  console.log(`[OperatorCursor] 🤖 Applied theme: ${theme.name}`);
  return theme;
}

/**
 * Obtener lista de temas disponibles
 * @returns {Array} - Lista de nombres de temas
 */
export function getAvailableThemes() {
  return Object.keys(OPERATOR_THEMES).map(key => ({
    key,
    name: OPERATOR_THEMES[key].name,
    color: OPERATOR_THEMES[key].cursor
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
    cursor: config.cursor || OPERATOR_CURSOR_COLORS.default,
    trail: config.trail || `${config.cursor}33`, // Añadir transparencia
    effects: {
      ...EFFECT_COLORS,
      primary: config.primary || config.cursor + '4D',
      focus: config.focus || config.cursor,
      ...config.effects
    },
    speed: config.speed || OPERATOR_CURSOR_SPEEDS.normal,
    size: config.size || OPERATOR_CURSOR_SIZES.normal
  };
  
  // Registrar tema personalizado
  OPERATOR_THEMES[name] = customTheme;
  
  console.log(`[OperatorCursor] 🤖 Created custom theme: ${customTheme.name}`);
  return customTheme;
}

