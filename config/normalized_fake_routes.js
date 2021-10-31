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
loginRouter.get('/:student_id', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));


const TransferController = new (require('../app/Controllers/TransferController.js'))();
const transferRouter = require('koa-router')({
    prefix: '/transfer'
});

transferRouter.use(VerifyJWT);
transferRouter.get('/:studentID/transfer-courses', Authorize('admin'), TransferController.transferCourses);
transferRouter.get('/:studentID/enrollment', Authorize('admin'), TransferController.enrollment);
transferRouter.get('/:studentID/test-credit-courses', Authorize('admin'), TransferController.testCreditCourses);
transferRouter.get('/:studentID/arr-update-form', Authorize('admin'), TransferController.arrUpdateForm);


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    transferRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
