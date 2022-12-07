import path from 'path'
import { defineConfig } from 'vite'
import Vue2 from '@vitejs/plugin-vue2'
import AutoImport from 'unplugin-auto-import/vite'

const myPlugin = () => ({
	name: 'configure-server',
	configureServer(server) {
		server.httpServer.keepAlive = true;
		server.httpServer.httpAllowHalfOpen = true;
		server.httpServer.keepAliveTimeout = 999999;
		console.log(server.httpServer)
	},
})

const config = defineConfig({
	resolve: {
		alias: {
			'@': `${path.resolve(__dirname, 'src')}`,
			'~': `${path.resolve(__dirname)}`,
		},
		dedupe: ['vue-demi'],
	},

	build: {
		minify: true,
	},

	plugins: [
		myPlugin(),
		Vue2(),
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'@vueuse/core',
			],
			dts: 'src/auto-imports.d.ts',
		}),
	],

	server: {
		port: 2003,
		host: '0.0.0.0',

	},
})

export default config
