const {
  getUserGroups,
  createGroup,
  addMembers,
} = require("../controllers/group.controller");
const { verifyLogin } = require("../middlewares/verifyLogin");

const router = require("express").Router();

router.get("/my-groups", verifyLogin, getUserGroups);
router.post("/create", verifyLogin, createGroup);
router.patch("/add-members", verifyLogin, addMembers);

module.exports = router;
