const mongoose = require('mongoose');
    uri = "commands"

mongoose.connect(`mongodb://localhost/${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("You're in the mainframe"))
    .catch((err)=> console.log(err))