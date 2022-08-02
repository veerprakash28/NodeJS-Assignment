const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

// // Load dotenv
dotenv.config({ path: "../config/config.env" });

console.log(process.env.SENDGRID_API_KEY);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "veer.prakash_cs.aiml19@gla.ac.in",
  from: {
    name: "Veer Prakash",
    email: "veer.prakash_cs.aiml19@gla.ac.in",
  },
  subject: "Sending from SendGrid",
  text: "First mail sent from SendGrid",
  html: "<strong>Ok</strong>",
};
sgMail
  .send(msg)
  .then((response) => console.log("Mail sent"))
  .catch((err) => console.log(err));
