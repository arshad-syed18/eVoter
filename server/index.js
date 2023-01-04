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
    const voter_id = req.body.voter_id;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;
    let dob = req.body.DOB;
    dob = dob.split("/").reverse().join("-")
    const nationality = req.body.nationality;
    //query data to sql
    const sqlInsert = "INSERT INTO user (voter_id,name,phoneNumber,email,password,age,DOB,nationality) VALUES (?,?,?,?,?,?,?,?)"
    db.query(sqlInsert,[voter_id,name,phoneNumber, email, password, age, dob, nationality], (err, result) => {
        if(err != null)
        {
            const errorr = handleErrors(err);//if error, get error details and send to front end
            res.status(404).send({errorr});
        }
        res.send();
    });
    
});
app.get('/api/getActiveElections',(req,res) => {
    var todayDate = new Date().toISOString().slice(0, 10);
    let sqlQuery = "select * from election where startDate < ? and endDate > ?";
    let ans = db.query(sqlQuery,[todayDate, todayDate], (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("Active Election Data fetched successfully!")
        res.send(result);
    });
});
app.get('/api/getPreviousElections',(req,res) => {
    var todayDate = new Date().toISOString().slice(0, 10);
    let sqlQuery = "select * from election where endDate < ?";
    let ans = db.query(sqlQuery,todayDate, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("Previous Election Data fetched successfully!")
        //console.log(result);
        res.send(result);
    });
});
app.get('/api/getUpcomingElections',(req,res) => {
    var todayDate = new Date().toISOString().slice(0, 10);
    let sqlQuery = "select * from election where startDate > ?";
    let ans = db.query(sqlQuery,todayDate, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("Previous Election Data fetched successfully!")
        //console.log(result);
        res.send(result);
    });
});
app.get('/api/getCandidates',(req,res) => {
    let sqlQuery = "select * from candidate";
    let ans = db.query(sqlQuery, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("Candidate Data fetched successfully!");
        res.send(result);
    });
});
app.post('/api/getElection',(req,res) => {
    const election_id = req.body.election_id;
    let sqlQuery = "select * from election where election_id=?";
    let ans = db.query(sqlQuery,election_id, (err,result)=>{
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("Vote Election data fetched successfully!");
        res.send(result);
    })
});
app.post('/api/getElectionCandidates', (req,res) => {
    const election_id = req.body.election_id;
    let sqlQuery = "select c.* from candidate c, election e, election_candidates ec where e.election_id= ? and c.candidate_id = ec.candidate_id and e.election_id=ec.election_id and e.currentlyActive=1"
    db.query(sqlQuery, election_id, (err,result)=>{
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("Election Candidate Data successfully fetched!");
        res.send(result);
    })
});
app.post('/api/addVote', (req,res) => {
    const userData = req.body.userData;
    const candidateData = req.body.candidateData;
    const electionData = req.body.electionData;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    const user_id = userData.voter_id;
    const election_id= electionData.election_id;
    const candidate_id= candidateData.candidate_id;
    const dateOfVote= formattedDate;
    const electionCurrentlyActive= 1;
    let sqlQuery = "insert into votes(user_id,candidate_id,election_id,dateOfVote,electionCurrentlyActive) values (?,?,?,?,?)";
    db.query(sqlQuery,[user_id,candidate_id,election_id,dateOfVote,electionCurrentlyActive], (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send({errorCode : err.errno});
            
        }
        else{
            console.log("Vote data inserted successfully!");
            res.status(200).send("Insertion Successful!");
        }
        
    })
})

app.post('/api/getUserElections', (req,res) => {
    const user_id = req.body.user_id;
    console.log(user_id);
    let sqlQuery = "select election_id from votes where user_id=?"
    db.query(sqlQuery,user_id, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send({errorCode : err.errno});
            
        }
        else{
            console.log("Data fetched!");
            res.send(result);
        }
    })
})


app.post('/api/getUserDetails',(req,res) => {
    const email = req.body.email;
    console.log(req.body);
    let sqlQuery = "select * from user where email=?";
    let ans = db.query(sqlQuery,email, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("User Data fetched successfully!");
        res.send(result);
    });
});
app.post('/api/getUser',(req,res) => {
    // get data from front end
    const email = req.body.email;
    const password = req.body.password;
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
app.get('/api/getUsers', (req,res)=>{
    let sqlQuery = "select * from user"
    db.query(sqlQuery, (err,result)=>{
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        else{
            console.log("Users fetched!");
            res.send(result);
        }
    })
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
