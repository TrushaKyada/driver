const { connection } = require("mongoose");
const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "practice"
})
exports.ragistration = async (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`);
        const params = req.body
        const phoneNumber = req.body.phoneNumber
        connection.query(`select * from driver where phoneNumber = ${phoneNumber}`, (err, rows) => {
            console.log(rows[0]);
            connection.release()
            if (rows[0] == undefined) {
                connection.query("insert into driver SET ?", params, (err, rows) => {
                    if (!err) {
                        res.status(200).json({
                            "message": `record has been added`,
                            "status": 200,
                            "data": params
                        })
                    }
                    else {
                        console.log("err::",err);
                        res.status(500).json({
                            "message": "record does not inserted!!!",
                            status: 500

                        })
                    }
                })
            }
            else {
                // const { id, firstName, phoneNumber, image, vehicle_Img, wallet, phoneVerify, deviceType, isActive, status, vehicle, year, make, model, color } = req.body
                connection.query("UPDATE driver SET firstName=?,phoneNumber=?,image=?,vehicle_Img=?,wallet=?,phoneVerify=?,deviceType=?,isActive=?,status=?,vehicle=?,year=?,make=?,model=?,color=? where id=?", [params.firstName, params.phoneNumber, params.image, params.vehicle_Img, params.wallet, params.phoneVerify, params.deviceType, params.isActive, params.status, params.vehicle, params.year, params.make, params.model, params.color, params.id], (err, rows) => {
                    if (!err) {
                        res.status(200).json({
                            "message": `record has been updated`,
                            "status": 200
                        })
                    }
                    else {
                        console.log("errorUpdate::",err);
                        res.status(500).json({
                            "message": "record does not updated...!!!",
                            status: 500
                        })
                    }
                })
            }
        })

    })
}

exports.deleteData = async (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log("Connected as ID " + connection.threadId);
        const id = req.params.id;
        connection.query(`select * from driver where id = ${id}`, (err, rows) => {
            connection.release()//return the connection to pool
            if (rows[0] == undefined) {
                res.status(404).json({
                    message: "record not found",
                    status: 404
                })
            }
            else {

                connection.query("delete from driver where id = ?", id, (err, rows) => {
                    if (!err) {
                        res.status(200).json({
                            "message": `${id}'s record has been deleted successfully..!!!!`,
                            status: 200,

                        })
                    } else {
                        res.status(404).json({
                            message: "not found",
                            status: 404,
                            error: err
                        })
                    }
                })

            }

        });


    })
}

exports.view = async (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log("Connected as ID " + connection.threadId);
        connection.query("select * from driver", (err, rows) => {

            connection.release()//return the connection to pool

            if (!err) {
                res.status(200).json({
                    "message": "success....!!!",
                    status: 200,
                    data: rows
                })
            } else {
                res.status(404).json({
                    message: "not found",
                    status: 404,
                    error: err
                })
            }
        })

    })
}


exports.viewById = async (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!
        console.log("Connected as ID " + connection.threadId);
        const id = req.params.id;
        connection.query(`select * from driver where id = ${id}`, (err, rows) => {
            connection.release()//return the connection to pool
            if (rows[0] == undefined) {
                res.status(404).json({
                    message: "record not found",
                    status: 404
                })
            }
            else {

                res.status(200).json({
                    message: "success....!!!",
                    status: 200,
                    data: rows
                })

            }

        });

    })
}


exports.login = async (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("Connected as ID " + connection.threadId);
        const params = req.body.phoneNumber;
        const otp = 9999;
        const OTP = req.body.OTP;
        connection.query("select * from driver where phoneNumber = ?", params, (err, rows) => {
            if (otp === OTP) {
                connection.query("update driver set phoneVerify = 1 where phoneNumber=?", params)
                connection.release();

                if (!err) {
                    res.status(200).json({
                        "message": "success....!!!",
                        status: 200,
                        data: rows
                    })
                } else {
                    res.status(404).json({
                        message: "not found",
                        status: 404,
                        error: err
                    })
                }
            }
        })

    })
}