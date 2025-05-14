import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'Mes',
      fileName: 'mes',
    },
  },
})
