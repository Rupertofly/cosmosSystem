import app from './classes/App';
console.log( `\
Started\
` )
const port = 80
console.log( __dirname );
app.listen( port,  ( err: Error )  => {
    if ( err ) {
        console.log( err )
    }
    return console.log( `server is listening on ${port}` );
    
} )