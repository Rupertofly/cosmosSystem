import Expr from 'express';
import http from 'http';
import { AddressInfo } from 'net';
import path from 'path';
import Sock from 'socket.io';
import SystemController from './classes/system/SystemController';

export default class MyServer {
    public app: Expr.Application;
    public server: http.Server;
    public addressInfo: AddressInfo;
    public vis: Sock.Socket | null = null;
    public SocketController: Sock.Server;
    public controller: Sock.Socket | null = null;

    constructor( public system: SystemController ) {
        this.app = Expr();
        this.server = this.app.listen( 3000, () => {
            this.addressInfo = this.server.address() as AddressInfo;
            const adr = this.addressInfo;
            console.log( `listening at http://localhost:${adr.port}` );
        } );
        this.addressInfo = this.server.address() as AddressInfo;
        this.app.use( '/vis', Expr.static( path.join( __dirname, '../public' ) ) );
        this.SocketController = Sock( this.server );
        this.SocketController.on( 'connection', socket => {
            console.log( 'new connection' );
            
            socket.on( 'connect_vis', () => {
                console.log( 'vis connected' );
                
                this.vis = socket;
                this.system.attachVisualiser( socket )
            } )
            socket.on( 'connect_cont',() => {
                this.controller = socket;
                this.system.attachController( socket );

            } )
        } )
    }

}
