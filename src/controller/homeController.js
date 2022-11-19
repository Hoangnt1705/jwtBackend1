import userService from '../service/userService.js'
class homeController {

    handleHelloworld = (req, res) => {
        let name1 = "aaaaa";
        return res.render("home.ejs", { name1 })
    }
    handleUserPage = async (req, res) => {
        let userList = await userService.getUserList();
        console.log(userList);
        return res.render("user.ejs", { userList })
    }
    handleCreateNewUser = (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;
        userService.createNewUser(email, password, username)
        return res.redirect("/user")
    }
    handleDeleteUser = async (req, res) => {
        console.log(">>> checkid:", req.params.id);
        await userService.deleteUser(req.params.id);
        return res.redirect("/user")
    }
    getUpdateUserPage = async (req, res) => {
        let id = req.params.id;
        let user = await userService.getUserById(id)
        console.log(">>> check user", user)


        return res.render("user-update.ejs")
    }
}

export default new homeController

