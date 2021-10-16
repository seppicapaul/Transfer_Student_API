const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class AccountsController {
    constructor() {
        console.log('Constructor of AccountsController is called.');
    }

    async accountsForRoute(ctx) {
        console.log('accountsForRoute is called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            accounts
                        WHERE routeID = ? AND
                        status = 'Active'
                        ORDER BY accountName
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.routeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in AccountsController::accountsForRoute", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

}

module.exports = AccountsController;
