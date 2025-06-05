// ==========================================
// 🤖 src/core/operator-integration.js (equivalente a ghost-integration.js)
// ==========================================

import { OperatorCursor } from './operator-cursor.js';

/**
 * 🤖 Integración del cursor operador con el sistema de efectos
 * Equivalente a GhostCursorIntegration pero para OperatorCursor
 */
export class OperatorCursorIntegration {
  static instance = null;
  
  static getInstance(options = {}) {
    if (!this.instance) {
      this.instance = new OperatorCursor(options);
    }
    return this.instance;
  }
  
  /**
   * Ejecutar acción completa: mover cursor y simular evento
   * @param {HTMLElement|string} target - Elemento objetivo
   * @param {string} eventType - Tipo de evento
   * @param {Object} options - Opciones
   * @returns {Promise} - Promesa que se resuelve cuando termina
   */
  static async executeAction(target, eventType, options = {}) {
    const cursor = this.getInstance(options.cursorOptions);
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!element) {
      cursor.showError();
      return Promise.reject('Elemento no encontrado');
    }
    
    try {
      // Mover cursor al elemento
      await cursor.moveToElement(element, options.moveOptions);
      
      // Simular hover/click según el tipo de evento
      switch (eventType) {
        case 'click':
        case 'dblclick':
          await cursor.performClick(eventType, options.clickOptions);
          break;
          
        case 'mouseenter':
          cursor.cursorElement.classList.add('hovering');
          await new Promise(resolve => setTimeout(resolve, 500));
          break;
          
        case 'mouseleave':
          cursor.cursorElement.classList.remove('hovering');
          break;
          
        case 'input':
          if (options.text) {
            await cursor.performTyping(element, options.text, options.typingSpeed);
          }
          break;
          
        default:
          await cursor.performClick('click', options.clickOptions);
      }
      
      cursor.showSuccess();
      return Promise.resolve();
      
    } catch (error) {
      cursor.showError();
      return Promise.reject(error);
    }
  }
  
  /**
   * Secuencia de acciones múltiples
   * @param {Array} actions - Array de acciones {target, eventType, options}
   * @param {number} delay - Delay entre acciones
   * @returns {Promise} - Promesa que se resuelve cuando terminan todas
   */
  static async executeSequence(actions, delay = 1000) {
    for (const action of actions) {
      await this.executeAction(action.target, action.eventType, action.options);
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  /**
   * 🤖 Destruir instancia y limpiar recursos
   */
  static destroy() {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  }
  
  /**
   * 🤖 Verificar si hay una instancia activa
   * @returns {boolean} - true si hay instancia activa
   */
  static hasActiveInstance() {
    return this.instance !== null;
  }
  
  /**
   * 🤖 Configurar opciones globales para nuevas instancias
   * @param {Object} options - Opciones por defecto
   */
  static setDefaultOptions(options) {
    this.defaultOptions = { ...options };
  }
  
  /**
   * 🤖 Obtener configuración actual de la instancia
   * @returns {Object|null} - Opciones de la instancia o null
   */
  static getCurrentConfig() {
    return this.instance ? this.instance.options : null;
  }
}