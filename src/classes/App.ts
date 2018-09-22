import Expr from 'express';

class App {
    public express: Expr.Application;
    constructor() {
        this.express = Expr();
        this.mountRoutes();
    }
    private mountRoutes() {
        const router: Expr.Router = Expr.Router();
        router.use( Expr.static( './public' ) )
        this.express.use( '/', router );
    }
}
export default new App().express;
