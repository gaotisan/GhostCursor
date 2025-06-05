// ==========================================
// 🤖 AUTO-INICIALIZACIÓN (effects-init.js)
// ==========================================

import { EffectManager } from './effect-manager.js';
import { VISUAL_EFFECTS_CONFIG } from './visual-effects.js';

/**
 * Inicializador automático del sistema OperatorCursor
 */
class OperatorCursorInitializer {
  static initialized = false;
  
  static init() {
    if (this.initialized) {
      console.debug('[OperatorCursor] Already initialized');
      return;
    }
    
    try {
      // Verificar entorno de navegador
      if (typeof window === 'undefined') {
        console.warn('[OperatorCursor] Not in browser environment, skipping initialization');
        return;
      }
      
      // Crear namespace global
      if (!window.OperatorCursor) {
        window.OperatorCursor = {};
      }
      
      // Registrar componentes globalmente
      window.OperatorCursor.EffectManager = EffectManager;
      window.OperatorCursor.config = VISUAL_EFFECTS_CONFIG;
      window.OperatorCursor.version = '1.0.0';
      window.OperatorCursor.enabled = true;
      
      // Auto-inyectar CSS
      this.injectCSS();
      
      this.initialized = true;
      console.log('[OperatorCursor] 🤖 System initialized successfully');
      
    } catch (error) {
      console.error('[OperatorCursor] Initialization failed:', error);
    }
  }
  
  static injectCSS() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        EffectManager.injectCSS();
      });
    } else {
      EffectManager.injectCSS();
    }
  }
}

// 🤖 Auto-inicializar al importar este módulo
OperatorCursorInitializer.init();

export { OperatorCursorInitializer };