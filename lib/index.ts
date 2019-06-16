interface IModifyOptions {
	height?: number;
	width?: number;
	quality?: number;
	dom?: boolean;
}

interface IImageRender {
	height: number;
	width: number;
	img: HTMLImageElement;
}

function getImgDims(url: string): Promise<IImageRender> {
	const img: HTMLImageElement = new Image()
	img.src = url
	return new Promise((res) => {
		img.onload = function onload() {
			const {width, height} = img
			res({img, width, height})
		}
	})
}

function blobToB64(img: File): Promise<string | ArrayBuffer | null> {
	const reader = new FileReader()
	return new Promise((res, rej) => {
		reader.addEventListener('load', () => res(reader.result), false)
		reader.readAsDataURL(img)
		reader.onerror = rej
	})
}

async function modify(imgUrl: string, opts: IModifyOptions): Promise<string|HTMLImageElement> {
	const {img, height, width}: IImageRender = await getImgDims(imgUrl)
	const canvas: HTMLCanvasElement = document.createElement('canvas')
	const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
	let newImg: string;
	if (!ctx) return Promise.reject('oof')
	// scale to height and width
	if (opts.height && opts.width) {
		ctx.drawImage(img, 0, 0, opts.height, opts.width)
		// canvas.toDataURL('image/jpeg', 0.8)
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
		newImg = canvas.toDataURL('image/jpeg', opts.quality)
	} else {
		newImg = canvas.toDataURL('image/png')
	}

	return new Promise((res, rej) => {
		// return <img> or just a b64 url
		if (opts.dom) {
			const elem: HTMLImageElement = document.createElement('img')
			elem.src = newImg
			elem.onload = () => res(elem)
		} else {
			res(newImg)
		}
	})
}

// yay for polymorphism
export default async function polyModify(img: string | HTMLInputElement, opts: IModifyOptions): Promise<string|HTMLImageElement> {
	// if nothing, die
	if (!img) return Promise.reject('no image given');

	// if an input is passed, serialise image
	if (img instanceof HTMLInputElement && img.files) {
		const b64Img = await blobToB64(img.files[0])
		if (typeof b64Img === 'string') return modify(b64Img, opts)
	}

	// if string, well done! 
	if (typeof img === 'string') {
		return modify(img, opts)
	}

	return Promise.reject('should not get here')
}