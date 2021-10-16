const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class EmployeesController {
    constructor() {
        console.log('Constructor of EmployeesController is called.');
    }

    async allEmployees(ctx) {
        console.log('employees all employees called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            employees
                        ORDER BY employeeName
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in EmployeesController::allEmployees", error);
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

    async employeeWithEmployeeID(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            employees
                        WHERE 
                            employeeID = ?
                        ORDER BY employeeName
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.employeeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in EmployeesController::employeeWithEmployeeID", error);
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

module.exports = EmployeesController;
