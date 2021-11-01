const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class TransferController {
    constructor() {
        console.log('Constructor of TransferController is called.');
    }

    async transferCourses(ctx) {
        console.log('transferCourses is called: studentID is ', JSON.stringify(ctx.params.studentID));
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            transfer_courses  
                        WHERE
                            student_id = ? 
                        ORDER BY 
                            from_year,
                            from_semester
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.studentID]
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

    async enrollment(ctx) {
        console.log('transferCourses is called: studentID is ', JSON.stringify(ctx.params.studentID));
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            enrollment  
                        WHERE
                            student_id = ? 
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.studentID]
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

    async testCreditCourses(ctx) {
        console.log('transferCourses is called: studentID is ', JSON.stringify(ctx.params.studentID));
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            test_credit_courses  
                        WHERE
                            student_id = ? 
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.studentID]
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

    async arrUpdateForm(ctx) {
        console.log('arrUpdateForm is called: studentID is ', JSON.stringify(ctx.params.studentID));
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            arr_update_form  
                        WHERE
                            student_id = ? 
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.studentID]
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

    async student(ctx) {
        console.log('arrUpdateForm is called: studentID is ', JSON.stringify(ctx.params.studentID));
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            students  
                        WHERE
                            student_id = ? 
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.studentID]
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

    async transferCoursesNonArticulated(ctx) {
        console.log('transferCourses is called: studentID is ', JSON.stringify(ctx.params.studentID));
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            transfer_courses  
                        WHERE
                            student_id = ? AND ssu_subject IS NULL             
                        ORDER BY 
                            from_year,
                            from_semester
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.studentID]
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

module.exports = TransferController;
