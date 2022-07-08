const { getOngs } = require("../database");

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = getOngs().find((ong) => ong.id === id);

        if (!ong) {
            return response.status(400).json({ error: "No ONG found with this ID" });
        }

        return response.json(ong);
    },
};