const { Message } = require("../models");

// Send Message
module.exports.sendMessage = async (req, res) => {
  try {
    const { text, groupId } = req.body;
    const userId = req.user.id;

    const message = await Message.create({
      text,
      groupId,
      userId,
    });

    res.status(201).json({ messsage: "sent", message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Message
