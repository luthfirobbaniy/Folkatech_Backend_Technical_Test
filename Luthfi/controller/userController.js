const UserData = require("../model/UserData");
const { client } = require("../config");

const postUserData = async (req, res) => {
	const { userName, accountNumber, emailAddress, identityNumber } = req.body;

	try {
		// Check data to prevent duplicates
		const findData = await UserData.find().or([
			{ userName },
			{ accountNumber },
			{ emailAddress },
			{ identityNumber },
		]);

		if (findData.length) {
			return res.status(200).send({
				messsage:
					"userName, accountNumber, emailAddress and/or identityNumber not available",
			});
		}

		// Post
		const postData = await UserData.create(req.body);

		// Get All User Data
		const allUserData = await UserData.find();

		// Set Redis Key - Value and Expiry for All User Data
		client.setex(`userData`, 600, JSON.stringify(allUserData));

		// Response
		res.status(200).send({ message: "Posted!", data: postData });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const getAllUserData = async (req, res) => {
	try {
		client.get(`userData`, async (err, data) => {
			if (data) {
				// Response data from Redis
				return res.status(200).send({ data: JSON.parse(data) });
			} else {
				// Get Data
				const getData = await UserData.find();

				// Set Redis Key - Value and Expiry for All User Data
				client.setex(`userData`, 600, JSON.stringify(getData));

				// Response
				res.status(200).send({ data: getData });
			}
		});
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const getUserDataByAccountNumber = async (req, res) => {
	const accountNumber = req.params.num;

	try {
		client.get(`accountNumber_${accountNumber}`, async (err, data) => {
			if (data) {
				// Response data from Redis
				return res.status(200).send({ data: JSON.parse(data) });
			} else {
				// Get Data
				const getData = await UserData.findOne({ accountNumber });

				if (!getData) {
					return res.status(200).send({ messsage: "User not found!" });
				}

				// Set Redis Key - Value and Expiry
				client.setex(
					`accountNumber_${accountNumber}`,
					600,
					JSON.stringify(getData)
				);

				// Response
				res.status(200).send({ data: getData });
			}
		});
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const getUserDataByIdentityNumber = async (req, res) => {
	const identityNumber = req.params.num;

	try {
		client.get(`identityNumber_${identityNumber}`, async (err, data) => {
			if (data) {
				// Response if data from Redis founded
				return res.status(200).send({ data: JSON.parse(data) });
			} else {
				// Get Data
				const getData = await UserData.findOne({ identityNumber });

				if (!getData) {
					return res.status(200).send({ messsage: "User not found!" });
				}

				// Set Redis key value pair and expiry
				client.setex(
					`identityNumber_${identityNumber}`,
					600,
					JSON.stringify(getData)
				);

				// Response
				res.status(200).send({ data: getData });
			}
		});
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const updateDataUser = async (req, res) => {
	const { _id } = req.params;
	const { userName, accountNumber, emailAddress, identityNumber } = req.body;

	try {
		// Check data to prevent duplicates
		const findData = await UserData.find().or([
			{ userName },
			{ accountNumber },
			{ emailAddress },
			{ identityNumber },
		]);

		if (findData.length) {
			return res.status(200).send({
				messsage: `Your request was rejected. The data you entered may result in duplicate data`,
			});
		}

		// Patch Data
		const patchedData = await UserData.findByIdAndUpdate(_id, req.body, {
			new: true,
		});

		if (!patchedData) {
			return res.status(200).send({ message: "User not found!" });
		}

		// Set Redis key value pair and expiry for one user data
		client.setex(
			`accountNumber_${patchedData.accountNumber}`,
			600,
			JSON.stringify(patchedData)
		);

		client.setex(
			`identityNumber_${patchedData.identityNumber}`,
			600,
			JSON.stringify(patchedData)
		);

		// Get All User Data
		const allUserData = await UserData.find();

		// Set Redis Key - Value and Expiry for all user data
		client.setex(`userData`, 600, JSON.stringify(allUserData));

		// Response
		res.status(200).send({ message: "Updated!", data: patchedData });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const deleteUserData = async (req, res) => {
	const { _id } = req.params;

	try {
		// Find and Delete Data
		const deletedData = await UserData.findByIdAndDelete(_id);

		if (!deletedData) {
			return res.status(200).send({ message: "User not found!" });
		}

		// Delete Redis key value pair
		const { accountNumber, identityNumber } = deletedData;

		client.del(
			`accountNumber_${accountNumber}`,
			`identityNumber_${identityNumber}`
		);

		// Get All User Data
		const allUserData = await UserData.find();

		// Set Redis Key - Value and Expiry for All User Data
		client.setex(`userData`, 600, JSON.stringify(allUserData));

		// Response
		res.status(200).send({ message: "Deleted!" });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

module.exports = {
	postUserData,
	getAllUserData,
	getUserDataByAccountNumber,
	getUserDataByIdentityNumber,
	updateDataUser,
	deleteUserData,
};
