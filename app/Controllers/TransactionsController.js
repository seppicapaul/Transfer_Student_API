const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class TransactionsController {
    constructor() {
        console.log('Constructor of AccountsController is called.');
    }

    async transactionsForCycleID(ctx) {
        console.log('transactionsForCycleID is called: cycleID is ', JSON.stringify(ctx.params.cycleID));
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT transactionDate, transactionID, accountName, employeeName, routeName, marketName, productName, taps
                        FROM 
                            transactions t, accounts a, employees e, routes r, markets m, products p  
                        WHERE
                            t.accountID = a.accountID AND
                            t.employeeID = e.employeeID AND
                            t.routeID = r.routeID AND
                            t.marketID = m.marketID AND
                            t.productID = p.productID AND 
                            t.cycleID = ? 
                        ORDER BY transactionDate desc LIMIT 100
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.cycleID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionsForCycleID", error);
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

module.exports = TransactionsController;
