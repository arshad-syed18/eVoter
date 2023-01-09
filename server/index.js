import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';

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

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "evoter.noreply@gmail.com",
        pass: 'jtemhmffvldlhepb'
    }
})

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
    updateActiveStatus()
    calculateResults()
    calculateWinners()
    console.log('Done with calling procedures!');
});

function calculateWinners() {
    // Get all elections
    let sqlQuery = "SELECT DISTINCT election_id FROM results";
    db.query(sqlQuery, (err, elections) => {
      if (err) {
        console.log(err);
      } else {
        // Call stored procedure for each election
        elections.forEach((election) => {
          let sqlQuery = "CALL calculate_winner(?)";
          let params = [election.election_id];
          db.query(sqlQuery, params, (err, result) => {
            if (err) {
              console.log(err);
            }
          });
        });
      }
    });
    db.query("call update_election_victor()",(err, result) => {
        if (err) {
            console.log();
          }
    })
  }
  

function calculateResults(){
    let sqlQuery = "SELECT ec.election_id, ec.candidate_id FROM election_candidates ec INNER JOIN election e ON ec.election_id = e.election_id WHERE e.endDate < CURDATE()";
    db.query(sqlQuery, (err,result) => {
        if (err) {
            console.log(err);
            return;
          }
          // Call the calculate_results stored procedure for each election_id and candidate_id
          result.forEach(row => {
            const election_id = row.election_id;
            const candidate_id = row.candidate_id;
            db.query('CALL calculate_results(?, ?)', [election_id, candidate_id], (error, results) => {
              if (error) {
                return;
              }
            });
          });
    })
}

function updateActiveStatus() {
    // get elections details
    let sqlQuery = "SELECT election_id, startDate, endDate FROM election";
    db.query(sqlQuery, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            result.forEach((row) => {
                let {election_id, startDate, endDate} = row;
                db.query("CALL update_active_status(?)", [election_id], (error, res) => {
                    if(error) {
                        console.log(error);
                    }
                });
            });
        }
    });
}




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
app.post('/api/deleteUser', (req,res) => {
    let voter_id=req.body.voter_id;
    let sqlQuery = "delete from user where voter_id=?";
    db.query(sqlQuery,voter_id, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("User deleted successfully!");
        res.send(true);
    })
})
app.post('/api/deleteCandidate', (req,res) => {
    let candidate_id=req.body.candidate_id;
    let sqlQuery = "delete from candidate where candidate_id in (?)";
    db.query(sqlQuery,candidate_id, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("User deleted successfully!");
        res.send(true);
    })
})
app.post('/api/deletePreviousElection', (req,res) => {
    let voter_id=req.body.election_id;
    let sqlQuery = "delete from election where election_id in (?)";
    db.query(sqlQuery,voter_id, (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("Election deleted successfully!");
        res.send(true);
    })
})
app.post('/api/deleteCandidatesFromElection', (req,res) => {
    let election_id=req.body.election_id;
    let candidate_id=req.body.candidate_id;
    let sqlQuery = "delete from election_candidates where election_id in (?) and candidate_id in (?)";
    db.query(sqlQuery,[election_id,candidate_id], (err,result) => {
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        console.log("Candidate deleted successfully!");
        res.send(true);
    })
})
app.post('/api/getUserPassword', (req,res) => {
    let voter_id=req.body.voter_id;
    let sqlQuery = "select email,password from user where voter_id=?";
    let ans = db.query(sqlQuery,[voter_id],(err,result)=>{
        if(err!=null){
            console.log(err);
            res.status(404).send("Error!");
        }
        let details = {
            from: "fallenone189@gmail.com",
            to: result[0].email,
            subject: 'eVoter password',
            text: 'The password for your eVoter account is as follows : '+result[0].password
        }
        mailTransporter.sendMail(details, (err)=>{
            if(err)
                console.log(err);
            else 
                console.log("Password sent!")
        })
        res.send("Passwords have been sent to the users email account");
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
app.post('/api/addElection', (req,res) => {
    const name = req.body.name;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const positionName = req.body.positionName;
    const description = req.body.description;
    const candidatesChosen = req.body.candidatesChosen;
    var currentDate = new Date().toISOString().slice(0, 10);
    let currentlyActive = 0;
    let election_id;
    if (currentDate >= startDate && currentDate <= endDate) {
    currentlyActive = 1;
    } else {
    currentlyActive = 0;
    }
    let sqlQuery = "insert into election(name,startDate,endDate,positionName,Description,currentlyActive) values(?,?,?,?,?,?)";
    db.query(sqlQuery,[name,startDate,endDate,positionName,description,currentlyActive], (err) => {
        if(err!=null){
            console.log(err);
            res.status(404).send(""+err.errno);
        } else {
            console.log("Election Data successfully entered!");
            db.query('select election_id from election where name=? and startDate=? and endDate=?', 
                [name,startDate,endDate], (error,result) => {
                    if(err!=null){
                        console.log(error);
                        res.send(""+err.errno);
                    }
                    else{
                        election_id = result[0].election_id;
                        candidatesChosen.forEach(elem => {
                            db.query('insert into election_candidates values(?,?)',[election_id,elem], (e,r) => {
                                if(e){
                                    console.log(e);
                                } else {
                                    console.log("inserted "+elem+" candidate");
                                }
                            });
                        });
                        console.log("All Done!");
                        res.send("Successful!");
                    }
                })
            
        }
    })
})
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
app.post('/api/getInactiveElectionCandidates', (req,res) => {
    const election_id = req.body.election_id;
    let sqlQuery = "select c.* from candidate c, election e, election_candidates ec where e.election_id= ? and c.candidate_id = ec.candidate_id and e.election_id=ec.election_id"
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
        else if(typeof result[0] === 'undefined'){
            console.log("No User Found!");
            res.status(404).send("user does not exist");
        }
        else {
            if(result[0].password === password){
                console.log("Congrats password matches!");
                res.status(200).send("Password matches!")
            }
            else {
                console.log("password did not match!");
                res.status(404).send("Password did not match!")
            }}
    });
    
})
app.post('/api/addCandidate', (req,res) => {
    const data = req.body;
    const candidate_id = data.candidate_id;
    const name = data.name;
    const currentPos = data.currentPosition;
    const partyName = data.partyName;
    const partyImage = data.partyImage;
    const city = data.City;
    const intro = data.introDetails;
    
    let sqlQuery = "insert into candidate(candidate_id,name,currentPosition,partyName,partyImage,City,introDetails) values(?,?,?,?,?,?,?)";
    
    
    
    
    db.query(sqlQuery,[candidate_id,name,currentPos,partyName,partyImage,city,intro], (err,result)=>{
        if(err!=null){
            console.log(err);
            res.status(404).send({errorCode : err.errno});
            
        }
        else{
            console.log("Candidate Inserted Successfully");
            res.status(200).send("Candidate Insertion Successful!");
        }
    })
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
    console.log("Server is running on port 3001");

})
