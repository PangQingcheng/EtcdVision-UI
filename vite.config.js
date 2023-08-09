import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // !!!!!!! 非常重要，否则打包后无法访问 !!!!!!!
  plugins: [vue(), nodePolyfills()],
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
  resolve: {
    alias: [
		{ find: /^~/, replacement: '' },
		{ find: '@', replacement: resolve(__dirname, './src') }
    ]
  },
})
