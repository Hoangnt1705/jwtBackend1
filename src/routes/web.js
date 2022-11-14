import express from "express";
import homeController from "../controller/homeController.js"
const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */


const initWebRoutes = (app) => {
    
    router.get("/", homeController.handleHelloworld);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-ud", homeController.handleCreateNewUser);
    return app.use("/", router);
};

export default initWebRoutes;   