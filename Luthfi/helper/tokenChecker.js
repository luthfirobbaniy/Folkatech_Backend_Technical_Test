const jwt = require("jsonwebtoken");

const tokenChecker = (req, res, next) => {
	try {
		jwt.verify(req.token, "key");
		next();
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = tokenChecker;
