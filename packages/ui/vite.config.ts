// packages/ui/vite.config.ts
import { defineConfig } from "vite"
import { generateVueConfig } from "../build/build.config"

export default defineConfig(({ mode }) => generateVueConfig({ mode }))
