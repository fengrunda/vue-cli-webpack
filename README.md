# fengrunda's vue-webpack-boilerplate

> A modified vue-cli template with additional some options, forked from the official [vue-webpack-boilerplate](https://github.com/vuejs-templates/webpack).

## Documentation

- Just read the [offical documents](http://vuejs-templates.github.io/webpack). It's the same.

## What's Modified

- Vuex included.
- LESS and LESS-loader included.
- rem solution included, base on [lib-flexible](https://github.com/amfe/lib-flexible/tree/master) and [px2rem-postcss](https://github.com/songsiqi/px2rem-postcss), Click [px2rem](https://github.com/songsiqi/px2rem) for more configurations.
- sprite image solution included, base on [postcss-sprites](https://github.com/2createStudio/postcss-sprites), Click [spritesmith](https://github.com/Ensighten/spritesmith) for more configurations.
- imagemin solution included, base on [img-loader](https://github.com/thetalecrafter/img-loader), Click [imagemin](https://github.com/imagemin/imagemin) for more configurations.
- assets preload solution included.
- Customized port for development environment. The default port is 9001.

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init fengrunda/vue-cli-webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```

Webpack uses port 9001 on default. Also,You can change it in `/config/index.js`. Just like the official template, if the port is already used, `npm run dev` will fail.

Besides `npm run dev`, these scripts also included:

- `npm run build`: Production ready build.
- `npm run unit`: Unit tests run in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack).
- `npm run e2e`: End-to-end tests with [Nightwatch](http://nightwatchjs.org/).

