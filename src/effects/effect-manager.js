// ==========================================
// 📄 src/effects/effect-manager.js 
// ==========================================

import { VISUAL_EFFECTS_CONFIG, EFFECT_COLORS } from './visual-effects.js';

/**
 * 👻 Gestor principal de efectos visuales para GhostCursor
 * Maneja la aplicación de efectos, creación de eventos y gestión de CSS
 */
export class EffectManager {
  
  /**
   * Aplicar efecto visual a un elemento
   * @param {HTMLElement} element - Elemento DOM
   * @param {string} eventType - Tipo de evento (click, hover, etc.)
   * @returns {boolean} - true si se aplicó el efecto, false si no
   */
  static applyEffect(element, eventType) {
    const effect = VISUAL_EFFECTS_CONFIG[eventType];
    if (!effect) {
      console.warn(`[GhostCursor] No effect configured for event type: ${eventType}`);
      return false;
    }

    const { class: className, duration, remove } = effect;
    
    try {
      if (remove) {
        // Remover la clase inmediatamente
        element.classList.remove(className);
        console.debug(`[GhostCursor] Removed class '${className}' from element`, element);
      } else {
        // Añadir la clase
        element.classList.add(className);
        console.debug(`[GhostCursor] Applied class '${className}' to element`, element);
        
        // Si tiene duración, remover después del tiempo especificado
        if (duration > 0) {
          setTimeout(() => {
            element.classList.remove(className);
            console.debug(`[GhostCursor] Auto-removed class '${className}' after ${duration}ms`, element);
          }, duration);
        }
      }
      
      return true;
    } catch (error) {
      console.error(`[GhostCursor] Error applying effect:`, error);
      return false;
    }
  }

  /**
   * Crear evento específico según el tipo
   * @param {string} type - Tipo de evento
   * @param {HTMLElement} element - Elemento objetivo
   * @returns {Event} - Evento creado
   */
  static createEventByType(type, element) {
    const commonProps = { bubbles: true, cancelable: true };
    
    try {
      switch(type) {
        case 'click':
        case 'dblclick':
        case 'mousedown':
        case 'mouseup':
        case 'mouseenter':
        case 'mouseleave':
          return new MouseEvent(type, { 
            ...commonProps,
            view: window,
            button: 0,
            clientX: element.offsetLeft + element.offsetWidth / 2,
            clientY: element.offsetTop + element.offsetHeight / 2,
            screenX: element.offsetLeft + element.offsetWidth / 2,
            screenY: element.offsetTop + element.offsetHeight / 2
          });
          
        case 'keydown':
        case 'keyup':
          return new KeyboardEvent(type, { 
            ...commonProps,
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13
          });
          
        case 'input':
        case 'change':
          return new Event(type, { ...commonProps });
          
        case 'focus':
        case 'blur':
          return new FocusEvent(type, { 
            ...commonProps,
            relatedTarget: null
          });
          
        case 'submit':
          return new Event(type, { ...commonProps });
          
        case 'scroll':
          return new Event(type, { ...commonProps });
          
        default:
          console.warn(`[GhostCursor] Unknown event type '${type}', creating generic Event`);
          return new Event(type, commonProps);
      }
    } catch (error) {
      console.error(`[GhostCursor] Error creating event of type '${type}':`, error);
      return new Event(type, commonProps);
    }
  }

  /**
   * Obtener información del elemento para logging
   * @param {HTMLElement} element - Elemento DOM
   * @returns {Object} - Información del elemento
   */
  static getElementInfo(element) {
    try {
      return {
        tagName: element.tagName,
        id: element.id || null,
        className: element.className || null,
        textContent: element.textContent?.substring(0, 50) || null,
        attributes: Array.from(element.attributes).reduce((acc, attr) => {
          acc[attr.name] = attr.value;
          return acc;
        }, {}),
        position: {
          offsetTop: element.offsetTop,
          offsetLeft: element.offsetLeft,
          offsetWidth: element.offsetWidth,
          offsetHeight: element.offsetHeight
        }
      };
    } catch (error) {
      console.error(`[GhostCursor] Error getting element info:`, error);
      return {
        tagName: element.tagName || 'unknown',
        error: error.message
      };
    }
  }

