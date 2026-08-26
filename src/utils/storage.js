import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

// En el APK usa Preferences (almacenamiento nativo); en el navegador usa localStorage.
// En ambos casos los datos viven en el dispositivo: la app no requiere internet.
const esNativo = () => Capacitor.isNativePlatform();

export async function leer(clave) {
  try {
    if (esNativo()) {
      const { value } = await Preferences.get({ key: clave });
      return value ? JSON.parse(value) : null;
    }
    const v = localStorage.getItem(clave);
    return v ? JSON.parse(v) : null;
  } catch (e) {
    return null;
  }
}

export async function guardar(clave, valor) {
  const texto = JSON.stringify(valor);
  try {
    if (esNativo()) await Preferences.set({ key: clave, value: texto });
    else localStorage.setItem(clave, texto);
  } catch (e) { /* almacenamiento lleno o no disponible */ }
}
