// https://github.com/michael-ciniawsky/postcss-load-config
{{#sprite}}
var config = require('./config')
const spriteOption = {
  basePath: './src',
  spritePath: './src/assets/images',
  spritesmith: {
    // algorithm: 'binary-tree',
    algorithm: 'left-right',
    padding: 10
  },
  //只有放在assets/images/sprites里面的图片才会被合并成雪碧图
  filterBy: function (image) {
    // Allow only png files
    // console.log(image)
    if (image.url.indexOf('sprites') === -1) {
      return Promise.reject();
    }
    else {
      if (!/\.png$/.test(image.url)) {
        return Promise.reject();
      }
    }
    return Promise.resolve();
  },
  //按照component分组
  groupBy: function (image) {
    var groupsName = 'unknow';
    try {
      groupsName = image.styleFilePath.split('\\').slice(-1)[0].split('.vue')[0]
    }
    catch (e) {
      console.error(e);
    }
    // console.log(groupsName)
    return Promise.resolve(groupsName);
  },
  hooks: {
    onUpdateRule: function (rule, token, image) {
      var originalUrl = image.originalUrl;
      var scale = 1;
      // 获取样式中图片的缩放比例
      try {
        scale = parseFloat(getUrlVar(originalUrl, 'scale'));
      }
      catch (e) {

      }
      var retina = image.retina,
        ratio = image.ratio,
        coords = image.coords,
        spriteUrl = image.spriteUrl,
        spriteWidth = image.spriteWidth,
        spriteHeight = image.spriteHeight;

      // 使用百分比来定位图片
      var posX = (coords.width - spriteWidth) == 0 ? 0 : (coords.x / (coords.width - spriteWidth) * -100);
      posX = posX == 0 ? 0 : posX.toFixed(2);
      var posY = (coords.height - spriteHeight) == 0 ? 0 : (coords.y / (coords.height - spriteHeight) * -100);
      posY = posY == 0 ? 0 : posY.toFixed(2);
      // 设置图片缩放
      var sizeX = spriteWidth / ratio * scale;
      var sizeY = spriteHeight / ratio * scale;

      token.cloneAfter({
        type: 'decl',
        prop: 'background-image',
        value: 'url(' + spriteUrl + ')'
      }).cloneAfter({
        prop: 'background-position',
        value: posX + '% ' + posY + '%'
      }).cloneAfter({
        prop: 'background-size',
        value: sizeX + 'px ' + sizeY + 'px'
      }).cloneAfter({
        prop: 'background-repeat',
        value: 'no-repeat'
      });
    },
    // onSaveSpritesheet: function (opts, spritesheet) {
    //   // We assume that the groups is not an empty array
    //   var filenameChunks = spritesheet.groups.concat(spritesheet.extension);
    //   console.log(opts.spritePath)
    //   return path.join(opts.spritePath, filenameChunks.join('.'));
    // }
  }
}
/**
 * 获取url所有参数
 * @param {*String} url 路径
 */
const getUrlVars = function(url) {
  var vars = [], hash;
  var hashes = url.slice(url.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
/**
 * 获取url某个参数
 * @param {*String} url 路径
 * @param {*String} name 参数名
 */
const getUrlVar = function(url, name) {
  return getUrlVars(url)[name];
}
{{/sprite}}
module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    {{#sprite}}
    'postcss-sprites': process.env.NODE_ENV === 'production' ? spriteOption : false,
    // "postcss-sprites": spriteOption,
    {{/sprite}}
    {{#rem}}
    "postcss-px2rem": { remUnit: 37.5, baseDpr: 1 },
    {{/rem}}
  }
}
