import SubTask from '../models/subtask.model.js';
import asyncHandler from 'express-async-handler';

const createSubTask = asyncHandler(async (req, res) => {
  const { task_id } = req.body;

  // Creating a new subtask
  const newSubTask = new SubTask({
    task_id: task_id,
  });

  try {
    await newSubTask.save();
    res.status(201).json({ message: 'Subtask created successfully', subtask: newSubTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create subtask', error: error.message });
  }
});


const updateSubTask = asyncHandler(async (req, res) => {
    const { subTaskId } = req.params;
    const { status } = req.body;
  
    try {
      const updatedSubTask = await SubTask.findByIdAndUpdate(
        subTaskId,
        { $set: { status } },
        { new: true , runValidators: true}
      );
  
      if (!updatedSubTask) {
        res.status(404).json({ message: 'Subtask not found' });
        return;
      }
  
      res.status(200).json({ message: 'Subtask updated successfully', subtask: updatedSubTask });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update subtask', error: error.message });
    }
});

const deleteSubTask = asyncHandler(async (req, res) => {
    const { subTaskId } = req.params;
  
    try {
      const subTask = await SubTask.findById(subTaskId);
  
      if (!subTask) {
        res.status(404).json({ message: 'Subtask not found' });
        return;
      }
  
      // Soft delete the subtask
      subTask.deleted_at = new Date();
      await subTask.save();
  
      res.status(200).json({ message: 'Subtask deleted successfully', subTask });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete subtask', error: error.message });
    }
  });

  const getSubTasks = asyncHandler(async (req, res) => {
    const { taskId } = req.query;
    let filter = {};
  
    if (taskId) {
      filter.task_id = taskId;
    }
  
    try {
      const subTasks = await SubTask.find(filter);
  
      res.status(200).json({ subTasks });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get subtasks', error: error.message });
    }
  });

  
export { 
    createSubTask,
    updateSubTask,
    deleteSubTask,
    getSubTasks
};
