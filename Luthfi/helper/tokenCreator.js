const jwt = require("jsonwebtoken");

const tokenCreator = (data) => {
	return jwt.sign({ data }, "key", {
		expiresIn: "1h",
	});
};

module.exports = tokenCreator;
