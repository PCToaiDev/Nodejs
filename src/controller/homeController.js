/*
import  connection  from '../configs/connectDB';


let getHomepage = (rep, res) => {


let data =[];
connection.query(
  'SELECT * FROM `mydb`',
  function(err, results, fields) {
    if(err) throw err ;
    console.log(results); // results contains rows returned by server : kết quả chứa các hàng được trả về bởi máy chủ
    

    results.map((row) => {
        data.push({
            id :row.id,
            first_name : row.lats_name,
            last_name : row.last_name,
            email : row.email

        })
    });
    // console.log(JSON.stringify(data));  hiện dạng string để truy vấn 

    return res.render('index.ejs', {datauser : data});
})

    
    
}

module.exports ={
    getHomepage
};


// module.exports = getHomepage ;


// export default getHomepage

*/

//----------------------------------------------

//  cách 2:

// import  pool  from '../configs/connectDB';

// let data =[];
// let getHomepage = async (rep, res) => {

// const [rows,fields] = await pool.execute('SELECT * FROM `mydb`');
//     rows.map((row) => {
//         data.push({
//             id :row.id,
//             first_name : row.lats_name,
//             last_name : row.last_name,
//             email : row.email

//         })
//     });

// // return res.render('index.ejs', {datauser : rows});

// console.log(`>>> check `, rows);

//   vẫn hiện tham số lên views .

//   };



import pool from "../configs/connectDB";

import multer from 'multer';





let getHomepage = async (rep, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `mydb`");
  //                        = await pool.execute('SELECT * FROM `mydb`');   hàm execute trả về 2 oject.

  //    console.log(rows); // kiểm tra rows
  return res.render("index.ejs", { data: rows });
};
// trong cú pháp { data: rows }, data là khóa và rows là giá trị được gán cho khóa đó.
// Khi truyền đối tượng { data: rows } vào hàm res.render(),
// đối tượng này sẽ được gửi đến trang index.ejs với data được truyền vào dưới
//   dạng biến để có thể sử dụng trong mã HTML của trang đó.
// Trong trang index.ejs, bạn có thể truy cập đến biến này bằng cú pháp <%= data %>.

let getDetailpage = async (rep, res) => {
  let userID = rep.params.id;
  // đặt biến userid là  rep.params.id       .id  là  :id route điều hướng đã đặt

  let user = await pool.execute("select * from `mydb` where `id` = ?", [
    userID,
  ]);
  //          hàm execute trả về 2 oject in module                     ? là  [],

  console.log(`check rep params:`, user[0]); // check giá trị [0] của user
  return res.send(JSON.stringify(user[0])); // kết thúc load , trả về 1 biến join tring hiển lên màng hình views.
};



let createUserdata = async (rep, res) => {
    console.log(`check rep`, rep.body)

    let {firstnameNEW,lastnameNEW,emailNEW} = rep.body;
    // let firstnameNEW = rep.body.firstnameNew   1 cách viết khai báo biến khác thường dùng

                                                             // mỗi dấu hỏi ứng 1 giá trị động tương ứng
    await pool.execute(" INSERT INTO `mydb`(lats_name,last_name,email) values(?,?,?) ",
    [ firstnameNEW,lastnameNEW,emailNEW ] );
  // THÊM đường dẫn để chèn dữ liệu trên database


//   hàm redirect là hàm quay ngược về route chuyển về tham số path
    return res.redirect('/')
};


let deleteUser = async ( rep , res ) => {
    let userID = rep.body.userIIDD;
    await pool.execute(`DELETE FROM mydb WHERE id = ?`, [userID]);
    return res.redirect('/')
    return res.send(`Delete User ${rep.body.userIIDD} `);

};


let getEditpage = async (rep , res) => {
    let id = rep.params.id;
    let [user, data] = await pool.execute( ` SELECT * FROM mydb WHERE id = ?`, [id]);

    return res.render('update.ejs',{EditUser : user[0]});  // key (views) :  giá trị biến user 

    return res.send( JSON.stringify(user));
}

let updateUser =  async (rep,res ) =>{
    console.log(`check rep`, rep.body);
    let {firstnameEdit,lastnameEdit,emailEdit, id} = rep.body;
    let user = await pool.execute( `UPDATE mydb SET lats_name = ?, last_name = ? , email = ? WHERE id= ? `,
    [ firstnameEdit, lastnameEdit, emailEdit, id]);
    return res.redirect('/');
    return res.send(`hello update`);
}






//  upload file and iamge
let getUploadfile =  async (rep,res) =>{
    return res.render(`uploadFile.ejs`);
};


// Hàm uploadFile xử lý tải lên tệp
let uploadFile  = async (rep, res) => {
  // Khởi tạo multer middleware với storage engine đã khởi tạo
  var upload = multer().single('profile_pic');
  // xem rep clien yêu cầu và trả về file có đúng tập tin cần không
  // console.log(rep.file);
  // Sử dụng middleware upload để xử lý tải lên tệp
                          //(err ) = next để sử lý lỗi nếu có lỗi xãy ra
  upload(rep, res, function (err) {
    
         if (rep.fileValidationError) {
         return res.send(rep.fileValidationError);
     }
    //  // nếu upload mà không gửi ảnh
    else if (!rep.file) {
        return res.send('Please select an image to upload');
    }
    else if ((err instanceof multer.MulterError && err.code === "LIMIT FILE")) {
        return res.send(err);
    }
//  có lỗi chổ này : nếu chạy code này sẽ gửi về rỗng
        // else if (err) {
        //     return res.send(err);
        // }

    // gửi ảnh về html gửi lên client cho người dùng xem. có thể console.blog () ở trên để tìm teen file.
    res.send(`You have uploaded this image: <hr/><img src= "/image/${rep.file.filename}" width="500"><hr /><a href="./upload">Upload another image</a>`);
    
  })
};







    

    var uploadMultilpeFile = async (rep ,res ) => {
// check teen files đã chọn
    console.log('>>>>checkfile ',rep.files);

// định ngĩa obj nhận và for lên client
    let result = "You have uploaded these images: <hr />";
    var files = rep.files;
    let index, len;
// Loop through all the uploaded images and display them on frontend
// sử dụng vòng  lặp với nhiều ảnh 
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
// + trả về đường truyền upload
    result += `<hr/><a href="./upload">Upload more images</a>`;
    res.send(result);


};








module.exports = {
  getHomepage,
  getDetailpage,
  createUserdata,
  deleteUser,
  getEditpage,
  updateUser,
  getUploadfile,
  uploadFile,
  uploadMultilpeFile
};

//   console.log(`check rep params:`, rep.params);    in ra giá trị của rep . tham chiếu theo database
