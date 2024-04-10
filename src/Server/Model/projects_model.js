// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: { type: String},
  name: { type: String },
  domain: { type: String},
  startDate: { type: Date },
  endDate: { type: Date },
  complexity: { type: String }
});

const Project = mongoose.model('Projects', projectSchema);

module.exports = Project;
