// ==========================================
// 👻 src/index.js - Exportación principal de GhostCursor
// ==========================================

// Importar clases principales
export { GhostCursor } from './core/ghost-cursor.js';
export { GhostCursorIntegration } from './core/ghost-integration.js';

// Importar sistemas de efectos (opcional)
export { EffectManager } from './effects/effect-manager.js';

// Importar utilidades
//export * from './utils/colorUtils.js';
//export * from './utils/DOMUtils.js';

// Exportación por defecto (la clase principal)
export { GhostCursor as default } from './core/ghost-cursor.js';

// 👻 Auto-inicialización para compatibilidad con navegadores
if (typeof window !== 'undefined') {
  // Hacer GhostCursor disponible globalmente para compatibilidad
  window.GhostCursor = window.GhostCursor || {};
  
  // Importar dinámicamente la clase principal
  import('./core/ghost-cursor.js').then(({ GhostCursor }) => {
    window.GhostCursor = GhostCursor;
  }).catch(console.error);
}