let ongs = [];
let incidents = [];

module.exports = {
    getOngs: () => ongs,
    addOng: (ong) => ongs.push({ ...ong }),
    deleteOng: (id) => {
        ongs = ongs.filter((ong) => ong.id !== id);
    },
    getIncidents: () => incidents,
    addIncidents: (incident) => incidents.push({ ...incident }),
    deleteIncidents: (id) => {
        incidents = incidents.filter((incident) => incident.id !== id);
    },
}; 