  /**
   * Inyectar CSS de efectos visuales en el documento
   */
  static injectCSS() {
    // Evitar inyección duplicada - 👻 CAMBIO: nuevo ID
    if (document.getElementById('ghostcursor-visual-effects-css')) {
      console.debug('[GhostCursor] CSS already injected');
      return;
    }
    
    try {
      const style = document.createElement('style');
      style.id = 'ghostcursor-visual-effects-css'; // 👻 CAMBIO: nuevo ID
      style.textContent = this.generateCSS();
      document.head.appendChild(style);
      console.log('[GhostCursor] CSS injected successfully');
    } catch (error) {
      console.error('[GhostCursor] Error injecting CSS:', error);
    }
  }

  /**
   * Generar CSS dinámico para los efectos
   * @returns {string} - CSS completo
   */
  static generateCSS() {
    return `
      /* 👻 GhostCursor - Visual Effects System */
      /* Generated automatically - Do not edit manually */
      
      /* Active effects (click, dblclick) */
      .ghost-effect-active {
        transform: scale(0.95) !important;
        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
        box-shadow: 0 0 15px ${EFFECT_COLORS.primary} !important;
        filter: brightness(1.1) !important;
      }

      /* Pressed effect (mousedown) */
      .ghost-effect-pressed {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
        opacity: 0.8 !important;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2) !important;
      }

      /* Released effect (mouseup) */
      .ghost-effect-released {
        transform: scale(1.02) !important;
        transition: transform 0.05s ease-out !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      }

      /* Hover effect (mouseenter/mouseleave) */
      .ghost-effect-hover {
        background-color: ${EFFECT_COLORS.primary} !important;
        transition: background-color 0.2s ease !important;
        cursor: pointer !important;
        border-radius: 4px !important;
      }

      /* Focus effect */
      .ghost-effect-focused {
        outline: 2px solid ${EFFECT_COLORS.focus} !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(0, 93, 255, 0.2) !important;
        transition: box-shadow 0.2s ease !important;
      }

      /* Submit effect */
      .ghost-effect-submitting {
        background-color: ${EFFECT_COLORS.success} !important;
        border: 2px solid rgba(40, 167, 69, 0.8) !important;
        transform: scale(1.01) !important;
        transition: all 0.3s ease !important;
        animation: ghost-pulse-submit 0.3s ease !important;
      }

      /* Input change effect */
      .ghost-effect-changed {
        border-color: ${EFFECT_COLORS.success.replace('0.3', '0.8')} !important;
        box-shadow: 0 0 8px ${EFFECT_COLORS.success} !important;
        transition: all 0.2s ease !important;
      }

      /* Typing effect */
      .ghost-effect-typing {
        border-color: ${EFFECT_COLORS.info.replace('0.3', '0.6')} !important;
        box-shadow: 0 0 5px ${EFFECT_COLORS.info} !important;
        transition: all 0.1s ease !important;
      }

      /* Key press effects */
      .ghost-effect-keypress {
        background-color: ${EFFECT_COLORS.warning} !important;
        transform: scale(0.99) !important;
        transition: all 0.08s ease !important;
      }

      .ghost-effect-keyrelease {
        background-color: ${EFFECT_COLORS.info} !important;
        transform: scale(1.01) !important;
        transition: all 0.04s ease !important;
      }

      /* Scroll effect */
      .ghost-effect-scrolling {
        box-shadow: inset 0 0 10px ${EFFECT_COLORS.primary} !important;
        transition: box-shadow 0.1s ease !important;
        border-left: 3px solid ${EFFECT_COLORS.focus} !important;
      }

      /* 👻 Animaciones fantasma personalizadas */
      @keyframes ghost-pulse-submit {
        0% { transform: scale(1.01); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1.01); }
      }

      @keyframes ghost-glow {
        0%, 100% { box-shadow: 0 0 5px rgba(0, 120, 215, 0.3); }
        50% { box-shadow: 0 0 20px rgba(0, 120, 215, 0.8); }
      }

      /* Efectos para diferentes tipos de elementos */
      button.ghost-effect-active,
      input[type="button"].ghost-effect-active,
      input[type="submit"].ghost-effect-active {
        transform: scale(0.96) !important;
      }

      input.ghost-effect-focused,
      textarea.ghost-effect-focused,
      select.ghost-effect-focused {
        border-width: 2px !important;
      }

      /* Efectos responsivos */
      @media (max-width: 768px) {
        .ghost-effect-active {
          transform: scale(0.97) !important;
        }
        
        .ghost-effect-pressed {
          transform: scale(0.99) !important;
        }
      }

      /* Modo de alto contraste */
      @media (prefers-contrast: high) {
        .ghost-effect-focused {
          outline-width: 3px !important;
          outline-color: #000 !important;
        }
      }

      /* Reducir animaciones si el usuario lo prefiere */
      @media (prefers-reduced-motion: reduce) {
        .ghost-effect-active,
        .ghost-effect-pressed,
        .ghost-effect-released,
        .ghost-effect-hover,
        .ghost-effect-focused,
        .ghost-effect-submitting,
        .ghost-effect-changed,
        .ghost-effect-typing,
        .ghost-effect-keypress,
        .ghost-effect-keyrelease,
        .ghost-effect-scrolling {
          transition: none !important;
          animation: none !important;
        }
      }
    `;
  }

