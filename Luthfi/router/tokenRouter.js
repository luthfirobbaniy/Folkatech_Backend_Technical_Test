const express = require("express");
const router = express.Router();
const { getToken } = require("../controller/tokenController");

// Get (token)
router.get("/", getToken);

module.exports = router;
