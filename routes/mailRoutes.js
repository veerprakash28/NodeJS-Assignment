const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const mailController = require("../controllers/mailController");

const mailRouter = Router();

// mailRouter.get("/mails", mailController.mail_index);
mailRouter.get("/getmail", requireAuth, mailController.mail_get);
mailRouter.post("/sendmail", mailController.mail_post);
mailRouter.get("/sendmail", mailController.sendMail_get);
mailRouter.get("/download", mailController.mail_download);
mailRouter.get("/mailSent", mailController.mail_sent);
mailRouter.get("/error", mailController.error_404);

module.exports = mailRouter;
