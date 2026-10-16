import react from '@vitejs/plugin-react'
import { defineConfig, type ProxyOptions } from 'vite'

// O servidor da Econverse não envia cabeçalho de CORS, então o JSON passa por um proxy
// (em produção, o mesmo rewrite está no vercel.json)
const productsProxy: Record<string, ProxyOptions> = {
  '/api/produtos': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: () => '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { proxy: productsProxy },
  preview: { proxy: productsProxy },
})
