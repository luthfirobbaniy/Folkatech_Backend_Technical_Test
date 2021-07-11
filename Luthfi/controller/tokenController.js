const { tokenCreator } = require("../helper");

const getToken = async (req, res) => {
	const { name } = req.body;

	try {
		const token = tokenCreator(name);

		res.status(200).send({ token });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

module.exports = {
	getToken,
};
