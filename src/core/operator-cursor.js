// ==========================================
// 👻 src/core/operator-cursor.js (COMPLETO)
// ==========================================

/**
 * 👻 operator-cursor - A phantom cursor that navigates and interacts with web pages
 * Migrated and enhanced from BotCursor
 */
export class OperatorCursor {
  constructor(options = {}) {
    this.options = {
      // 🎨 Nuevo tema por defecto (púrpura en lugar de rosa)
      cursorSize: options.cursorSize || 24,
      animationSpeed: options.animationSpeed || 800,
      clickDuration: options.clickDuration || 200,
      hoverDelay: options.hoverDelay || 300,
      showTrail: options.showTrail !== false,
      cursorColor: options.cursorColor || '#6366f1',  // 👻 Púrpura fantasma
      trailColor: options.trailColor || 'rgba(99, 102, 241, 0.3)',
      sound: options.sound !== false,
      debug: options.debug || false
    };

    this.cursorElement = null;
    this.trailElements = [];
    this.isAnimating = false;
    this.currentPosition = { x: 0, y: 0 };
    this.animationQueue = [];
    
    this.init();
  }

  /**
   * Inicializar el cursor fantasma
   */
  init() {
    this.createCursor();
    this.injectStyles();
    if (this.options.debug) {
      console.log('[OperatorCursor] 👻 Phantom cursor initialized');
    }
  }

  /**
   * Crear el elemento del cursor fantasma
   */
  createCursor() {
    // Remover cursor existente si existe
    const existing = document.getElementById('operator-cursor');
    if (existing) existing.remove();

    // Crear cursor principal
    this.cursorElement = document.createElement('div');
    this.cursorElement.id = 'operator-cursor';
    this.cursorElement.className = 'operator-cursor';
    
    // 👻 Crear icono del cursor (puntero + bot indicator)
    this.cursorElement.innerHTML = `
      <div class="operator-cursor-pointer"></div>
      <div class="operator-cursor-indicator">🤖</div>
      <div class="operator-cursor-ripple"></div>
    `;

    // Posición inicial (fuera de pantalla)
    this.cursorElement.style.left = '-100px';
    this.cursorElement.style.top = '-100px';

    document.body.appendChild(this.cursorElement);
  }

