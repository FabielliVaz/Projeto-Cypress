const { getIncidents } = require("../database");

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = getIncidents().filter((i) => i.ong_id === ong_id);

        return response.json(incidents);
    },
}