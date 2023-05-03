
import  express  from "express";
import APIcontroller from "../controller/APIcontroller";

let router = express.Router();
const initAPIRoute = (app) => {

    router.get('/users', APIcontroller.getALLuserapi);  // method : get  = READ
    router.post('/create_user_api',APIcontroller.createNewuser ) ; // method : post  = create
    router.put('/update_user_api', APIcontroller.updateUserAPi);   // method : put = update 
    router.delete('/delete_user_api/:id', APIcontroller.deleteUserAPi);  //  method : delete = delete

    return app.use('/api/v1/',router);
}
module.exports = initAPIRoute;