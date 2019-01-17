var mongoose = require('mongoose');

Project = new mongoose.Schema({
        github: String,
        images: [String],
        name: String,
        technologies: [String],
        status: String,
        key_elements: [String],
        desc: String
    })

module.exports = {
    Project: Project
}