  /**
   * Inyectar estilos CSS para el cursor fantasma
   */
  injectStyles() {
    if (document.getElementById('operator-cursor-styles')) return;

    const style = document.createElement('style');
    style.id = 'operator-cursor-styles';
    
    // 🎨 Colores dinámicos
    const primaryColor = this.options.cursorColor;
    const primaryRGB = this.hexToRgb(primaryColor);
    const lighterColor = this.lightenColor(primaryColor, 20);
    
   style.textContent = `
  /* 🤖 Operator Cursor Principal */
  .operator-cursor {
    position: fixed;
    width: ${this.options.cursorSize}px;
    height: ${this.options.cursorSize}px;
    pointer-events: none;
    z-index: 999999;
    transition: all ${this.options.animationSpeed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
    transform: scale(0);
  }

  .operator-cursor.visible {
    opacity: 1;
    transform: scale(1);
  }

  .operator-cursor.moving {
    transition-duration: ${this.options.animationSpeed}ms;
  }

  .operator-cursor.clicking {
    transform: scale(1.3);
    transition-duration: ${this.options.clickDuration}ms;
  }

  /* Puntero del cursor operador */
  .operator-cursor-pointer {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-left: 12px solid ${primaryColor};     
    border-top: 18px solid transparent;         
    border-bottom: 6px solid transparent;        
    transform-origin: 3px 6px;                   
    transition: transform 0.2s ease;
  }

  /* 🤖 Indicador operador */
  .operator-cursor-indicator {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, ${primaryColor}, ${lighterColor});
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(${primaryRGB}, 0.4);
    animation: operator-pulse 2s infinite;
  }

  /* Efecto ripple operador */
  .operator-cursor-ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid ${primaryColor};
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: all 0.3s ease;
  }

  .operator-cursor.clicking .operator-cursor-ripple {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }

  /* Rastro del cursor operador */
  .operator-cursor-trail {
    position: fixed;
    width: 4px;
    height: 4px;
    background: ${this.options.trailColor};
    border-radius: 50%;
    pointer-events: none;
    z-index: 999998;
    animation: operator-trail-fade 0.8s ease-out forwards;
  }

  /* Estados especiales */
  .operator-cursor.hovering .operator-cursor-pointer {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px ${primaryColor});
  }

  .operator-cursor.typing .operator-cursor-indicator {
    animation: operator-typing-pulse 0.5s infinite alternate;
  }

  /* 🤖 Animaciones operador */
  @keyframes operator-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes operator-trail-fade {
    0% { opacity: 0.6; transform: scale(1); }
    100% { opacity: 0; transform: scale(0); }
  }

  @keyframes operator-typing-pulse {
    0% { 
      transform: scale(1); 
      background: linear-gradient(135deg, ${primaryColor}, ${lighterColor}); 
    }
    100% { 
      transform: scale(1.2); 
      background: linear-gradient(135deg, #10b981, #34d399); 
    }
  }

  /* Efectos especiales para diferentes acciones */
  .operator-cursor.success .operator-cursor-indicator {
    background: linear-gradient(135deg, #10b981, #34d399);
    animation: operator-success-bounce 0.6s ease;
  }

  .operator-cursor.error .operator-cursor-indicator {
    background: linear-gradient(135deg, #ef4444, #f87171);
    animation: operator-error-shake 0.4s ease;
  }

  @keyframes operator-success-bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.4); }
  }

  @keyframes operator-error-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .operator-cursor {
      width: ${Math.max(16, this.options.cursorSize * 0.8)}px;
      height: ${Math.max(16, this.options.cursorSize * 0.8)}px;
    }
  }
`;

    document.head.appendChild(style);
  }

