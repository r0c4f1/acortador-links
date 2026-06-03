const urlInput = document.getElementById('urlInput');
const acortarBtn = document.getElementById('acortarBtn');
const resultado = document.getElementById('resultado');
const urlCorta = document.getElementById('urlCorta');
const copiarBtn = document.getElementById('copiarBtn');
const errorDiv = document.getElementById('error');
const historialDiv = document.getElementById('historial');

acortarBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();

  if (!url) {
    mostrarError('Por favor, ingresa una URL.');
    return;
  }

  acortarBtn.disabled = true;
  acortarBtn.textContent = 'Acortando...';
  ocultarError();
  ocultarResultado();

  try {
    const res = await fetch('/api/enlaces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (!res.ok) {
      mostrarError(data.error || 'Error al acortar el enlace.');
      return;
    }

    urlCorta.value = data.url_corta;
    resultado.classList.remove('hidden');
    urlInput.value = '';
    cargarHistorial();
  } catch {
    mostrarError('Error de conexión. Intenta de nuevo.');
  } finally {
    acortarBtn.disabled = false;
    acortarBtn.textContent = 'Acortar';
  }
});

copiarBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(urlCorta.value);
    copiarBtn.textContent = '¡Copiado!';
    setTimeout(() => {
      copiarBtn.textContent = 'Copiar';
    }, 2000);
  } catch {
    alert('No se pudo copiar al portapapeles. Copia manualmente.');
  }
});

async function cargarHistorial() {
  try {
    const res = await fetch('/api/enlaces');
    const enlaces = await res.json();

    if (enlaces.length === 0) {
      historialDiv.innerHTML = '<p class="text-gray-500 text-sm">No hay links acortados aún.</p>';
      return;
    }

    const tabla = document.createElement('table');
    tabla.className = 'w-full text-sm';
    tabla.innerHTML = `
      <thead>
        <tr class="text-left text-gray-500 border-b">
          <th class="pb-2 pr-4">URL Corta</th>
          <th class="pb-2 pr-4">Original</th>
          <th class="pb-2 text-center">Clicks</th>
          <th class="pb-2 text-right">Creado</th>
        </tr>
      </thead>
      <tbody>
        ${enlaces.map(e => `
          <tr class="border-b border-gray-100 hover:bg-gray-50">
            <td class="py-2 pr-4">
              <a href="/${e.codigo_corto}" target="_blank" class="text-blue-600 hover:underline font-mono text-xs">
                /${e.codigo_corto}
              </a>
            </td>
            <td class="py-2 pr-4 max-w-xs truncate text-gray-600">${e.url_original}</td>
            <td class="py-2 text-center font-medium">${e.clicks}</td>
            <td class="py-2 text-right text-gray-500 text-xs">${new Date(e.created_at).toLocaleDateString()}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    historialDiv.innerHTML = '';
    historialDiv.appendChild(tabla);
  } catch {
    historialDiv.innerHTML = '<p class="text-red-500 text-sm">Error al cargar el historial.</p>';
  }
}

function mostrarError(msg) {
  errorDiv.textContent = msg;
  errorDiv.classList.remove('hidden');
}

function ocultarError() {
  errorDiv.classList.add('hidden');
}

function ocultarResultado() {
  resultado.classList.add('hidden');
}

cargarHistorial();
