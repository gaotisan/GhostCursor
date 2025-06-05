// ==========================================
// 🤖 src/index.js - Exportación principal de OperatorCursor
// ==========================================

// Importar clases principales
export { OperatorCursor } from './core/operator-cursor.js';
export { OperatorCursorIntegration } from './core/operator-integration.js';

// Importar sistemas de efectos (opcional)
export { EffectManager } from './effects/effect-manager.js';

// Importar utilidades
//export * from './utils/colorUtils.js';
//export * from './utils/DOMUtils.js';

// Exportación por defecto (la clase principal)
export { OperatorCursor as default } from './core/operator-cursor.js';


// 🤖 Auto-inicialización para compatibilidad con navegadores
if (typeof window !== 'undefined') {
  // Importar dinámicamente la clase principal
  import('./core/operator-cursor.js').then(({ OperatorCursor }) => {
    window.OperatorCursor = OperatorCursor;
  }).catch(console.error);
}