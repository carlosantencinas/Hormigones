import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Hormigones/',  // ¡Esto es lo importante!
  plugins: [react()],
})