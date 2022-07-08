const crypto = require("crypto");
const {
    getOngs,
    getIncidents,
    addIncidents,
    deleteIncidents,
} = require("../database");

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const count = getIncidents().length;

        const incidents = getIncidents()
            .slice((page - 1) * 5, page * 5)
            .map((i) => {
                const { id, ...info } = getOngs().find((o) => o.id === i.ong_id);
                return { ...i, ...info };
            });

        response.header("X-Total-Count", count["count(*)"]);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body; // bb22417cbb22417c

        const ong_id = request.headers.authorization;
        const id = crypto.randomBytes(4).toString("HEX");

        addIncidents({
            id,
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = getIncidents().find((i) => i.id === id);

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permited" });
        }

        deleteIncidents(id);

        return response.status(204).send();
    },
};