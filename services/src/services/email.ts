import dotenv from "dotenv";
import nodemailer, { Transporter } from "nodemailer";
import { mail_configs } from "../types/mail_configs";

dotenv.config();

interface Email {
  from: string;
  to: string;
  subject: string;
  text: string;
}

function createTransporter(config: mail_configs): Transporter {
  let transporter = nodemailer.createTransport(config);
  return transporter;
}

const defaultConfig: mail_configs = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.FROM_EMAIL as string,
    pass: process.env.EMAIL_PASS as string,
  },
};

export const sendMail = async (messageOption: any) => {
  const transporter = createTransporter(defaultConfig);
  await transporter.verify();
  await transporter.sendMail(messageOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
};