  /**
   * Remover CSS de efectos del documento
   */
  static removeCSS() {
    const style = document.getElementById('ghostcursor-visual-effects-css'); // 👻 CAMBIO: nuevo ID
    if (style) {
      style.remove();
      console.log('[GhostCursor] CSS removed');
    }
  }

  /**
   * Verificar si los efectos están disponibles y funcionando
   * @returns {Object} - Estado del sistema de efectos
   */
  static getStatus() {
    return {
      cssInjected: !!document.getElementById('ghostcursor-visual-effects-css'), // 👻 CAMBIO: nuevo ID
      configuredEvents: Object.keys(VISUAL_EFFECTS_CONFIG),
      supportedEvents: EVENT_TYPES,
      version: '1.0.0',
      ready: true
    };
  }

  /**
   * Limpiar todos los efectos activos de un elemento
   * @param {HTMLElement} element - Elemento a limpiar
   */
  static clearAllEffects(element) {
    const allEffectClasses = Object.values(VISUAL_EFFECTS_CONFIG).map(effect => effect.class);
    element.classList.remove(...allEffectClasses);
    console.debug('[GhostCursor] Cleared all effects from element', element);
  }

  /**
   * Configurar nuevo efecto personalizado
   * @param {string} eventType - Tipo de evento
   * @param {Object} config - Configuración del efecto
   */
  static addCustomEffect(eventType, config) {
    VISUAL_EFFECTS_CONFIG[eventType] = {
      class: config.class || `ghost-effect-${eventType}`, // 👻 CAMBIO: nuevo prefijo
      duration: config.duration || 150,
      description: config.description || `Custom effect for ${eventType}`,
      ...config
    };
    console.log(`[GhostCursor] Added custom effect for '${eventType}'`);
  }

  /**
   * 👻 Registrar GhostCursor en el sistema global
   */
  static registerGhostCursor(GhostCursorClass) {
    if (typeof window !== 'undefined') {
      window.GhostCursor = window.GhostCursor || {}; // 👻 CAMBIO: nuevo namespace
      window.GhostCursor.Cursor = GhostCursorClass;
      window.GhostCursor.EffectManager = EffectManager;
      console.log('[GhostCursor] GhostCursor registered globally');
    }
  }

  /**
   * 👻 Obtener instancia singleton del cursor fantasma
   */
  static getGhostCursor() {
    if (typeof window !== 'undefined' && window.GhostCursor && window.GhostCursor._ghostInstance) {
      return window.GhostCursor._ghostInstance; // 👻 CAMBIO: nuevo nombre
    }
    return null;
  }

  /**
   * 👻 Limpiar cursor fantasma
   */
  static cleanupGhostCursor() {
    if (typeof window !== 'undefined' && window.GhostCursor && window.GhostCursor._ghostInstance) {
      window.GhostCursor._ghostInstance.destroy();
      delete window.GhostCursor._ghostInstance; // 👻 CAMBIO: nuevo nombre
    }
  }
}

