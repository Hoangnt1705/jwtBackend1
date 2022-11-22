
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';
import db from '../models/index.js'
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
        await db.User.create({
            username: username,
            email: email,
            password: hashPass,
          });
        } catch (error) {
            console.log(">>>check error:", error);
        }
    }
    getUserList = async () => {
        try {
            let users = [];
            users = await db.User.findAll();
            // example: findAll => [{}, {}...]
            return users;
            // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

            // // const [rows, fields] = await connection.execute('Select * from user');
            // const [rows, fields] = await connection.execute('Select * from user');
            // // console.log(">>> check rows:", rows);
            // return rows;
        } catch (error) {
            console.log(error);
        }
       
    }
    deleteUser = async (userID) => {
        try {
          await db.User.destroy({
            where: {
                id: userID
            }
          })
        //   const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

        //   // const [rows, fields] = await connection.execute('Select * from user');
        //   const [rows, fields] = await connection.execute('DELETE FROM user WHERE id= ?', [id]);
        //   // console.log(">>> check delete:", rows);
        //   return rows;
        } catch (error) {
            console.log(">>> check error:", error);
        }

    }
    getUserById = async (id) => {
        try {
            let user = {};
            user = await db.User.findOne({
                where: {
                    id: id
                }
            })
            return user.get({ plain: true })
            // findOne => chỉ 1 {}
            // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

            // const [rows, fields] = await connection.execute('Select * FROM user WHERE id= ?', [id]);
            // return rows;
        } catch (error) {
            console.log(">>> check error:", error);
        }
    }
    updateUserInfor = async (email, username, id) => {
        try {
            await db.User.update({
               email: email, username: username 
            },
            {
                where: {id: id},
            });
            // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

            // const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]);
            // return rows;
        } catch (error) {
            console.log(">>> check error:", error);
        }
    }
}
export default new userService;
