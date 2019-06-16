interface IDetails {
    height?: number;
    width?: number;
    quality?: number;
    dom?: boolean;
}
export declare function resize(url: string, details: IDetails): Promise<string>;
export {};
