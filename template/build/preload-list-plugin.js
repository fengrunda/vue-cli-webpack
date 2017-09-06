var chunkSorter = require('html-webpack-plugin/lib/chunksorter.js');
function PreloadListPlugin(options) {
  // 使用配置（options）设置插件实例
}

PreloadListPlugin.prototype.apply = function (compiler) {
  // compiler.plugin('done', function() {
  //   console.log('Hello World!');
  // });
  // 设置回调来访问编译对象：
  // compiler.plugin("compilation", function(compilation) {

  //   // 现在设置回调来访问编译中的步骤：
  //   compilation.plugin("optimize", function() {
  //     console.log("Assets are being optimized.");
  //     // console.log(compilation.chunks);
  //   });
  // });

  compiler.plugin('emit', function (compilation, callback) {
    // 创建一个头部字符串：
    var filelist = [];
    var chunks = compilation.chunks;
    // 对chunks进行排序
    chunks = chunkSorter['dependency'](compilation.chunks, 'all');
    // 检查所有编译好的资源文件：
    // 为每个文件名新增一行
    for (var filename in compilation.assets) {
      // filelist += ('- '+ filename +'\n');
      // 获取后缀 start
      var index1 = filename.lastIndexOf(".");
      var index2 = filename.length;
      var postf = filename.substring(index1, index2);
      // 获取后缀 end

      // 筛选需要加载的静态资源 如图片和字体
      if (postf != '.js' && postf != '.map' && postf != '.html' && postf != '.css' && postf != '.gz') {
        filelist.push(filename);
      }
      else {

      }

    }
    // 将chunks里的脚本和样式加入列表中
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].name && chunks[i].name != 'preload') {
        for (let j = 0; j < chunks[i].files.length; j++) {
          let filename = chunks[i].files[j];
          var index1 = filename.lastIndexOf(".");
          var index2 = filename.length;
          var postf = filename.substring(index1, index2);
          if (postf == '.js') {
            filelist.push(filename);
          }
          else if (postf == '.css') {
            filelist.unshift(filename);
          }
        }
      }
    }

    // 把它作为一个新的文件资源插入到 webpack 构建中：
    compilation.assets['static/filelist.json'] = {
      source: function () {
        return JSON.stringify(filelist);
      },
      size: function () {
        return JSON.stringify(filelist).length;
      }
    };

    callback();
  });

  // compiler.plugin('compilation', function(compilation) {
  //   // console.log('The compiler is starting a new compilation...');

  //   compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
  //     console.log('html-webpack-plugin-before-html-processing');
  //     htmlPluginData.html += 'The magic footer';
  //     callback(null, htmlPluginData);
  //   });
  // });
};

module.exports = PreloadListPlugin;