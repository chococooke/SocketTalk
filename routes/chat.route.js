const { sendMessage } = require("../controllers/chat.controller");
const { verifyLogin } = require("../middlewares/verifyLogin");

const router = require("express").Router();

router.post('/send', verifyLogin, sendMessage);

module.exports = router;