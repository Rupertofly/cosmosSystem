// This is the system controller

export default class SystemController {
    private __age: number;
    private __running: boolean;

    constructor() {
        this.__age = 0;
        this.__running = true;
        this.__tick();
    }
    public pause = () => {
        this.__running = false;
    }
    public play = () => {
        this.__running = true;
        this.__tick();
    }
    private __tick = () => {
        if ( this.__running ) setTimeout( this.__tick, 84 );
        console.log( `Ping! it's ${this.__age}` );
        this.__age++;
    }
    get age()  {
        return this.__age;
    }
}