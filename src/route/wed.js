import  express  from "express";

import homeController from '../controller/homeController';

let router = express.Router();

const initWedroute = (app) => {
    router.get('/', homeController.getHomepage);

    router.get('/about', (req, res) => {
        res.send('Hello World2!')
      })
      

    return app.use('/',router);
}



// có 2 cách viết export ra 

 export default initWedroute;
// module.exports = initWedroute;