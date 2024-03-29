import {IImageRender, IModifyOptions} from "./interfaces";
import {blobToB64, getImgDims} from "./util";

type ImgInput = string | HTMLInputElement
type ImgRet = string | HTMLImageElement | File

/**
 * resize and compress a given image
 * @param imgUrl image url to modify
 * @param opts options for new image
 */
async function modify(imgUrl: string, opts: IModifyOptions): Promise<ImgRet> {
	const {img, height, width}: IImageRender = await getImgDims(imgUrl)
	const canvas: HTMLCanvasElement = document.createElement("canvas")
	const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
	let newImg: string;
	if (!ctx) return Promise.reject("oof")
	// scale to height and width
	if (opts.height && opts.width) {
		ctx.drawImage(img, 0, 0, opts.height, opts.width)
	}

	// scale (proportioanlly to height)
	if (opts.height && !opts.width) {
		const scalingFactor: number = height / opts.height
		const newWidth: number = width / scalingFactor
		ctx.drawImage(img, 0, 0, opts.height, newWidth)
	}

	// scale (proportionally to width)
	if (!opts.height && opts.width) {
		const scalingFactor: number = width / opts.width
		const newHeight: number = height / scalingFactor
		ctx.drawImage(img, 0, 0, newHeight, opts.width)
	}

	// change quality
	if (opts.quality && opts.quality <= 1 && opts.quality >= 0) {
		newImg = canvas.toDataURL("image/jpeg", opts.quality)
	} else {
		newImg = canvas.toDataURL("image/png")
	}

	return new Promise((res, rej) => {
		// return <img> or just a b64 url
		if (opts.format === "dom") {
			const elem: HTMLImageElement = document.createElement("img")
			elem.src = newImg
			elem.onload = () => res(elem)
			elem.onerror = rej
		} else if (opts.format === "file") {
			// make file
			canvas.toBlob((blobFile) => {
				if (!blobFile) return rej("unable to convert image to file")
				const imgFile: File = new File([blobFile], "created with js-images")
				res(imgFile)
			})
		} else {
			res(newImg)
		}
	})
}

/**
 *
 * @param img image element or url (normal ot base64)
 * @param opts image modification options
 */
async function polyModify(img: ImgInput, opts: IModifyOptions): Promise<ImgRet> {
	// if nothing, die
	if (!img) return Promise.reject("no image given");

	// if an input is passed, serialise image
	if (img instanceof HTMLInputElement && img.files) {
		const b64Img = await blobToB64(img.files[0])
		if (typeof b64Img === "string") return modify(b64Img, opts)
	}

	// if string, well done!
	if (typeof img === "string") {
		return modify(img, opts)
	}

	return Promise.reject("should not get here")
}

export default polyModify
