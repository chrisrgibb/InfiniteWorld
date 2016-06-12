//node  node_modules/.bin/r.js -o build.js
({
    baseUrl: "./src",
    name: "app",
    out: "main-built.js",
    paths: {
        hbs : '../node_modules/require-handlebars-plugin/hbs'
    }
})