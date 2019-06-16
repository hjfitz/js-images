import { IModifyOptions } from "./interfaces";
/**
 *
 * @param img image element or url (normal ot base64)
 * @param opts image modification options
 */
export default function polyModify(img: string | HTMLInputElement, opts: IModifyOptions): Promise<string | HTMLImageElement | File>;
