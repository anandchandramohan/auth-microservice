var mongoose = require('mongoose');
var connection = {};

connection.getMongooseConnection = function(){

    const db = mongoose.createConnection('mongodb://localhost:27017/authstore',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    //const db = mongoose.connection;

    db.on('error', ()=> {
        console.log('Failed to connect to mongoose')
    })
    .once('open', () => {
        console.log('Connected to mongoose')
    });
    return db;
}
module.exports = connection;
