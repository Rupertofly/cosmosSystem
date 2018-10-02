declare module 'tinyqueue' {
    const queue: any;
    export default queue;
}
declare interface Traits {
    [trait: string]: number;
    perf: number;
    extro: number;
    conv: number;
    fame: number;
    nrg: number;
    res: number;
    form: number;
    disco: number
}
declare module "*sorting.json" {
    const value: {[cat: string]: [{tag: string, traits: Traits}]};
    export default value;
}
declare module 'a-star' {
    interface Options<T> {
        start: T;
        isEnd: ( node: T ) => boolean;
        neighbor: ( node: T ) => T[];
        distance: ( nA: T, nB: T ) => number;
        heuristic: ( node: T ) => number;
        hash?: ( node: T ) => string;
    }
    interface Return<T> {
        status: string;
        path: T[];
    }
    function aStar<T>( options: Options<T> ): Return<T>;
    export default aStar;
}
