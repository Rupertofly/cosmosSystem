"use strict";
/*

import Expr from 'express';
import Sock from 'socket.io';

class App {
    public express: Expr.Application;
    public socket: Sock.Server | null;
    constructor() {
        this.express = Expr();
        this.mountRoutes();
    }
    public sockServe( server: any ) {
        this.socket = Sock( server );
        this.socket.on( 'connection', ( socket ) => {
            console.log( 'a user connected' );

        socket.on( 'msg', ( data: any ) => {
            console.log( `received ${data}` );
        } )
    } );
    }
    private mountRoutes() {
        const router: Expr.Router = Expr.Router();
        router.use( Expr.static( './public' ) );
        this.express.use( '/', router );
        console.log( __dirname );
        const serve = this.express.listen(
            80,
            ( err: Error ) => {
                if ( err ) {
                    console.log( err );
                }
                return console.log(
                    `server is listening on ${80}`
                );
            }

        );
        this.sockServe( serve );
    }
}
export default App;*/
//# sourceMappingURL=App.js.map