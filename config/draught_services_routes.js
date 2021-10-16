const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');


/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/


const LoginController = new (require('../app/Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));

// Routes-related routes.

const RoutesController = new (require('../app/Controllers/RoutesController.js'))();
const routesRouter = require('koa-router')({
    prefix: '/routes'
});

routesRouter.use(VerifyJWT);
routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/:routeID', Authorize('admin'), RoutesController.routeWithRouteID);

// Accounts-related routes.

const AccountsController = new (require('../app/Controllers/AccountsController.js'))();
const accountsRouter = require('koa-router')({
    prefix: '/accounts'
});

accountsRouter.use(VerifyJWT);
accountsRouter.get('/:routeID/route-accounts', Authorize('admin'), AccountsController.accountsForRoute);


// CycleID-related routes.

const CycleIDController = new (require('../app/Controllers/CycleIDs.js'))();
const cycleIDRouter = require('koa-router')({
    prefix: '/cycles'
});

cycleIDRouter.use(VerifyJWT);
cycleIDRouter.get('/:numCycleIDs/cycleIDs', Authorize('admin'), CycleIDController.cycleIDInfoForNCycles);

// Transactions-related routes

const TransactionsController = new (require('../app/Controllers/TransactionsController.js'))();
const transactionsRouter = require('koa-router')({
    prefix: '/transactions'
});

transactionsRouter.use(VerifyJWT);
transactionsRouter.get('/:cycleID/for-cycle-with-id', Authorize('admin'), TransactionsController.transactionsForCycleID);


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    routesRouter.routes(),
    accountsRouter.routes(),
    cycleIDRouter.routes(),
    transactionsRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
