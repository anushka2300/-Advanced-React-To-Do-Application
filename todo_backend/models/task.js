const { required } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    important: { type: Boolean, default: false }, 
    status: { type: String, enum: ["not completed", "completed"], default: "not completed" },
    createdAt: { type: Date, default: Date.now }
  });



const task=mongoose.model('task',taskSchema);
module.exports=task