import { defineConfig } from "tsup";

export default defineConfig({
    name: "tsup",
    target: "node14",
    entry: ["src/index.ts"],
    minify: true,
    sourcemap: true,
    outDir: "dist",
});
