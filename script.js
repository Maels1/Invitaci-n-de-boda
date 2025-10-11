// script.js - Invitación de Boda con Brillos y Formulario
(function () {
  // === EFECTO DE BRILLITOS MÁGICOS ===
  function createSparkles() {
    const container = document.getElementById('sparkles-container');
    if (!container) return;

    // Limpiar en caso de recarga
    container.innerHTML = '';

    const count = 25; // Número de brillitos
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      
      // Posición aleatoria
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      
      // Tamaño aleatorio
      const size = 3 + Math.random() * 4;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      
      // Animación con retraso y duración aleatorios
      sparkle.style.animationDelay = `${Math.random() * 5}s`;
      sparkle.style.animationDuration = `${2 + Math.random() * 3}s`;
      
      container.appendChild(sparkle);
    }
  }

  // === MANEJO DEL FORMULARIO RSVP ===
  function setupForm() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const responseDiv = document.getElementById('formResponse');
      
      // Estado de carga
      const originalText = button.textContent;
      button.textContent = 'Enviando...';
      button.disabled = true;
      responseDiv.textContent = '';
      responseDiv.style.color = '';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          responseDiv.textContent = '¡Gracias por tu respuesta! 💍✨';
          responseDiv.style.color = '#d4af37';
          form.reset();
        } else {
          throw new Error('Error en el envío');
        }
      } catch (err) {
        responseDiv.textContent = '⚠️ Hubo un problema. Inténtalo más tarde.';
        responseDiv.style.color = '#ff6b6b';
      } finally {
        button.textContent = originalText;
        button.disabled = false;
      }
    });
  }

  // === INICIAR CUANDO EL DOM ESTÉ LISTO ===
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createSparkles();
      setupForm();
    });
  } else {
    createSparkles();
    setupForm();
  }
})();