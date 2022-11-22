
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';
const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

// create the connection, specify bluebird as Promise
class userService {
    salt = bcrypt.genSaltSync(10);

    hasUserPassword = (userPassword) => {
        let hashPassword = bcrypt.hashSync(userPassword, this.salt);
        return hashPassword;
    };
    createNewUser = async (email, password, username) => {
        let hashPass = this.hasUserPassword(password);
        try {
            const [rows, fields] =
                await connection.execute('INSERT INTO user(email, password, username) VALUES(?, ?, ?)',
                    [email, hashPass, username]);
        } catch (error) {
            console.log(">>>check error:", error);
        }
    }
    getUserList = async () => {
        let user = [];
        try {
            // const [rows, fields] = await connection.execute('Select * from user');
            const [rows, fields] = await connection.execute('Select * from user');
            // console.log(">>> check rows:", rows);
            return rows;
        } catch (error) {
            console.log(">>> check error:", error);
        }
    }
    deleteUser = async (id) => {
        try {
            // const [rows, fields] = await connection.execute('Select * from user');
            const [rows, fields] = await connection.execute('DELETE FROM user WHERE id= ?', [id]);
            // console.log(">>> check delete:", rows);
            return rows;
        } catch (error) {
            console.log(">>> check error:", error);
        }

    }
    getUserById = async (id) => {
        try {
            const [rows, fields] = await connection.execute('Select * FROM user WHERE id= ?', [id]);
            return rows;
        } catch (error) {
            console.log(">>> check error:", error);
        }
    }
    updateUserInfor = async (email, username, id) => {
        try {
            const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]);
            return rows;
        } catch (error) {
            console.log(">>> check error:", error);
        }
    }
}
export default new userService;
