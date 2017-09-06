// import { xhrService } from './api/xhr'
let urlArr = [];
// let [totalSizeArr, loadedArr] = [[], []]
/**
 * XMLHttpRequest
 * @param {*String} url 请求地址
 * @param {*Function} progress 加载进度回调
 */
function xhrService(url, progress) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onload = function () {
            // console.log(xhr.readyState, xhr.status)
            // console.log(xhr.responseText)
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = xhr.responseText;
                try {
                    data = JSON.parse(data);
                }
                catch (e) {
                    // alert(`onload:${e}`)
                }
                resolve(data);
            } else {
                reject(xhr.statusText)
            }

        }
        xhr.onerror = function () {
            // console.log(xhr.statusText)
            reject(xhr.statusText)
        }
        // xhr.onprogress = (event) => {
        //     if (event.lengthComputable) {
        //         var percentComplete = event.loaded / event.total;
        //         console.log(`percentComplete:${percentComplete}`)
        //     }
        // }
        xhr.onprogress = progress;
        xhr.onabort = function (event) {
            console.log(`abort`,event)
            reject()
        }
        xhr.onloadstart = function (event) {
            console.log(`onloadstart`,event)
        }
    });
};
/**
 * 加载所有静态资源
 * urlObjArr = [{
        url: urlArr[i],
        total: 0,
        loaded: 0
    }]
 * @param {*Array} urlObjArr 
 */
function loadAssets(urlObjArr) {
    // 所有请求的Promise数组
    const assetsPromises = urlObjArr.map(function (val, index, arr) {
        // 返回每个请求的Promise对象
        return xhrService(val.url, function (xhrEvent) {
            // https://xhr.spec.whatwg.org/#progressevent
            if (xhrEvent.lengthComputable) {
                // console.log(xhrEvent)
                // val.percentComplete = xhrEvent.loaded / xhrEvent.total;
                val.loaded = xhrEvent.loaded;
                val.total = xhrEvent.total;
                // console.log(`percentComplete:${percentComplete}`)
                let [total, loaded] = [1, 0];
                let isAllStart = true;
                // 遍历所有请求的当前状态，统计当前已加载字节和所有请求的总字节
                for (let i = 0; i < arr.length; i++) {
                    let obj = arr[i];
                    loaded += obj.loaded;
                    total += obj.total;
                    if (obj.total == 0) {
                        isAllStart = false;
                        break;
                    }
                }
                // 当所有请求的onprogress事件都有响应时，当前已加载字节和所有请求的总字节才是真实的数据
                if (isAllStart) {
                    console.log(loaded, total, Math.round(loaded / total * 100) + '%')
                    try {
                        document.getElementById('percentage').innerHTML = Math.round(loaded / total * 100) + '%';
                    }
                    catch(e){
                        
                    }
                }
            }
        }).then(function (data) {
            // 将css添加到dom
            if (getPostf(val.url) == '.css') {
                addStyle(val.url);
            }
        }).catch(function (reason) {
            alert(`xhrService:${reason}`)
        });
    });
    return Promise.all(assetsPromises)
}
/**
 * 将js添加到dom
 * @param {*String} url 
 */
function addScript(url) {
    var oBody = document.getElementsByTagName('body').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = url;
    oBody.appendChild(oScript);
}
/**
 * 将css添加到dom
 * @param {*String} url 
 */
function addStyle(url) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oLink = document.createElement("link");
    oLink.type = "text/css";
    oLink.rel = "stylesheet";
    oLink.href = url;
    oHead.appendChild(oLink);
}
/**
 * 获取后缀
 * @param {*String} url 
 */
function getPostf(url) {
    var index1 = url.lastIndexOf(".");
    var index2 = url.length;
    var postf = url.substring(index1, index2);
    return postf;
}

// 一切的开端
xhrService('./static/filelist.json?timestamp=' + (new Date()).valueOf()).then(function (data) {
    //   xhrService()
    urlArr = data
    // alert(`urlArr:${JSON.stringify(urlArr)}`)
    let urlObjArr = [];
    for (let i = 0; i < urlArr.length; i++) {
        // 创建静态资源对象
        let obj = {
            url: urlArr[i],
            total: 0,
            loaded: 0
        }
        urlObjArr.push(obj);
    }
    loadAssets(urlObjArr).then(function (data) {
        for (let i = 0; i < urlObjArr.length; i++) {
            let obj = urlObjArr[i];
            var postf = getPostf(obj.url);//后缀名
            if (postf == '.js') {
                addScript(obj.url);
            }
        }
    }).catch(function (reason) {
        alert(`loadAssets:${reason}`)
    })
});