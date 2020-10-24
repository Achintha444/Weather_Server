const js2xml = require('xml2js');

exports.createAck = (json) => {
    json.alert.msgtype = 'Ack'
    json.alert.references = '200'
    json.alert.note = 'Update Successfully Recieved'

    var builder = new js2xml.Builder();
    var xml = builder.buildObject(json);

    return xml;
}

exports.createError = (json) => {
    json.alert.msgtype = 'Error'
    json.alert.references = '404'
    json.alert.note = 'Update was Unsuccessful'
    json.alert.urgency = 'Immediate';

    var builder = new js2xml.Builder();
    var xml = builder.buildObject(json);

    return xml;
}

exports.createXmlError = (error,timeStamp)=>{
    var xml = '<?xml version = "1.0" encoding = "UTF-8"?> <alert xmlns = "urn:oasis:names:tc:emergency:cap:1.2">  <sent>'+timeStamp.toString()+'</sent> <status>Actual</status> <msgtype>Error</msgtype> <scope>Private</scope> <references>404</references> <note>'+error+'</note> </alert>';
    return xml;
}