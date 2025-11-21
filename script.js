// script.js - Invitación de Boda Completa
(function () {
  // === PRE-LOADER: ABRIR SOBRE ===
  const envelopeCover = document.getElementById('envelope-cover');
  const mainContent = document.getElementById('main-content');
  const body = document.body;

  if (envelopeCover && mainContent) {
    body.classList.add('pre-loader-active');

    const openEnvelope = () => {
      envelopeCover.classList.add('opening');
      
      setTimeout(() => {
        envelopeCover.style.opacity = '0';
        envelopeCover.style.visibility = 'hidden';
        mainContent.classList.add('visible');
        body.classList.remove('pre-loader-active');
        
        // Iniciar efectos
        createSparkles();
        if (document.getElementById('countdown-display')) initCountdown();
        setupForm();
      }, 800);
    };

    envelopeCover.addEventListener('click', openEnvelope);
    envelopeCover.addEventListener('touchstart', openEnvelope, { passive: true });
  }

  // === BRILLITOS ===
  function createSparkles() {
    const container = document.getElementById('sparkles-container');
    if (!container) return;
    container.innerHTML = '';
    const count = 25;
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      const size = 3 + Math.random() * 4;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.animationDelay = `${Math.random() * 5}s`;
      sparkle.style.animationDuration = `${2 + Math.random() * 3}s`;
      container.appendChild(sparkle);
    }
  }

  // === FORMULARIO ===
  function setupForm() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const responseDiv = document.getElementById('formResponse');
      const originalText = button.textContent;
      button.textContent = 'Enviando...';
      button.disabled = true;
      responseDiv.textContent = '';
      responseDiv.style.color = '';
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action.trim(), {
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

  // === CONTADOR ===
  function initCountdown() {
    const weddingDate = new Date('2025-12-27T19:00:00').getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = weddingDate - now;
      if (diff <= 0) {
        document.getElementById('countdown-display').innerHTML = 
          '<div class="highlight" style="grid-column: span 8; font-size: 1.4rem; text-align: center; padding: 1rem; color: #d4af37;">¡Hoy es nuestro gran día! 💍✨</div>';
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const els = ['days', 'hours', 'minutes', 'seconds'];
      [days, hours, minutes, seconds].forEach((val, i) => {
        const el = document.getElementById(els[i]);
        if (el) el.textContent = String(val).padStart(2, '0');
      });
    };
    update();
    setInterval(update, 1000);
  }
  // === REPRODUCTOR DE MÚSICA ===
(function () {
  const audio = document.getElementById('wedding-music');
  const btn = document.getElementById('play-pause-btn');
  const mainContent = document.getElementById('main-content');

  if (!audio || !btn) return;

  // Iniciar música SOLO cuando se abra el sobre
  const startMusic = () => {
    // Mostrar el botón con animación suave
    document.getElementById('music-control').style.opacity = '1';
    document.getElementById('music-control').style.visibility = 'visible';

    // Intentar reproducir (puede fallar en móviles sin interacción)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Si falla (típico en iOS/Android), esperar a que el usuario haga clic
        btn.style.opacity = '1';
        btn.disabled = false;
      });
    }

    // Sincronizar botón
    updateButtonState();
  };

  const togglePlay = () => {
    if (audio.paused) {
      audio.play().then(() => {
        updateButtonState();
      }).catch(() => {
        // Si no se puede reproducir, no hacer nada (esperar interacción)
      });
    } else {
      audio.pause();
      updateButtonState();
    }
  };

  const updateButtonState = () => {
    if (audio.paused) {
      btn.classList.remove('playing');
    } else {
      btn.classList.add('playing');
    }
  };

  // Eventos
  btn.addEventListener('click', togglePlay);
  audio.addEventListener('play', updateButtonState);
  audio.addEventListener('pause', updateButtonState);

  // Iniciar música cuando se abra la invitación
  const observer = new MutationObserver(() => {
    if (mainContent.classList.contains('visible')) {
      startMusic();
      observer.disconnect();
    }
  });
  observer.observe(mainContent, { attributes: true, attributeFilter: ['class'] });
})();
})();