const Mail = require("../models/Mail");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const excelJs = require("exceljs");
const moment = require("moment");

// // Load dotenv

dotenv.config({ path: "./config/config.env" });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Routes

// module.exports.mail_index = (req, res) => {};

module.exports.mail_get = (req, res) => {
  Mail.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      //   console.log(result);
      res.render("mails", { mails: result });
    })
    .catch((err) => console.log(err));
};

module.exports.mail_post = async (req, res) => {
  console.log(req.body);
  const { to, name, from, subject, message } = req.body;

  // Structure Msg
  const msg = {
    to,
    from: {
      name: name,
      email: from,
    },
    subject,
    message,
  };

  console.log(msg);
  // Create mails db
  const mail = new Mail(req.body);

  // Saving mail to database
  mail
    .save()
    .then((result) => res.redirect("/getmail"))
    .catch((err) => res.status(400).json({ err }));

  // Sending mail through Sendgrid
  sgMail
    .send(msg)
    .then((response) => console.log("Mail sent"))
    .catch((err) => console.log(err));

  // console.log("Sent")
};

module.exports.mail_download = async (req, res) => {
  const startDate = moment(new Date()).startOf("month").toDate();
  const endDate = moment(new Date()).endOf("month").toDate();

  try {
    const mails = await Mail.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    const workbook = new excelJs.Workbook();
    const worksheet = workbook.addWorksheet("Download - All Mail");
    worksheet.columns = [
      { header: "S.No", key: "S_No", width: 6 },
      { header: "Receiver Email", key: "to", width: 30 },
      { header: "Sender Name", key: "name", width: 15 },
      { header: "Sender Email", key: "from", width: 30 },
      { header: "Subject", key: "subject", width: 25 },
      { header: "Message", key: "text", width: 30 },
    ];

    let count = 1;
    mails.forEach((mail) => {
      mail.S_No = count;
      worksheet.addRow(mail);
      count += 1;
    });
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const data = await workbook.xlsx.writeFile("Download - All Mail.xlsx");
    // console.log("Downloaded Files");
    res.render("download");
  } catch (err) {
    // console.log(err);
    res.status(500).send(err);
  }
};

module.exports.sendMail_get = async (req, res) => {
  res.render("sendmail");
};
