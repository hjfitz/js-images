"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * get height, width and HTMLImageElement instance for a given image URL
 * @param url image url
 */
function getImgDims(url) {
    var img = new Image();
    img.src = url;
    return new Promise(function (res) {
        img.onload = function onload() {
            var width = img.width, height = img.height;
            res({ img: img, width: width, height: height });
        };
    });
}
exports.getImgDims = getImgDims;
/**
 * get a b64 encoded image for a given file
 * @param img image file
 */
function blobToB64(img) {
    var reader = new FileReader();
    return new Promise(function (res, rej) {
        reader.addEventListener('load', function () { return res(reader.result); }, false);
        reader.readAsDataURL(img);
        reader.onerror = rej;
    });
}
exports.blobToB64 = blobToB64;
//# sourceMappingURL=util.js.map