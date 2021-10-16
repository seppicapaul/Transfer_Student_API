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

const RoutesController = new (require('../app/Controllers/RoutesController.js'))();
const routesRouter = require('koa-router')({
    prefix: '/routes'
});

routesRouter.use(VerifyJWT);
routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/:routeID/', Authorize('admin'), RoutesController.routeWithRouteID);

const MarketsController = new (require('../app/Controllers/MarketsController.js'))();
const marketsRouter = require('koa-router')({
    prefix: '/markets'
});

marketsRouter.use(VerifyJWT);
marketsRouter.get('/all-markets', Authorize('admin'), MarketsController.allMarkets, err => console.log(`allMarkets ran into an error: ${err}`));
marketsRouter.get('/:marketID/', Authorize('admin'), MarketsController.marketWithMarketID);

const EmployeesController = new (require('../app/Controllers/EmployeesController.js'))();
const employeesRouter = require('koa-router')({
    prefix: '/employees'
});

employeesRouter.use(VerifyJWT);
employeesRouter.get('/all-employees', Authorize('admin'), EmployeesController.allEmployees, err => console.log(`allEmployees ran into an error: ${err}`));
employeesRouter.get('/:employeeID/', Authorize('admin'), EmployeesController.employeeWithEmployeeID);

const TransactionsController = new (require('../app/Controllers/TransactionsController.js'))();
const transactionsRouter = require('koa-router')({
    prefix: '/transactions'
});

transactionsRouter.use(VerifyJWT);
transactionsRouter.get('/:cycleID/', Authorize('admin'), TransactionsController.allTransactions, err => console.log(`allTransactions ran into an error: ${err}`));
transactionsRouter.get('/:transactionID/', Authorize('admin'), TransactionsController.transactionWithTransactionID);
//transactionsRouter.get('/:cycleID/', Authorize('admin'), TransactionsController.transactionWithCycleID);
transactionsRouter.get('/:cycleID/:accountID/one-account', Authorize('admin'), TransactionsController.transactionWithAccountID);
transactionsRouter.get('/:cycleID/:routeID/trans-for-route', Authorize('admin'), TransactionsController.transactionWithRouteID);
transactionsRouter.get('/:cycleID/all-routes', Authorize('admin'), TransactionsController.transactionWithoutRouteID);
transactionsRouter.get('/:cycleID/:marketID/trans-for-market', Authorize('admin'), TransactionsController.transactionWithMarketID);

const CyclesController = new (require('../app/Controllers/CyclesController.js'))();
const cyclesRouter = require('koa-router')({
    prefix: '/cycles'
});

cyclesRouter.use(VerifyJWT);
cyclesRouter.get('/all-cycles', Authorize('admin'), CyclesController.allCycles, err => console.log(`allCycles ran into an error: ${err}`));
cyclesRouter.get('/current-cycle', Authorize('admin'), CyclesController.currentCycle)

/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    routesRouter.routes(),
    marketsRouter.routes(),
    employeesRouter.routes(),
    transactionsRouter.routes(),
    cyclesRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
