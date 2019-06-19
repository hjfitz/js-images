import {IImageRender} from "./interfaces"

/**
 * get height, width and HTMLImageElement instance for a given image URL
 * @param url image url
 */
export function getImgDims(url: string): Promise<IImageRender> {
	const img: HTMLImageElement = new Image()
	img.src = url
	return new Promise((res) => {
		img.onload = function onload() {
			const {width, height} = img
			res({img, width, height})
		}
	})
}

/**
 * get a b64 encoded image for a given file
 * @param img image file
 */
export function blobToB64(img: File): Promise<string | ArrayBuffer | null> {
	const reader = new FileReader()
	return new Promise((res, rej) => {
		reader.addEventListener("load", () => res(reader.result), false)
		reader.readAsDataURL(img)
		reader.onerror = rej
	})
}
