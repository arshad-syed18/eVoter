import express from 'express'
import mysql from 'mysql'

const app = express()
//define database values
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'testdatabase'
});
//connect to database
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Connection to database established!");
});
//create database
app.get("/createddb",(req,res)=>{
    let sql="create database testdatabase";
    db.query(sql,(err)=>{
        if(err)
            throw err;
        console.log("database created");
    });
});
//create table
app.get("/createtable",(req,res)=>{
    let sql=(`
    create table user(
        userid int primary key,
        userName varchar(20),
        userEmail varchar(20),
        userPassword varchar(20));
    `);
    db.query(sql,(err,result)=>{
        if(err)
            throw err;
        console.log("Table created");
    });
});
//add row
app.get("/addrow",(req,res)=>{
    let values={
        userid: 110,
        userName: "Syed",
        userEmail: "email@gogle.com",
        userPassword: "syed123"
    };
    let sql="insert into user set ?";
    let query=db.query(sql,values,(err)=>{
        if(err)
            throw err;
        console.log("Data evtered");
    });
    
});
//select post
app.get("/getrows",(req,res)=>{
    let sql="select * from user;";
    let query=db.query(sql,(err,result)=>{
        if(err)
            throw err;
        console.log(result);
        //get single attribute 
        //console.log(result[0].userName);
        res.send("data fetched");
    });
    
});
//update row get userid from user
app.get("/updaterow/:id",(req,res)=>{
    let newName="Syed Arshad";
    let sql=`update user set userName ='${newName}' where userid='${req.params.id};'`;
    let query=db.query(sql,(err,result)=>{
        if(err)
            throw err;
    console.log(result);
    res.send("Row updated!")
    });
    
});

app.get("/",(req,res)=>{
    res.send("Hey!");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})