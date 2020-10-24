const moment = require('moment');

exports.getTimeStamp = () => {
    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    return mysqlTimestamp;
}
