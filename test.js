function createSVG(svginner){
  if (typeof svginner !== 'string'){
    return false;
  }
  var newSVG_pr = document.createElement("svg");
  var newSVG = document.body.appendChild(newSVG_pr);
  newSVG.innerHTML = svginner;
  return newSVG;
}
function SVGonCanvas(elparam,format){
  
  var el = (elparam instanceof HTMLElement)?elparam: (typeof elparam === 'string')?document.getElementById(elparam):null;
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  if (typeof format !== 'string') {
    format='image/png';
  }
        var c0 = document.createElement("canvas");
  var c = document.body.appendChild(c0);
  c0.width=elparam.clientWidth;
  c0.height=elparam.clientHeight;
        var ctx = c.getContext("2d");

        var data = "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='150'>" +
            "<foreignObject width='100%' height='100%'>" + elparam.outerHTML +
            "</foreignObject>" +
            "</svg>";

        var DOMURL = self.URL || self.webkitURL || self;
        var img = new Image();
        var svg = new Blob([data], {
            type: "image/svg+xml;charset=utf-8"
        });
        var url = DOMURL.createObjectURL(svg);
        img.onerror = function (e) {
            console.log(url)
        };
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);
        };
        img.src = url;
  return c.toDataURL(format);
}
/* code below is from https://codepen.io/DespisWebStuff/pen/pojXdVO */
function _SVGtoOtherFormat_inBase64(svgEl,format){
  var rtv='test';
  if (!(svgEl instanceof HTMLElement)) {
    return false;
  }
  if (typeof format !== 'string') {
    format='image/png';
  }
  var svg = svgEl;
var svgData = new XMLSerializer().serializeToString( svg );
 
var canvas = document.body.appendChild(document.createElement( "canvas" ));
var ctx = canvas.getContext( "2d" );
  var DOMURL = self.URL || self.webkitURL || self;
  
        var svg2 = new Blob([svg.outerHTML], {
            type: "image/svg+xml;charset=utf-8"
        });
        var url = DOMURL.createObjectURL(svg2);
 
var img = new Image();

  img.onerror = function(e) {
    console.log(e);
    console.log(url);
  document.getElementById('body').innerHTML+='error'+rtv+e;
  }
img.onload = function() {
    ctx.drawImage( img, 0, 0 );
    
            DOMURL.revokeObjectURL(url);
    // Now is done
    console.log( canvas.toDataURL( format ) );
  rtv = canvas.toDataURL(format);
};
        
img.src = url;
  var img2 = document.body.appendChild(img);
img2.onload = function() {
    ctx.drawImage( img2, 0, 0 );
    
            DOMURL.revokeObjectURL(url);
    // Now is done
    console.log( canvas.toDataURL( format ) );
  rtv = canvas.toDataURL(format);
};
  globalThis['img2']=img2;
  console.log(img2);
  document.body.innerHTML+=rtv;
  return rtv;
}

function downloadBase64Image(base64_encoded_str,filename){
  if (typeof base64_encoded_str !== 'string' || typeof filename !== 'string'){
    return false;
  }
  var str = base64_encoded_str;
  var newLink = document.createElement("a");
  newLink.href=str;
  newLink.download=filename;
  newLink.click();
  return true;
}
function elInner_toSVG(elparam){
  var el = (elparam instanceof HTMLElement)?elparam: (typeof elparam === 'string')?document.getElementById(elparam):null;
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  var newSVGInner=`<foreignObject width="100%" height="100%">${elparam.outerHTML}</foreignObject>`;
  return createSVG(newSVGInner);
}
function captureArea(elparam,format,callbackfunc){
  var el = (elparam instanceof HTMLElement)?elparam: (typeof elparam === 'string')?document.getElementById(elparam):null;
  if (!(el instanceof HTMLElement) || typeof callbackfunc !== 'function') {
    return false;
  }
  var newSVG = elInner_toSVG(el);
  var newStr = SVGonCanvas(el,format);
  callbackfunc(newStr);
}
function capture(elparam,{ download, format }){
  var rtv='';
  var el = (elparam instanceof HTMLElement)?elparam: (typeof elparam === 'string')?document.getElementById(elparam):null;
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  if (typeof download !== 'boolean'){
    download=false;
  }
  var downloadExtension='';
  if (typeof format !=='string'){
    downloadExtension='image/png';
  } else {
  downloadExtension=(format.split('/').length==2)?(format.split('/')[1].split('+').length>1)?format.split('/')[1].split('+')[1]:format.split('/')[1]:format;}
  captureArea(el,format,function(str){
    if (download) {
      downloadBase64Image(str,'download'+'.'+downloadExtension);
    }
    rtv=str;
  });
  return rtv;
}

var capturing={
    el:null,
    canvas:null,
    encoded:'',
    format:'image/png',
    SVGonCanvas:function(format){
  
  var el = (this.el instanceof HTMLElement)?elparam: (typeof elparam === 'string')?document.getElementById(elparam):null;
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  if (typeof format !== 'string') {
    format='image/png';
  }
        var c0 = document.createElement("canvas");
  var c = document.body.appendChild(c0);
  c0.width=elparam.clientWidth;
  c0.height=elparam.clientHeight;
        var ctx = c.getContext("2d");

        var data = "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='150'>" +
            "<foreignObject width='100%' height='100%'>" + elparam.outerHTML +
            "</foreignObject>" +
            "</svg>";

        var DOMURL = self.URL || self.webkitURL || self;
        var img = new Image();
        var svg = new Blob([data], {
            type: "image/svg+xml;charset=utf-8"
        });
        var url = DOMURL.createObjectURL(svg);
        img.onerror = function (e) {
            console.log(url)
        };
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);
            this.encoded = c.toDataURL(format);
        };
        img.src = url;
        var thisobj = this;
  return function(){
    return thisobj.encoded;
  };
},
captureArea:function (format,callbackfunc){
  var el = (elparam instanceof HTMLElement)?elparam: (typeof elparam === 'string')?document.getElementById(elparam):null;
  if (!(el instanceof HTMLElement) || typeof callbackfunc !== 'function') {
    return false;
  }
  var newSVG = elInner_toSVG(el);
  var newStr = SVGonCanvas(el,format);
  callbackfunc(newStr);
},
capture:function(elparam,{ download, format }){
  var rtv='';
  var el = (elparam instanceof HTMLElement)?elparam: (typeof elparam === 'string')?document.getElementById(elparam):null;
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  if (typeof download !== 'boolean'){
    download=false;
  }
  var downloadExtension='';
  if (typeof format !=='string'){
    downloadExtension='png';
  } else {
  downloadExtension=(format.split('/').length==2)?(format.split('/')[1].split('+').length>1)?format.split('/')[1].split('+')[1]:format.split('/')[1]:format;}
  captureArea(el,format,function(str){
    if (download) {
      downloadBase64Image(str,'download'+'.'+downloadExtension);
    }
    rtv=str;
  });
  return rtv;
}
}