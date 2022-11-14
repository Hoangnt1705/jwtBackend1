
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';

// create the connection, specify bluebird as Promise
class userService {
    salt = bcrypt.genSaltSync(10);
   
    hasUserPassword = (userPassword) => {
        let hashPassword = bcrypt.hashSync(userPassword, this.salt);
        return hashPassword;
    };

    createNewUser = (email, password, username) => {
        console.log(email, password, username);
        let hashPass = this.hasUserPassword(password);
        this.connection.query(
            'INSERT INTO users(email, password, username) VALUES(?, ?, ?)', [email, hashPass, username],
            function (err, results, fields) {
                if (err) {
                    console.log(err);
                }
                // console.log(results); // results contains rows returned by server
                // console.log(fields); // fields contains extra meta data about results, if available
            }
        );
    }
    getUserList = async () =>{
        const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

        let users = [];
        //   this.connection.query(
        //     'Select * from users',
        //     function (err, results, fields) {
        //         if (err) {
        //             console.log(err);
        //             return users
        //         }
        //         users = results;
        //         console.log(">>> run get userList:", users);
        //        return users;
        //     }
        // );
        // try {
        //     const [rows, fields] = await connection.execute('Select * from users');
        //     console.log(">>> check rows:", rows);
            
        // } catch (error) {
        //     console.log(">>> check error:", error);
        // }
       
        try {
            const [rows, fields] = await connection.execute('Select * from users');
            console.log(">>> check rows:", rows);
            return rows;

 
        } catch (error) {
            console.log(">>> check error:", error);
        }
    }

}
export default new userService;
