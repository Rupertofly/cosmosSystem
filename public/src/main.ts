

// @ts-nocheck
// tslint:disable no-reference class-name no-namespace
let socket: SocketIOClient.Socket;
// tslint:disable-next-line:class-name
// tslint:disable-next-line:no-namespace
type p5 = any;
declare namespace p5 {
    type Graphics = any;
}
const sketch = ( i: p5 | any ) => {
    const p = i as p5;
    let realmB: p5.Graphics;
    let roadB: p5.Graphics;
    let settlementB: p5.Graphics;
    let conversationB: p5.Graphics;
    p.setup = () => {
        p.createCanvas( 1200, 800 );
        p.background( '#FAFAFA' );
        realmB = p.createGraphics( 1200, 800 );
        roadB = p.createGraphics( 1200, 800 );
        settlementB = p.createGraphics( 1200, 800 );
        conversationB = p.createGraphics(
            1200,
            800
        );
        socket = io.connect(
            'http://localhost:3000'
        );
        console.log( 'write' );

        socket.once( 'connection', () =>
            socket.emit( 'socket_vis', 0 )
        );
        socket.emit( 'connect_vis', 0 );

        socket.on( 'draw', ( drawObj: any ) => {
            realmB.clear();
            drawObj.realms.map( ( c: any ) => {
                realmB.stroke( 240,30 )
                realmB.fill(
                    c.colour
                );
                realmB.beginShape();
                c.pgon.map( ( v: any ) =>
                    realmB.vertex( v[0], v[1] )
                );
                realmB.endShape( 'close' );
            } );

            roadB.clear();
            drawObj.roads.map( ( r: any ) => {
                roadB.noFill();
                roadB.strokeWeight( 4 );
                roadB.stroke( 127, 127, 127, 255 );
                if ( !r.use ) {
                    roadB.stroke(
                        127,
                        127,
                        127,
                        100
                    );
                }
                roadB.beginShape();
                r.path.map( ( rp: any ) =>
                    roadB.vertex( rp[0], rp[1] )
                );
                roadB.endShape();
            } );

            settlementB.clear();
            settlementB.textSize( 9 );
            settlementB.textFont( 'monospace' );
            settlementB.ellipseMode( 'center' );
            settlementB.textAlign(
                'center',
                'center'
            );
            drawObj.settlements.map(
                ( set: any ) => {
                    settlementB.noFill();
                    settlementB.stroke(
                        127,
                        127,
                        127,
                        255
                    );
                    settlementB.strokeWeight( 2 );
                    settlementB.ellipse(
                        set.x,
                        set.y,
                        15
                    );
                    settlementB.noStroke();
                    settlementB.fill(
                        127,
                        127,
                        127,
                        255
                    );
                    settlementB.text(
                        set.id,
                        set.x,
                        set.y+22
                    );
                }
            );

            conversationB.clear();
            p.image( realmB, 0, 0 );
            drawObj.conversations.map( c => {
                conversationB.rectMode( 'center' )
                conversationB.stroke( 255, 50 );
                conversationB.strokeWeight( 5 );
                const co: string = c.c.colour
                conversationB.fill( co.length > 7 ? co+"0" : co );
                conversationB.rect( c.x, c.y, 30, 15 );
                
            } )
        } );

    };

    p.draw = () => {
        p.image( realmB, 0, 0 )
        p.background( 255,150 )
        p.image( settlementB, 0, 0 )
        p.image( roadB, 0, 0 )
        p.image( conversationB, 0, 0 )
    };
};
// @ts-ignore
const myP5 = new p5( sketch );
