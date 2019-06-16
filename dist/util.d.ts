import { IImageRender } from './interfaces';
/**
 * get height, width and HTMLImageElement instance for a given image URL
 * @param url image url
 */
export declare function getImgDims(url: string): Promise<IImageRender>;
/**
 * get a b64 encoded image for a given file
 * @param img image file
 */
export declare function blobToB64(img: File): Promise<string | ArrayBuffer | null>;
