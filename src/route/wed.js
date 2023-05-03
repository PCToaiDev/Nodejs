import  express  from "express";

import homeController from '../controller/homeController';

import multer from 'multer';
import path from 'path';
// import  require  from "app-root-path";
var appRoot = require('app-root-path');


let router = express.Router();

// tạo ổ đĩa lưu tapm thời file
const storage = multer.diskStorage({
    destination: function (rep, file, cb) {
      cb(null, appRoot + '/src/public/image/');
      // console.log(file)
    },
    // filename chỉ 1 chuỗi định dạng số nên không xem được

    // filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    // }

    // định dạng jpg có thể xem. nó hổ trợ trả về 1 hình ảnh
    filename: function(rep, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
  }); 


// hàm kiểm tra hình ảnh
  const imageFilter = function(rep, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        rep.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };
  // fileFilter là 1 hàm kiểm tra hình ảnh của multer
let upload = multer({ storage: storage , fileFilter: imageFilter });

let upload1 = multer({ storage: storage , fileFilter: imageFilter }).array('multiple_images',10);



const initWedroute = (app) => {
    router.get('/', homeController.getHomepage);

    router.get('/detail/user/:id',homeController.getDetailpage);

    router.post('/create_user_data', homeController.createUserdata);

    router.post('/delete_user', homeController.deleteUser);

    router.get('/Edit_user/:id', homeController.getEditpage);

    router.post('/update-user', homeController.updateUser);

    router.get('/upload', homeController.getUploadfile );

    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.uploadFile);

    router.post('/upload-multiple-images',(rep ,res ,next ) =>{
      upload1(rep,res,(err) =>{
        if (err instanceof multer.MulterError && err.code === "LIMIT FILE"){
          res.send('LIMIT FILE')
        }else if(err){res.send(err)}
        else {next()};
      })
    },homeController.uploadMultilpeFile );

   




    // router.get('/about', (req, res) => {
    //     res.send(rep.params)
    //   })
      

    return app.use('/',router);
}



// có 2 cách viết export ra 

//  export default initWedroute;
module.exports = initWedroute;