  // 🎨 Funciones auxiliares para colores
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) :
      '99, 102, 241'; // fallback púrpura
  }

  lightenColor(hex, percent) {
    const num = parseInt(hex.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  /**
   * Mover cursor a un elemento específico
   * @param {HTMLElement|string} target - Elemento o selector
   * @param {Object} options - Opciones de animación
   * @returns {Promise} - Promesa que se resuelve cuando termina la animación
   */
  async moveToElement(target, options = {}) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) {
      console.warn('[OperatorCursor] Elemento no encontrado:', target);
      return Promise.reject('Elemento no encontrado');
    }

    const rect = element.getBoundingClientRect();
    const targetPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    return this.moveTo(targetPos.x, targetPos.y, options);
  }

  /**
   * Mover cursor a coordenadas específicas
   * @param {number} x - Coordenada X
   * @param {number} y - Coordenada Y  
   * @param {Object} options - Opciones de animación
   * @returns {Promise} - Promesa que se resuelve cuando termina la animación
   */
  async moveTo(x, y, options = {}) {
    return new Promise((resolve) => {
      // Mostrar cursor si está oculto
      if (!this.cursorElement.classList.contains('visible')) {
        this.show();
      }

      // Crear rastro si está habilitado
      if (this.options.showTrail && this.currentPosition.x !== 0) {
        this.createTrail(this.currentPosition.x, this.currentPosition.y);
      }

      // Aplicar animación de movimiento
      this.cursorElement.classList.add('moving');
      this.cursorElement.style.left = `${x}px`;
      this.cursorElement.style.top = `${y}px`;

      // Actualizar posición actual
      this.currentPosition = { x, y };

      // Resolver promesa cuando termina la animación
      setTimeout(() => {
        this.cursorElement.classList.remove('moving');
        resolve();
      }, this.options.animationSpeed);

      if (this.options.debug) {
        console.log(`[OperatorCursor] Moviendo a (${x}, ${y})`);
      }
    });
  }

  /**
   * Simular click en la posición actual
   * @param {string} clickType - Tipo de click (click, dblclick, etc.)
   * @param {Object} options - Opciones del click
   * @returns {Promise} - Promesa que se resuelve cuando termina la animación
   */
  async performClick(clickType = 'click', options = {}) {
    return new Promise((resolve) => {
      // Animación de hover antes del click
      this.cursorElement.classList.add('hovering');
      
      setTimeout(() => {
        // Animación de click
        this.cursorElement.classList.remove('hovering');
        this.cursorElement.classList.add('clicking');
        
        // Sonido opcional
        if (this.options.sound) {
          this.playClickSound(clickType);
        }

        // Remover animación de click
        setTimeout(() => {
          this.cursorElement.classList.remove('clicking');
          resolve();
        }, this.options.clickDuration);

        if (this.options.debug) {
          console.log(`[OperatorCursor] Realizando ${clickType}`);
        }
      }, this.options.hoverDelay);
    });
  }

  /**
   * Simular typing en un input
   * @param {HTMLElement|string} target - Input element
   * @param {string} text - Texto a escribir
   * @param {number} speed - Velocidad de typing (ms entre caracteres)
   * @returns {Promise} - Promesa que se resuelve cuando termina
   */
  async performTyping(target, text, speed = 100) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return Promise.reject('Elemento no encontrado');

    // Mover al input
    await this.moveToElement(element);
    
    // Indicar que está escribiendo
    this.cursorElement.classList.add('typing');
    
    // Escribir letra por letra
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, speed));
      element.value = text.substring(0, i + 1);
      
      // Trigger input event
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    this.cursorElement.classList.remove('typing');
    
    if (this.options.debug) {
      console.log(`[OperatorCursor] Terminó de escribir: "${text}"`);
    }
  }

  /**
   * Mostrar estado de éxito
   */
  showSuccess() {
    this.cursorElement.classList.add('success');
    setTimeout(() => {
      this.cursorElement.classList.remove('success');
    }, 1000);
  }

  /**
   * Mostrar estado de error
   */
  showError() {
    this.cursorElement.classList.add('error');
    setTimeout(() => {
      this.cursorElement.classList.remove('error');
    }, 800);
  }

  /**
   * Crear elemento de rastro
   */
  createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'operator-cursor-trail';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    
    document.body.appendChild(trail);
    
    // Remover después de la animación
    setTimeout(() => {
      trail.remove();
    }, 800);
  }

  /**
   * Reproducir sonido de click (opcional)
   */
  playClickSound(clickType) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Fallar silenciosamente si no hay soporte de audio
    }
  }

  /**
   * Mostrar cursor
   */
  show() {
    this.cursorElement.classList.add('visible');
  }

  /**
   * Ocultar cursor
   */
  hide() {
    this.cursorElement.classList.remove('visible');
  }

  /**
   * Destruir cursor y limpiar
   */
  destroy() {
    if (this.cursorElement) {
      this.cursorElement.remove();
    }
    
    const styles = document.getElementById('operator-cursor-styles');
    if (styles) {
      styles.remove();
    }
    
    // Limpiar trails
    document.querySelectorAll('.operator-cursor-trail').forEach(trail => trail.remove());
    
    if (this.options.debug) {
      console.log('[OperatorCursor] Sistema destruido');
    }
  }

  // 👻 API públicos nuevos - Métodos con naming fantasma (más simple)
  async click(selector) {
    await this.moveToElement(selector);
    await this.performClick('click');
    return this;
  }

  async doubleClick(selector) {
    await this.moveToElement(selector);
    await this.performClick('dblclick');
    return this;
  }

  async type(selector, text, speed = 100) {
    await this.performTyping(selector, text, speed);
    return this;
  }

  async hover(selector) {
    await this.moveToElement(selector);
    this.cursorElement.classList.add('hovering');
    return this;
  }
}

