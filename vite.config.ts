import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }): UserConfig => {
    if (mode === "background") {
        return {
            publicDir: false,
            build: {
                outDir: "dist",
                emptyOutDir: false,
                rollupOptions: {
                    input: {
                        background: "background.ts",
                    },
                    output: {
                        format: "iife",
                        entryFileNames: "[name].js",
                    },
                },
            },
        };
    }

    return {
        plugins: [react()],
        build: {
            outDir: "dist",
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    content: "content.tsx",
                },
                output: {
                    format: "iife",
                    entryFileNames: "[name].js",
                },
            },
        },
    };
});