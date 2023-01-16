const mongoose = require('mongoose');


exports.initDb = (connectionURL, database = "authentication") => {
    mongoose.set('strictQuery', true)
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        dbName: database,
    }).then(success => console.log("Db authentication conected!"))
}