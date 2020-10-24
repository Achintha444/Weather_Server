const dotenv = require('dotenv');
dotenv.config();

exports.database = {
    host: process.env.host,
    user: process.env.user,
    name: process.env.database,
    password: process.env.password,
    port: process.env.ports,
    multipleStatements: process.env.multipleStatements
};