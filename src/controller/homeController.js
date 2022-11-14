import userService from '../service/userService.js'
class homeController {

    handleHelloworld = (req, res) => {
        let name1="aaaaa";
        return res.render("home.ejs", {name1})

    }
    handleUserPage = async (req, res) => {
       let userList = await userService.getUserList();
       console.log(">>> check UserList:", userList);
        return res.render("user.ejs", {userList})
    }
    handleCreateNewUser = (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;


        // userService.createNewUser( email, password, username)


        return res.send("handleCreateNewUser")

    }
}

export default new homeController

