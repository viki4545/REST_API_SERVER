const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crudSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  summary: { type: String, required: true },
});

const Crud = mongoose.model("Crud", crudSchema);
module.exports = Crud;
