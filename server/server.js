const express = require('express');
const cors = require("cors");
const app = express();
const port = 8000;

// ------------------- Server Start ------------------- //

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(port, () => console.log(`Listening on port ${port}`));

require('./config/mongoose.config');
require('./routes/customEmbed.routes.js')(app);

// --------------------------------------- //