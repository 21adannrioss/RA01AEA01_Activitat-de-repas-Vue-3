// Escric la configuració del projecte
import { defineConfig } from 'vite'
// Importació del plugin de Vue, que permet que Vite entengui els fitxers .vue
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Activació del plugin de Vue per poder fer servir components .vue al projecte
  plugins: [vue()],
})