import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
	fs: {
		strict: false
	},
	proxy: {
	  '/api': {
	    target: 'http://localhost:8080', // 后端API的地址
	    changeOrigin: true,
	  }
	}
  },
})
