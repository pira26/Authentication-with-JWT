import * as mongoose from "mongoose";
(<any>mongoose).Promise = require("bluebird");
// let dbName;

// switch (process.env.NODE_ENV) {
//     case "test":
//         dbName = "todo_test";
//         break;
//     case "production":
//         dbName = "todo";
//         break;
//     default:
//         dbName = "todo_dev";
// }

const dbAddress = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

let options = {
    useMongoClient: true
};

if (process.env.DB_AUTH === "true") {
    options["user"] = process.env.DB_USER;
    options["pass"] = process.env.DB_PASS;
}

mongoose.connect(`mongodb://${dbAddress}:${dbPort}@ds127506.mlab.com:27506/simple-todo-app`, options)
    .catch((err) => {
        if (err.message.indexOf("ECONNREFUSED") !== -1) {
            console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
            process.exit(1);
        } else {
            throw err;
        }
    });