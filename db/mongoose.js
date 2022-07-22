const mongoose = require('mongoose');

exports.initDb = (connectionURL, database="authentication") => {
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        dbName: database,
    }).then(success => console.log("Db authentication conected!"))
}