// tslint:disable-next-line:no-reference
let socket: SocketIOClient.Socket;
// tslint:disable-next-line:class-name
// tslint:disable-next-line:no-namespace
declare namespace p5 {
    interface Graphics extends p5 {

    }
}
let sketch = ( i: p5 | any ) => {
    const p = i as p5;
    const getCol = ( col: 'Green' | 'Purple' | 'Orange', shad?:'Norm' | 'Light' ) => {
        switch ( col ) {
            case 'Green':
                if ( !shad ) return '#6FD6AD';
                switch ( shad ) {
                    case 'Norm': return '#6FD6AD'; break;
                    case 'Light': return '#B7EBD6'; break;
                }
                break;
                case 'Orange':
                if ( !shad ) return '#F99169';
                switch ( shad ) {
                    case 'Norm': return '#F99169'; break;
                    case 'Light': return '#FCC8B4'; break;
                }
                break;
                case 'Purple':
                if ( !shad ) return '#B474EE';
                switch ( shad ) {
                    case 'Norm': return '#D9B9F7'; break;
                    case 'Light': return '#D9B9F7'; break;
                }
                break;
        }
        return '#FFFFFF'
    }

    p.setup = () => {
        p.createCanvas( 1200, 800 );
        p.background( '#FAFAFA' );
        socket = io.connect( 'http://localhost:3000' );
        socket.emit( 'socket_vis' );
        p.noLoop();
        const realmB = p.createGraphics( 1200, 800 );
        const roadB = p.createGraphics( 1200, 800 );
        const settlementB = p.createGraphics( 1200, 800 );
        const conversationB = p.createGraphics( 1200, 800 )
        socket.on( 'draw', ( drawObj:any ) => {
            let [ rl, rd, st ] = [ false,false,false ];
            if ( drawObj.realms ) {
                rl = true;
                realmB.clear();
                drawObj.realms.map( ( c:any ) => {
                    realmB.noStroke()
                    realmB.fill( getCol( c.colour, 'Light' ) );
                    realmB.beginShape();
                    c.pgon.map( ( v:any ) => realmB.vertex( c[0], c[1] ) );
                    realmB.endShape( 'close' )
                } )
            }
            if ( drawObj.roads ) {
                rd = true;
                roadB.clear();
                drawObj.roads.map( ( r: any ) => {
                    roadB.noFill();
                    roadB.strokeWeight( 4 );
                    roadB.stroke( 127, 127, 127, 255 );
                    if ( !r.use ) roadB.stroke( 127, 127, 127, 100 )
                    roadB.beginShape();
                    r.path.map( ( rp: any ) => roadB.vertex( rp[0], rp[1] ) );
                    roadB.endShape();
                } )
            }
            if ( drawObj.settlements ) {
                st = true;
                settlementB.clear();
                settlementB.textSize( 11 );
                settlementB.textFont( 'monospace' );
                settlementB.ellipseMode( "center" );
                settlementB.textAlign( 'center', 'center' );
                drawObj.settlements.map( ( set: any ) => {
                    settlementB.noFill();
                    settlementB.stroke( 127, 127, 127, 255 );
                    settlementB.strokeWeight( 2 )
                    settlementB.ellipse( set.x, set.y, 30 );
                    settlementB.noStroke();
                    settlementB.fill( 127, 127, 127, 255 );
                    settlementB.text( set.id, set.x, set.y )
                } )
            }
            conversationB.clear();
        } )
    }

    p.draw = () => {

    }


}