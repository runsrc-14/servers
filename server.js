const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const initRoutes = require("./app/routes/csv.routes");
const weatherRoutes = require("./app/routes/weather.routes");
const app = express();
const path = __dirname + '/public/';
app.use(express.static(path));

// var corsOptions = {
//   origin: "https://smf-rmuti-control.herokuapp.com"
// };
global.__basedir = __dirname + "/..";
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json()); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models"); 
const Role = db.role;
// const { weathers } = require("./app/models");
// csv import
db.sequelize.sync();

// app.use(express.static(__dirname + '/public/'));
// simple route
app.get('/', (req,res) =>res.sendFile(path + "index.html"));

//routes
weatherRoutes(app);
initRoutes(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/turorial.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.\n`);
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}