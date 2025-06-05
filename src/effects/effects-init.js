// ==========================================
// 👻 AUTO-INICIALIZACIÓN (effects-init.js)
// ==========================================

/**
 * Inicializador automático del sistema GhostCursor
 */
class GhostCursorInitializer {
  static initialized = false;
  
  static init() {
    if (this.initialized) {
      console.debug('[GhostCursor] Already initialized');
      return;
    }
    
    try {
      // Verificar entorno de navegador
      if (typeof window === 'undefined') {
        console.warn('[GhostCursor] Not in browser environment, skipping initialization');
        return;
      }
      
      // Crear namespace global
      if (!window.GhostCursor) {
        window.GhostCursor = {};
      }
      
      // Registrar componentes globalmente
      window.GhostCursor.EffectManager = EffectManager;
      window.GhostCursor.config = VISUAL_EFFECTS_CONFIG;
      window.GhostCursor.version = '1.0.0';
      window.GhostCursor.enabled = true;
      
      // Auto-inyectar CSS
      this.injectCSS();
      
      this.initialized = true;
      console.log('[GhostCursor] 👻 System initialized successfully');
      
    } catch (error) {
      console.error('[GhostCursor] Initialization failed:', error);
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

// 👻 Auto-inicializar al importar este módulo
GhostCursorInitializer.init();

export { GhostCursorInitializer };