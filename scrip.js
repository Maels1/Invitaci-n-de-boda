// === BRILLITOS MÁGICOS ===
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('sparkles-container');
  if (!container) return;

  const sparkleCount = 25;

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    
    const size = 3 + Math.random() * 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    const delay = Math.random() * 5;
    const duration = 2 + Math.random() * 3;
    sparkle.style.animation = `fadeInOut ${duration}s ${delay}s infinite`;
    
    container.appendChild(sparkle);
  }
});

// === FORMULARIO RSVP ===
document.getElementById('rsvpForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const responseDiv = document.getElementById('formResponse');
  const button = form.querySelector('button[type="submit"]');

  const originalText = button.textContent;
  button.textContent = 'Enviando...';
  button.disabled = true;
  responseDiv.textContent = '';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      responseDiv.textContent = '¡Gracias por tu respuesta! 💍✨';
      responseDiv.style.color = '#d4af37';
      form.reset();
    } else {
      throw new Error('Error en el envío');
    }
  } catch (err) {
    responseDiv.textContent = '⚠️ Error. Por favor, inténtalo más tarde.';
    responseDiv.style.color = '#ff6b6b';
  } finally {
    button.textContent = originalText;
    button.disabled = false;
  }
});