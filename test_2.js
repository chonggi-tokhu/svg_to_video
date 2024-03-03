
function toDataURL0(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
function toDataURL(blob, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result);
    }
    reader.readAsDataURL(blob);
}
function img_width_height() {
    var rtv = { x: 540, y: 360 };
    rtv['x'] = (!isNaN(img_width_height().x)) ? img_width_height().x : rtv['x'];
    rtv['y'] = (!isNaN(img_width_height().y)) ? img_width_height().y : rtv['y'];
    return rtv;
}
var capturing = {
    el: null,
    canvas: null,
    encoded: '',
    format: 'image/png',
    imgEl: null,
    mode: 'html',
    svginner: '',
    SVGonCanvas: function (canvasid) {

        var el = (this.el instanceof HTMLElement) ? this.el : (typeof this.el === 'string') ? document.getElementById(this.el) : null;
        if (!(el instanceof HTMLElement)) {
            return false;
        }
        var thisobj = this;
        var c0 = document.getElementById("mycanvas");
        var c = document.getElementById(canvasid);
        var ctx = c.getContext("2d");

        var data = (this.mode === 'html') ? `<?xml version="1.0" standalone="no"?> 
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${img_width_height().x}" height="${img_width_height().y}"> <foreignObject width="${img_width_height().x}" height="${img_width_height().y}" x="0" y="0"><div xmlns="http://www.w3.org/1999/xhtml">${this.el.innerHTML}</div></foreignObject></svg>` : `<?xml version="1.0" standalone="no"?> 
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${img_width_height().x}" height="${img_width_height().y}">${this.svginner}</svg>`;
        console.log(data);

        var DOMURL = self.URL || self.webkitURL || self;
        var img = new Image();
        var svg = new Blob([data], {
            type: "image/svg+xml"
        });
        var url = DOMURL.createObjectURL(svg);
        img.onerror = function (e) {
            console.log(url)
        };
        img.onload = function () {
            DOMURL.revokeObjectURL(url);
            thisobj.encoded = c.toDataURL(thisobj.format);
        };
        /*var svgstream = new FileReader();
        svgstream.readAsDataURL(svg);*/
        /*img.src = 'data:image/svg+xml;base64,' + btoa(data);*/
        toDataURL(svg, function (param) {
            img.src = param;
            if (thisobj.imgEl instanceof HTMLImageElement) {
                thisobj.imgEl.src = param;
            }
        });
        return this.imgEl.src;
    },
    captureArea: function (canvasid, callbackfunc) {
        var el = (this.el instanceof HTMLElement) ? this.el : (typeof this.el === 'string') ? document.getElementById(this.el) : null;
        if (!(el instanceof HTMLElement) || typeof callbackfunc !== 'function') {
            return false;
        }
        this.SVGonCanvas(canvasid);
        var newStr = this.encoded;
        callbackfunc(newStr);
    },
    downloadBase64Image: function (filename) {
        if (typeof this.encoded !== 'string' || typeof filename !== 'string') {
            console.log(this.encoded)
            return false;
        }
        var str = this.encoded;
        var newLink = document.createElement("a");
        newLink.href = str;
        newLink.download = filename;
        console.log(newLink);
        newLink.click();
        return true;
    },
    capture: function ({ canvasid, download }) {
        var rtv = '';
        console.log(download);
        if (typeof download !== 'boolean') {
            download = false;
        }
        console.log(download);
        var format = this.format;
        var thisobj = this;
        var downloadExtension = '';
        if (typeof format !== 'string') {
            downloadExtension = 'png';
        } else {
            downloadExtension = (format.split('/').length == 2) ? (format.split('/')[1].split('+').length > 1) ? format.split('/')[1].split('+')[0] : format.split('/')[1] : format;
        }
        this.captureArea(canvasid, function (str) {
            if (download) {
                thisobj.downloadBase64Image('download' + '.' + downloadExtension);
            }
            rtv = str;
        });
        return rtv;
    },
    setFormat: function (format) {
        if (typeof format !== 'string') {
            format = 'image/png';
        }
        this.format = format;
        return this.format;
    },
    setEl: function (elparam, imgElparam, canvasparam) {
        this.el = (elparam instanceof HTMLElement) ? elparam : (typeof elparam == 'string') ? document.getElementById(elparam) : null;
        this.imgEl = (imgElparam instanceof HTMLElement) ? imgElparam : (typeof elparam == 'string') ? document.getElementById(imgElparam) : null;
        this.canvas = (canvasparam instanceof HTMLElement) ? canvasparam : (typeof elparam == 'string') ? document.getElementById(canvasparam) : null;
        return this.el;
    },
    changeMode(mode) {
        if (!(mode === 'html' || mode === 'svg')) {
            mode = 'html';
        }
        this.mode = mode;
        return mode;
    }
}