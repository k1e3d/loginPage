// подключение express
const express = require("express");
const mysql = require("mysql2/promise");
const path = require('path');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'users',
    password: '1234',
});



const app = express();

const urlencodedParser = express.urlencoded({extended: false});

function drop(){
    console.log("HEY")
}

app.get("/", function(req, res){
    // отправляем ответ

   res.sendFile(path.join(__dirname +'/html/index.html'));

    });
app.get("/reg", function(req, res){

    res.sendFile(path.join(__dirname +'/html/reg.html'));
});

app.post("/reg", urlencodedParser, function (req, res) {
    const name = req.body.userName;
    const mail = req.body.userMail;
    const password1 =req.body.userPassword1;
    const password2 =req.body.userPassword2;
    const now = new Date().toISOString();
    var date =now.substring(0, now.length - 14);


    if (password1==password2 & password1!="") {
        if (name != null)
            if (name != null) {
                const users = [
                    [name, mail, password1, date, date]
                ];
                const sql = `INSERT INTO users(name, mail,password,regDate,lstLogin) VALUES ?`;

                pool.query(sql, [users], function (err, results) {
                    if (err) console.log(err);
                    console.log(results);
                });
            }
    }


    res.sendFile(path.join(__dirname +'/html/reg.html'));
});



app.get("/lol", function(req, res){
    // отправляем ответ
    res.sendFile(path.join(__dirname +'/html/lol.html'));
});
app.get("/loginIn", function(req, res){

    res.sendFile(path.join(__dirname +'/html/index.html'));
});






app.get("/main", function(req, res){


    pool.query('SELECT * FROM users').then(function(data) {

        const user = data[0];

        res.send(`<!DOCTYPE html>
		
<form method = "get" action="/loginIn" >
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    
    
    
    <div ><button type="signUp"  class="btn  btn-lg btn-success " ><img width="30" src="https://www.flaticon.com/svg/vstatic/svg/3917/3917032.svg?token=exp=1645191514~hmac=b322b928c8e64a5d43daa3c164b6dcc6"</button></div>

<div class="btn-group" role="group" aria-label="Basic example">
			
  <button type="button" class="btn btn-secondary"><img width="30" src="https://www.flaticon.com/svg/vstatic/svg/3917/3917189.svg?token=exp=1645191514~hmac=24e8786d8c27518d2ec733b255cac825" alt="select/unselect all"></button>
  <button type="button" class="btn btn-secondary"><img  width="30" src="https://www.flaticon.com/svg/vstatic/svg/3917/3917378.svg?token=exp=1645191474~hmac=a87bd21fd804acee9388b88f93d222e9" alt="delete"></button>
</div>
    
    
    
    
</form>               
			    <table class="table table-striped">
                    <thead class="thead-dark">
                    <tr>
                    <th scope="col"><input type="checkbox" id ='all'></th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Registration date</th>
                    <th scope="col">Last login</th>
                    <th scope="col">Status</th>
                    </tr>
                    </thead>           
                    <tbody>
                    
     
                    ${user.map(user => 
                    `<tr>
                        <td><input type="checkbox" id =${user.id} ></td>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.mail}</td>
                        <td>${user.regDate.getDate().toString()+'.'+(user.regDate.getMonth()+1).toString()+'.'+user.regDate.getFullYear().toString()}</td>
                        <td>${user.lstLogin.getDate().toString()+'.'+(user.lstLogin.getMonth()+1).toString()+'.'+user.lstLogin.getFullYear().toString()}</td>
                        <td>${user.status}</td>   
                            
                    </tr>`                    
                    )}      	
				</tbody>
				</table>
			</body>
		</html>`);
    });
});



app.listen(3000);
console.log("http://127.0.0.1:3000")