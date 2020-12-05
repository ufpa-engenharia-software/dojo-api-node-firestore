module.exports = app => {
	app.get("/", async (req, res) => {
				res.send(
						{
							"status": "pai ta on"
						}
			);
	}
	);	
};