const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: [true, "Receiver's mail missing"],
    },
    name: {
      type: String,
      required: [true, "Enter Sender's Name"],
    },
    from: {
      type: String,
      required: [true, "Sender's Mail Missing"],
    },
    subject: {
      type: String,
      required: [true, "Subject Missing"],
    },
    message: {
      type: String,
      required: [true, "Message missing"],
    },
  },
  {
    timestamps: true,
  }
);

const Mail = mongoose.model("mail", mailSchema);

module.exports = Mail;
