const express = require('express');
const router = express.Router();
const Task=require('../models/task')

router.post('/addtasks', async (req,res)=>{
  try {
    const { title } = req.body;
    const newTask = new Task({ title, status: "not completed" }); 
    await newTask.save();
    const tasks = await Task.find();   
    res.status(201).json(tasks);   
} catch (error) {
    res.status(500).json({ message: 'Error adding task' });
}
    }
);        

router.get("/filter", async (req, res) => {
  try {
    const { filter } = req.query;
    let query = {};

    if (filter === "important") {
      query.important = true;
    } else if (filter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      query.createdAt = { $gte: today, $lt: tomorrow };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});
   

router.delete('/tasks/:id',async (req,res)=>{
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
      }
    }
);  

router.patch('/status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.status = task.status === "completed" ? "not completed" : "completed";
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ message: "Error updating task status" });
    }
});

  
  router.patch('/important/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      task.important = !task.important;  
      await task.save();
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error updating important status" });
    }
  });
  

  


module.exports = router;
