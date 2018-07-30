let mix = require("laravel-mix");

require("laravel-mix-eslint");

if (mix.inProduction()) {
  mix.version();
}

mix
  .copy("node_modules/open-iconic/font/fonts", "public/fonts")
  .react("resources/assets/js/app.js", "public/js").eslint({
    fix: false,
    cache: false,
    quiet: true,
  })
  .sass("resources/assets/sass/app.scss", "public/css")
  .sourceMaps();
