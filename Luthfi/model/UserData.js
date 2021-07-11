const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
	userName: String,
	accountNumber: String,
	emailAddress: String,
	identityNumber: String,
});

const UserData = mongoose.model("user_datas", schema);

module.exports = UserData;
