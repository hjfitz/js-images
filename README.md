# js-images
> Resize and compress images within the web browser

## Usage

### Install
```zsh
yarn add js-images
```
### With a URL
```ts
import modify from 'js-images'

const resizedImage: HTMLImageElement = await modify(`https://placeimg.com/640/480/any`, {
	height: 480,
	width: 200,
	format: 'dom',
})

document.body.appendChild(reizedImage)
```
### From a File Input
```ts
import modify from 'js-images'
import axios from 'axios'

const inp: HTMLInputElement = document.querySelector('input[type=file]')

// get our image from the input
const compressedImageAsFile: File = await modify(inp, {quality: 0.5, format: 'file'})

// send it to the server!
await axios.post('/api/image', compressedImageAsFile)
```

### From a File Event
```ts
import modify from 'js-images'

const inp: HTMLInputElement = document.querySelector('input[type=file]')

inp.addEventListner('change', async (ev) => {
	const imgB64 = await modify(ev.target, {quality: 0.8})
	const {data: resp} = await axios.post('/api/image', {imgB64})
})
```

**Note: top-level await does not work in the browser! these should be wrapped in an anonymous IIFE (removed for brevity, in this example)**

## API
js-images returns either a HTMLImageElement of the desired image, a base64 encoded image, or a raw File. It takes either an image URL or HTMLFileInput element as the first argument.
### libraryname(img, options)
Return: `Promise<HTMLImageElement|string|File>`
#### options.height
Type: `number`
The desired height to scale to. If no `width` is given, the resulting width is scaled proportionally.
#### options.width
Type: `number`
The desired width to scale to. Like `options.height`, if no `height` is given then the resulting height is scaled proportionally.
#### options.quality
Type: `number`
The quality of the new image, from 0.0 (lowest) to 1.0 (height). By including this, the image will be converted to a JPG.
#### options.format
Type: `string`
How the new image should be returned. May one of:  `url|dom|file`