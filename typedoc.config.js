module.exports = {
    entryPoints: [
        "./src/global.d.ts",
        "./src/Stopwatch.ts",
        "./src/Stopwatch.AlarmType.ts",
        "./src/Stopwatch.Degree.ts"
    ],
    out: "docs",
    excludePrivate: true
}