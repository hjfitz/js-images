"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
/**
 * resize and compress a given image
 * @param imgUrl image url to modify
 * @param opts options for new image
 */
function modify(imgUrl, opts) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, img, height, width, canvas, ctx, newImg, scalingFactor, newWidth, scalingFactor, newHeight;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, util_1.getImgDims(imgUrl)];
                case 1:
                    _a = _b.sent(), img = _a.img, height = _a.height, width = _a.width;
                    canvas = document.createElement('canvas');
                    ctx = canvas.getContext('2d');
                    if (!ctx)
                        return [2 /*return*/, Promise.reject('oof')
                            // scale to height and width
                        ];
                    // scale to height and width
                    if (opts.height && opts.width) {
                        ctx.drawImage(img, 0, 0, opts.height, opts.width);
                    }
                    // scale (proportioanlly to height)
                    if (opts.height && !opts.width) {
                        scalingFactor = height / opts.height;
                        newWidth = width / scalingFactor;
                        ctx.drawImage(img, 0, 0, opts.height, newWidth);
                    }
                    // scale (proportionally to width)
                    if (!opts.height && opts.width) {
                        scalingFactor = width / opts.width;
                        newHeight = height / scalingFactor;
                        ctx.drawImage(img, 0, 0, newHeight, opts.width);
                    }
                    // change quality
                    if (opts.quality && opts.quality <= 1 && opts.quality >= 0) {
                        newImg = canvas.toDataURL('image/jpeg', opts.quality);
                    }
                    else {
                        newImg = canvas.toDataURL('image/png');
                    }
                    return [2 /*return*/, new Promise(function (res, rej) {
                            // return <img> or just a b64 url
                            if (opts.format === 'dom') {
                                var elem_1 = document.createElement('img');
                                elem_1.src = newImg;
                                elem_1.onload = function () { return res(elem_1); };
                                elem_1.onerror = rej;
                            }
                            else if (opts.format === 'file') {
                                // make file
                                canvas.toBlob(function (blobFile) {
                                    if (!blobFile)
                                        return rej('unable to convert image to file');
                                    var imgFile = new File([blobFile], 'created with js-images');
                                    res(imgFile);
                                });
                            }
                            else {
                                res(newImg);
                            }
                        })];
            }
        });
    });
}
/**
 *
 * @param img image element or url (normal ot base64)
 * @param opts image modification options
 */
function polyModify(img, opts) {
    return __awaiter(this, void 0, void 0, function () {
        var b64Img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // if nothing, die
                    if (!img)
                        return [2 /*return*/, Promise.reject('no image given')];
                    if (!(img instanceof HTMLInputElement && img.files)) return [3 /*break*/, 2];
                    return [4 /*yield*/, util_1.blobToB64(img.files[0])];
                case 1:
                    b64Img = _a.sent();
                    if (typeof b64Img === 'string')
                        return [2 /*return*/, modify(b64Img, opts)];
                    _a.label = 2;
                case 2:
                    // if string, well done! 
                    if (typeof img === 'string') {
                        return [2 /*return*/, modify(img, opts)];
                    }
                    return [2 /*return*/, Promise.reject('should not get here')];
            }
        });
    });
}
exports.default = polyModify;
//# sourceMappingURL=index.js.map