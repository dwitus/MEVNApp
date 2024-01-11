const express = require("express");
const cors = require("cors");
const config = require('./app/config/config.js')
const configDB = require('./app/config/db.config.js');
const corsOptions = {
    origin: "http://localhost:8081"
}
const app = express();
const db = require("./app/models");
const Role = db.role;


db.mongoose
    .connect(configDB.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("Successfully connect to MongoDB.");
        initial();
    }).catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
    
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.get("/", (req,res) => {
    res.json({message: "Welcome to app"});
})

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


const PORT = config.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
        new Role({
            name: "user"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
    
            console.log("added 'user' to roles collection");
        });
    
        new Role({
            name: "moderator"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
    
            console.log("added 'moderator' to roles collection");
        });
    
        new Role({
            name: "admin"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
    
            console.log("added 'admin' to roles collection");
        });
        }
    });
    }