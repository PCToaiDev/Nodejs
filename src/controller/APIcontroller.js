
import pool from '../configs/connectDB';

let getALLuserapi = async (rep,res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM `mydb`");

    return res.status(200).json({
        message : 'ok',
        data: rows 
    })
}

let createNewuser = async( rep,res ) =>{

    let {firstnameNEW,lastnameNEW,emailNEW} = rep.body;

    if(!firstnameNEW || !lastnameNEW || !emailNEW){
        return res.status(200).json({
            message : 'files emty = khong truyen data'
        })
    }


    let [rows,shield] = await pool.execute(" INSERT INTO `mydb`(lats_name,last_name,email) values(?,?,?) ",
    [ firstnameNEW,lastnameNEW,emailNEW ] );

    
    return res.status(200).json({
        message : 'ok',
       
    })
};


let updateUserAPi = async (rep,res) =>{
    let {firstnameEdit,lastnameEdit,emailEdit, id} = rep.body;

    if(!firstnameEdit || !lastnameEdit || !emailEdit || !id){
        return res.status(200).json({
            message : 'files emty = khong truyen data'
        })
    }
    let [user] = await pool.execute( `UPDATE mydb SET lats_name = ?, last_name = ? , email = ? WHERE id= ? `,
    [ firstnameEdit, lastnameEdit, emailEdit, id]);


    return res.status(200).json({
        message : 'ok',
    })
};




let deleteUserAPi = async (rep,res) => {

    let userID = rep.params.id;
    
    if(!userID){
        return res.status(200).json({
            message : 'files emty = khong truyen data'
        })
    };
    
    await pool.execute(`DELETE FROM mydb WHERE id = ?`, [userID]);

    return res.status(200).json({
        message : 'ok',
    })
};



module.exports= {
    getALLuserapi, createNewuser, updateUserAPi , deleteUserAPi
}