// ==========================================
// 📄 src/effects/effect-manager.js 
// ==========================================

import { VISUAL_EFFECTS_CONFIG, EFFECT_COLORS } from './visual-effects.js';

/**
 * 🤖 Gestor principal de efectos visuales para OperatorCursor
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
      console.warn(`[OperatorCursor] No effect configured for event type: ${eventType}`);
      return false;
    }

    const { class: className, duration, remove } = effect;
    
    try {
      if (remove) {
        // Remover la clase inmediatamente
        element.classList.remove(className);
        console.debug(`[OperatorCursor] Removed class '${className}' from element`, element);
      } else {
        // Añadir la clase
        element.classList.add(className);
        console.debug(`[OperatorCursor] Applied class '${className}' to element`, element);
        
        // Si tiene duración, remover después del tiempo especificado
        if (duration > 0) {
          setTimeout(() => {
            element.classList.remove(className);
            console.debug(`[OperatorCursor] Auto-removed class '${className}' after ${duration}ms`, element);
          }, duration);
        }
      }
      
      return true;
    } catch (error) {
      console.error(`[OperatorCursor] Error applying effect:`, error);
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
          console.warn(`[OperatorCursor] Unknown event type '${type}', creating generic Event`);
          return new Event(type, commonProps);
      }
    } catch (error) {
      console.error(`[OperatorCursor] Error creating event of type '${type}':`, error);
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
      console.error(`[OperatorCursor] Error getting element info:`, error);
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
    // Evitar inyección duplicada - 🤖 CAMBIO: nuevo ID
    if (document.getElementById('operator-cursor-visual-effects-css')) {
      console.debug('[OperatorCursor] CSS already injected');
      return;
    }
    
    try {
      const style = document.createElement('style');
      style.id = 'operator-cursor-visual-effects-css'; // 🤖 CAMBIO: nuevo ID
      style.textContent = this.generateCSS();
      document.head.appendChild(style);
      console.log('[OperatorCursor] CSS injected successfully');
    } catch (error) {
      console.error('[OperatorCursor] Error injecting CSS:', error);
    }
  }

  /**
   * Generar CSS dinámico para los efectos
   * @returns {string} - CSS completo
   */
  static generateCSS() {
    return `
      /* 🤖 OperatorCursor - Visual Effects System */
      /* Generated automatically - Do not edit manually */
      
      /* Active effects (click, dblclick) */
      .operator-effect-active {
        transform: scale(0.95) !important;
        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
        box-shadow: 0 0 15px ${EFFECT_COLORS.primary} !important;
        filter: brightness(1.1) !important;
      }

      /* Pressed effect (mousedown) */
      .operator-effect-pressed {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
        opacity: 0.8 !important;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2) !important;
      }

      /* Released effect (mouseup) */
      .operator-effect-released {
        transform: scale(1.02) !important;
        transition: transform 0.05s ease-out !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      }

      /* Hover effect (mouseenter/mouseleave) */
      .operator-effect-hover {
        background-color: ${EFFECT_COLORS.primary} !important;
        transition: background-color 0.2s ease !important;
        cursor: pointer !important;
        border-radius: 4px !important;
      }

      /* Focus effect */
      .operator-effect-focused {
        outline: 2px solid ${EFFECT_COLORS.focus} !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(0, 93, 255, 0.2) !important;
        transition: box-shadow 0.2s ease !important;
      }

      /* Submit effect */
      .operator-effect-submitting {
        background-color: ${EFFECT_COLORS.success} !important;
        border: 2px solid rgba(40, 167, 69, 0.8) !important;
        transform: scale(1.01) !important;
        transition: all 0.3s ease !important;
        animation: operator-pulse-submit 0.3s ease !important;
      }

      /* Input change effect */
      .operator-effect-changed {
        border-color: ${EFFECT_COLORS.success.replace('0.3', '0.8')} !important;
        box-shadow: 0 0 8px ${EFFECT_COLORS.success} !important;
        transition: all 0.2s ease !important;
      }

      /* Typing effect */
      .operator-effect-typing {
        border-color: ${EFFECT_COLORS.info.replace('0.3', '0.6')} !important;
        box-shadow: 0 0 5px ${EFFECT_COLORS.info} !important;
        transition: all 0.1s ease !important;
      }

      /* Key press effects */
      .operator-effect-keypress {
        background-color: ${EFFECT_COLORS.warning} !important;
        transform: scale(0.99) !important;
        transition: all 0.08s ease !important;
      }

      .operator-effect-keyrelease {
        background-color: ${EFFECT_COLORS.info} !important;
        transform: scale(1.01) !important;
        transition: all 0.04s ease !important;
      }

      /* Scroll effect */
      .operator-effect-scrolling {
        box-shadow: inset 0 0 10px ${EFFECT_COLORS.primary} !important;
        transition: box-shadow 0.1s ease !important;
        border-left: 3px solid ${EFFECT_COLORS.focus} !important;
      }

      /* 🤖 Animaciones operador personalizadas */
      @keyframes operator-pulse-submit {
        0% { transform: scale(1.01); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1.01); }
      }

      @keyframes operator-glow {
        0%, 100% { box-shadow: 0 0 5px rgba(0, 120, 215, 0.3); }
        50% { box-shadow: 0 0 20px rgba(0, 120, 215, 0.8); }
      }

      /* Efectos para diferentes tipos de elementos */
      button.operator-effect-active,
      input[type="button"].operator-effect-active,
      input[type="submit"].operator-effect-active {
        transform: scale(0.96) !important;
      }

      input.operator-effect-focused,
      textarea.operator-effect-focused,
      select.operator-effect-focused {
        border-width: 2px !important;
      }

      /* Efectos responsivos */
      @media (max-width: 768px) {
        .operator-effect-active {
          transform: scale(0.97) !important;
        }
        
        .operator-effect-pressed {
          transform: scale(0.99) !important;
        }
      }

      /* Modo de alto contraste */
      @media (prefers-contrast: high) {
        .operator-effect-focused {
          outline-width: 3px !important;
          outline-color: #000 !important;
        }
      }

      /* Reducir animaciones si el usuario lo prefiere */
      @media (prefers-reduced-motion: reduce) {
        .operator-effect-active,
        .operator-effect-pressed,
        .operator-effect-released,
        .operator-effect-hover,
        .operator-effect-focused,
        .operator-effect-submitting,
        .operator-effect-changed,
        .operator-effect-typing,
        .operator-effect-keypress,
        .operator-effect-keyrelease,
        .operator-effect-scrolling {
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
    const style = document.getElementById('operator-cursor-visual-effects-css'); // 🤖 CAMBIO: nuevo ID
    if (style) {
      style.remove();
      console.log('[OperatorCursor] CSS removed');
    }
  }

  /**
   * Verificar si los efectos están disponibles y funcionando
   * @returns {Object} - Estado del sistema de efectos
   */
  static getStatus() {
    return {
      cssInjected: !!document.getElementById('operator-cursor-visual-effects-css'), // 🤖 CAMBIO: nuevo ID
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
    console.debug('[OperatorCursor] Cleared all effects from element', element);
  }

  /**
   * Configurar nuevo efecto personalizado
   * @param {string} eventType - Tipo de evento
   * @param {Object} config - Configuración del efecto
   */
  static addCustomEffect(eventType, config) {
    VISUAL_EFFECTS_CONFIG[eventType] = {
      class: config.class || `operator-effect-${eventType}`, // 🤖 CAMBIO: nuevo prefijo
      duration: config.duration || 150,
      description: config.description || `Custom effect for ${eventType}`,
      ...config
    };
    console.log(`[OperatorCursor] Added custom effect for '${eventType}'`);
  }

  /**
   * 🤖 Registrar OperatorCursor en el sistema global
   */
  static registerOperatorCursor(OperatorCursorClass) {
    if (typeof window !== 'undefined') {
      window.OperatorCursor = window.OperatorCursor || {}; // 🤖 CAMBIO: nuevo namespace
      window.OperatorCursor.Cursor = OperatorCursorClass;
      window.OperatorCursor.EffectManager = EffectManager;
      console.log('[OperatorCursor] OperatorCursor registered globally');
    }
  }

  /**
   * 🤖 Obtener instancia singleton del cursor operador
   */
  static getOperatorCursor() {
    if (typeof window !== 'undefined' && window.OperatorCursor && window.OperatorCursor._operatorInstance) {
      return window.OperatorCursor._operatorInstance; // 🤖 CAMBIO: nuevo nombre
    }
    return null;
  }

  /**
   * 🤖 Limpiar cursor operador
   */
  static cleanupOperatorCursor() {
    if (typeof window !== 'undefined' && window.OperatorCursor && window.OperatorCursor._operatorInstance) {
      window.OperatorCursor._operatorInstance.destroy();
      delete window.OperatorCursor._operatorInstance; // 🤖 CAMBIO: nuevo nombre
    }
  }
}