const express = require("express");
const { tokenChecker } = require("../helper");
const {
	postUserData,
	getAllUserData,
	getUserDataByAccountNumber,
	getUserDataByIdentityNumber,
	updateDataUser,
	deleteUserData,
} = require("../controller/userController");
const router = express.Router();

// Create
router.post("/", tokenChecker, postUserData);

// Get all
router.get("/", tokenChecker, getAllUserData);

// Get by account number
router.get("/accountNumber/:num", tokenChecker, getUserDataByAccountNumber);

// Get by identityNumber
router.get("/identityNumber/:num", tokenChecker, getUserDataByIdentityNumber);

// Update
router.patch("/:_id", tokenChecker, updateDataUser);

// Delete
router.delete("/:_id", tokenChecker, deleteUserData);

module.exports = router;
