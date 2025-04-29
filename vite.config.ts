import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // base: "/wp-content/reactpress/apps/skb/dist/index.html",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    modules: {
      localsConvention: "dashes", // Разрешаем имена классов с тире и нижними подчёркиваниями
    },
    preprocessorOptions: {
      scss: {
        additionalData: (content: string, resourcePath: string) => {
          if (/App\.scss$/.test(resourcePath)) {
            return `
              @import "./variables/mixin.scss";
              @import "./variables/variables.scss";
              ${content}
            `;
          }

          return `
            @import "@/app/styles/variables/mixin.scss";
            @import "@/app/styles/variables/variables.scss";
            ${content}
          `;
        },
      },
    },
  },
  server: {
    port: 3000, // Устанавливаем порт 3000
  },
});
