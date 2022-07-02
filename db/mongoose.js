const mongoose = require('mongoose');

exports.initDb = (connectionURL) => {
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        dbName: "authentication",
    }).then(success => console.log("Db authentication conected!"))
}