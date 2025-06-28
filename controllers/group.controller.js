const { Group, User, Message } = require("../models");

// Get User Groups
module.exports.getUserGroups = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [],
      include: {
        model: Group,
        through: { attributes: [] },
        include: [
          {
            model: Message,
            attributes: ["id", "text", "createdAt"],
            include: [
              {
                model: User,
                attributes: ["username"],
              },
            ],
          },
        ],
      },
      order: [[{ model: Group }, { model: Message }, "createdAt", "ASC"]],
    });

    res.status(200).json(user.Groups);
  } catch (err) {
    console.log(err);
  }
};

// Create Group
module.exports.createGroup = async (req, res) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      createdByUserId: req.user.id,
    });

    group.addUsers([req.user.id, ...req.body.members]);

    res.status(201).json({ success: "Group has been created", group });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add members
module.exports.addMembers = async (req, res) => {
  try {
    const group = await Group.findByPk(req.body.grpId);

    group.addUsers(...req.body.members);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// remove members
module.exports.removeMembers = async (req, res) => {};

// Update group
module.exports.updateGroup = async (req, res) => {};

// delete group
module.exports.deleteGroup = async (req, res) => {};
