import Task from '../models/task.model.js';
import asyncHandler from 'express-async-handler';
import SubTask from '../models/subtask.model.js';

const createTask = asyncHandler(async (req, res) => {
  const { title, description, due_date, priority, status } = req.body;

  const newTask = new Task({
    title,
    description,
    due_date,
    priority,
    status,
  });

  try {
    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
});

const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { due_date, status } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: { due_date, status } },
        { new: true,runValidators: true }
      );
  
      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
  
      res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update task', error: error.message });
    }
  });


  const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
  
    try {
      const task = await Task.findById(taskId);
  
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
  
      // Soft delete the task
      task.deleted_at = new Date();
      await task.save();
  
      // Soft delete all associated subtasks
      const subTasks = await SubTask.find({ task_id: taskId });
      for (const subTask of subTasks) {
        subTask.deleted_at = new Date();
        await subTask.save();
      }
  
      res.status(200).json({ message: 'Task and associated subtasks deleted successfully', task });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete task and associated subtasks', error: error.message });
    }
  });

  const getAllTasks = asyncHandler(async (req, res) => {
    const { priority, dueDate, page = 1, limit = 10 } = req.query;
    let filter = {};
  
    if (priority) {
      filter.priority = priority;            //filtering by priority
    }
  
    if (dueDate) {
      // Convert dueDate to a Date object and adjust it to the end of the day
      const endOfDay = new Date(dueDate);
      endOfDay.setHours(23, 59, 59, 999);
  
      filter.due_date = { $lte: endOfDay };
    }
  
    try {
      const tasks = await Task.find(filter)
        .skip((page - 1) * limit)          // skipping the previous  pages
        .limit(limit);                // setting  a limit to display on each page
  
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get tasks', error: error.message });
    }
  });

export 
{ 
    createTask,
    updateTask,
    deleteTask,
    getAllTasks 
};
