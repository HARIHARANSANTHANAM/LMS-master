const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");
const account = require("../Model/users_model");
const jwt = require("jsonwebtoken");
const transporter=require('../service/emailTransporter');
const {SendMail}=require('../service/sendMail');
const jwt_decode=require('jwt-decode');

const tokenList = {}

const User_Signup = (req, res) => {
  var user = req.body;
  console.log(user);
  const { first_name, last_name, phone_no, password, email } = user;
  try {
    var salt = bcrypt.genSaltSync(14);
    var hashedPassword = bcrypt.hashSync(password, salt);
    account.findOne({ email }, (err, user) => {
      const new_user = new account({
        first_name,
        last_name,
        phone_no,
        password: hashedPassword,
        email,
      });
      new_user.save((err) => {
        if (err) {
          console.log(err);
          if( err.name === 'MongoError' && err.code === 11000 && err.keyValue.phone_no)
          {
            return res.status(200).send(
              JSON.stringify({
                error: true,
                success: false,
                errormsg:"Phone no already Exist"
              })
            );
          }
          else if( err.name === 'MongoError' && err.code === 11000 && err.keyValue.email){
            return res.status(200).send(
              JSON.stringify({
                error: true,
                success: false,
                errormsg:"Email already Exist"
              })
            );
          }
        } else {
          res.send(
            JSON.stringify({
              error: false,
              success: true,
              user: user,
            })
          );
        }
      });
    });
  } catch (e) {
    console.log(e);
    res.send(
      JSON.stringify({ error: "User Is not Added Successfully", success: "" })
    );
  }
};

const GenrateAccess_Token=('/token', (req,res) => {
  // refresh the damn token
  const postData = req.body;
  // if refresh token exists
  if((postData.refreshToken) && (postData.refreshToken in tokenList)) {

    const user=jwt_decode(postData.refreshToken);
    console.log(user);
    delete user["iat"];
    delete user["exp"];
      const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: parseInt(process.env.tokenLife)})
      const refreshToken = jwt.sign({
        email: user.email,
        userId: user.id,
      },
       process.env.refreshTokenSecret,
      { expiresIn: parseInt(process.env.refreshTokenLife)});
      const response = {
       "error": false,
       "success": true,
      "token": token,
      "refreshToken": refreshToken,
      }
      tokenList[refreshToken] = response
      return res.status(200).json(response);      
  } else {
      res.status(404).send('Invalid request')
  }
})

const User_Signin = (req, res) => {
  var { email, password, rememberMe } = req.body;
  var user = req.body;
  console.log(user);
  if (user.email == "" || user.password == "") {
    return res.send(JSON.stringify({ error: true, success: false }));
  } else {
    account.findOne({ email: email }, (err, user) => {
      console.log(err+" "+user)
      if (user) {
        let PWD_STATUS=bcrypt.compareSync(password,user.password);

        if(PWD_STATUS)
        {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
            },
            process.env.JWT_KEY,
            {expiresIn: parseInt(process.env.tokenLife)}
          );

          const refreshToken = jwt.sign({
            email: user.email,
            userId: user.id,
          },
           process.env.refreshTokenSecret,
          { expiresIn: parseInt(process.env.refreshTokenLife)});
          const response = {
           "error": false,
           "success": true,
          "token": token,
          "refreshToken": refreshToken,
          }
          tokenList[refreshToken] = response
          return res.status(200).json(response);

        }


        else{
          console.log("Invalid");
          return res.send(
            JSON.stringify({
              error: true,
              success: false,
            })
          );
        }
  }
  else{
    console.log("Invalid");
          return res.send(
            JSON.stringify({
              error: true,
              success: false,
            })
          );
        }
});
}

};


const User_ForgetPassword = (req, res) => {
  var { email } = req.body;
  console.log(email);
  if (email == "") {
    return res.send(
      JSON.stringify({ error: "Please Add All the Fields", success: "" })
    );
  } else {
    account.findOne({ email: email }, (err, user) => {
      if (user) {
        console.log(email);
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        const userid = user._id;
        const link = `http://localhost:3000/ResetPassword/${userid}/${token}`;
        // Step 2
        let mailOptions = {
          from: "Poornatha", // TODO: email sender
          to: email, // TODO: email receiver
          subject: "Nodemailer - Test",
          text: link,
        };
        // Step 3

        SendMail(mailOptions)
  
        return res.send(
          JSON.stringify({ error: "", success: "Logged In", user: user })
        );
      }
      
      if(!user){
        return res.send(
          JSON.stringify({
            error: true,
            success: "",
          })
        );
      }
    });
  }
};

const User_ResetPassword = async (req, res) => {
  console.log(typeof req.params._id);
  var salt = bcrypt.genSaltSync(14);
  var hashedPassword = bcrypt.hashSync(req.body.password, salt);
  try {
    const user = await account.findByIdAndUpdate(
      req.params._id,
      { password: hashedPassword },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).send(
      JSON.stringify({
        error: "",
        success: "User Password Successfully",
        data: user,
      })
    );
  } catch (err) {
    res.status(400).json({
      status: " failed",
      message: "In valid request",
    });
  }
};

const User_Validate = (req, res) => {
  var { email } = req.body;
  console.log(email);
  if (email == "") {
    return res.send(
      JSON.stringify({ error: "Please Add All the Fields", success: "" })
    );
  } else {
    account.findOne({ email: email }, (err, user) => {
      if (user) {
        console.log(email);

        const link = `http://localhost:3000/Signin`;
        let mailOptions = {
          from: "Poornatha",
          to: email,
          subject:
            "Verify yourself by clicking here!... Click the link to Signin",
          text: link,
        };
        // Step 3
        SendMail(mailOptions);

        return res.send(
          JSON.stringify({
            error: "",
            success: true,
            user: user,
          })
        );
      } else {
        return res.send(
          JSON.stringify({
            error: "Invalid Username Or Password",
            success: false,
          })
        );
      }
    });
  }
};

module.exports = {
  User_Signup,
  User_Signin,
  User_ForgetPassword,
  User_ResetPassword,
  User_Validate,
  GenrateAccess_Token
};
