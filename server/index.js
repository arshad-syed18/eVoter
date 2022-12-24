import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
//define database values
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'online_voting'
});
//required dependencies such as middlewear express etc
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const handleErrors = (err) => {
    let errors = {errno: err.errno, code: err.code};
    console.log(errors);
    return errors;

}

//connect to database
db.connect((err)=>{
    if(err){
        console.log("Activate Xampp server!");
        throw err;
    }
    console.log("Connection to database established!");
});

app.post('/api/addUser',(req,res) => {
    // get data from frontend
    const voter_id = req.body.voterID;
    const name = req.body.name;
    const phoneNumber = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;
    const dob = req.body.dob;
    const nationality = req.body.nationality;
    //query data to sql
    const sqlInsert = "INSERT INTO user (voter_id,name,phoneNumber,email,password,age,DOB,nationality) VALUES (?,?,?,?,?,?,?,?)"
    db.query(sqlInsert,[voter_id,name,phoneNumber, email, password, age, dob, nationality], (err, result) => {
        console.log(err);
        if(err != null)
        {const errorr = handleErrors(err);//if error, get error details and send to front end
        res.status(404).send({errorr});}
        console.log(result);
    });
    
});
app.get('/api/getElections',(req,res) => {
    let sqlQuery = "select * from election";
    let ans = db.query(sqlQuery, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("Data fetched successfully!")
        res.send(result);
    });
});
app.post('/api/getUser',(req,res) => {
    // get data from front end
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    console.log(password)
    let sqlQuery = "select password from user where email=?";
    let sqlPasswordAns = db.query(sqlQuery,email, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log(result);
        if(result[0].password === password){
            console.log("Congrats password matches!");
            res.status(200).send("Password matches!")
        }
        else {
            console.log("password did not match!");
            res.status(404).send("Password did not match!")
        }
    });
    
})

app.get("/",(req,res)=>{
    res.send("Hey! Welcome to backend!");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})




//create database
// app.get("/createddb",(req,res)=>{
//     let sql="create database testdatabase";
//     db.query(sql,(err)=>{
//         if(err)
//             throw err;
//         console.log("database created");
//     });
// });
//create table
// app.get("/createtable",(req,res)=>{
//     let sql=(`
//     create table user(
//         userid int primary key,
//         userName varchar(20),
//         userEmail varchar(20),
//         userPassword varchar(20));
//     `);
//     db.query(sql,(err,result)=>{
//         if(err)
//             throw err;
//         console.log("Table created");
//     });
// });
//update row get userid from user
// app.get("/updaterow/:id",(req,res)=>{
//     let newName="Syed Arshad";
//     let sql=`update user set userName ='${newName}' where userid='${req.params.id};'`;
//     let query=db.query(sql,(err,result)=>{
//         if(err)
//             throw err;
//     console.log(result);
//     res.send("Row updated!")
//     });
    
// });
//add row
// app.get("/addrow",(req,res)=>{
//     let values={
//         userid: 110,
//         userName: "Syed",
//         userEmail: "email@gogle.com",
//         userPassword: "syed123"
//     };
//     let sql="insert into user set ?";
//     let query=db.query(sql,values,(err)=>{
//         if(err)
//             throw err;
//         console.log("Data evtered");
//     });
    
// });
// //select post
// app.get("/getrows",(req,res)=>{
//     let sql="select * from user;";
//     let query=db.query(sql,(err,result)=>{
//         if(err)
//             throw err;
//         console.log(result);
//         //get single attribute 
//         //console.log(result[0].userName);
//         res.send("data fetched");
//     });
    
// });
