export interface IModifyOptions {
	height?: number;
	width?: number;
	quality?: number;
	dom?: boolean;
}

export interface IImageRender {
	height: number;
	width: number;
	img: HTMLImageElement;
}