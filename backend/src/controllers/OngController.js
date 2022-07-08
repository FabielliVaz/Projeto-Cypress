const crypto = require("crypto");
const { getOngs, addOng } = require("../database");

module.exports = {
    async index(request, response) {
        return response.json(getOngs());
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString("HEX");

        addOng({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    },
};