module.exports = {
    entryPoints: [
        "./src/global.d.ts",
        "./src/Stopwatch.ts",
        "./src/Stopwatch.AlarmType.ts",
        "./src/Stopwatch.Degree.ts"
    ],
    out: "docs",
    plugin: "./node_modules/typedoc-theme-hierarchy/dist/index.js",
    theme: "hierarchy",
    excludePrivate: true
}