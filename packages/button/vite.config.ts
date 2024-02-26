// packages/button/vite.config.ts
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
	// 增加插件的使用
	plugins: [vue()],
	build: {
		lib: {
			entry: "./src/index.ts",
			name: "ChenwduiButton",
			fileName: "chenwdui-button"
		},
		minify: false,
		rollupOptions: {
			external: [
				// 除了 @chenwdui/shared，未来可能还会依赖其他内部模块，不如用正则表达式将 @chenwdui 开头的依赖项一起处理掉
				/@chenwdui.*/,
				"vue"
			]
		}
	}
})
