const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController"); // ✅ make sure login is imported

router.post("/signup", signup);
router.post("/login", login); // ✅ this line was failing before

module.exports = router;
