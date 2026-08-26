// Registro del service worker: permite abrir la app sin conexion
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js').catch(function () {});
  });
}
