var mongoose = require('mongoose');

var Project = new mongoose.Schema({
        github: { type: String, required: true },
        images: { type: [String], required: true },
        name: { type: String, required: true },
        technologies: { type: [String], required: true },
        status: { type: String, required: true },
        key_elements: { type: [String], required: true },
        desc: { type: String, required: true },
        importance: {type: Number, default: 5},
    });

var Admin = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    pw_hash: {
        type: String,
        required: true,
    }
});

module.exports = {
    Project: Project,
    Admin: Admin
}