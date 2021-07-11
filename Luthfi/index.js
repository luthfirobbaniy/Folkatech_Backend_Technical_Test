const express = require("express");
const { client, dbURI } = require("./config");
const { tokenRouter, userRouter } = require("./router");
const bearerToken = require("express-bearer-token");
const mongoose = require("mongoose");

const PORT = 2000;
const app = express();

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("Connected With MongoDB"))
	.catch((err) => console.log(err));

client.on("error", (err) => console.log(err));

app.use(express.json());
app.use(bearerToken());

app.get("/", (req, res) => {
	res.status(200).send("Hello");
});

app.use("/user", userRouter);
app.use("/token", tokenRouter);

app.listen(PORT, () => console.log(`API Active (Port: ${PORT})`));
