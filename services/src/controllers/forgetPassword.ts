import ejs from "ejs";

import dotenv from "dotenv";

import { sendMail } from "../services/email";
import { query } from "../services/dbconnect";
import path from 'path';

dotenv.config();

export const forgetPassword = async () => {
  const users = (await query("SELECT * FROM users WHERE resetPassword = 1"))
    .recordset;

  console.log(users);

  for (let user of users) {
    ejs.renderFile(
      path.join(__dirname,"../templates/forgotPassword.ejs"),
      { Name: user.user_name ,code: user.user_id },
      async (error, data) => {
        
        
        let mailOptions = {
          from: process.env.EMAIL as string,
          to: user.email,
          subject: "PassWord Reset Link",
          html: data,
        };

        try {
          await sendMail(mailOptions);

          await query("UPDATE users SET resetPassword = 0 WHERE resetPassword = 1");

          console.log("Emails send to poople who forgot passwords users");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};
