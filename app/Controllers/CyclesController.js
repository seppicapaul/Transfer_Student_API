const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class CyclesController {
    constructor() {
        console.log('Constructor of CyclesController is called.');
    }

    async allCycles(ctx) {
        console.log('cycles all cycles called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            cycles
                        ORDER BY cycleID
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in CyclesController::allCycles", error);
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

    async currentCycle(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT MAX(cycleID)
                       AS current
                        FROM 
                            cycles
                        `;
            dbConnection.query({
                sql: query
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in CyclesController::cycleWithCycleID", error);
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

module.exports = CyclesController;
