import mongoose from 'mongoose';

const subTaskSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
    message: '{VALUE} is not a valid status. Status must be 0 for incomplete or 1 for complete.',
  },
  deleted_at:{
    type: Date,
    default: null
  }
},
{ timestamps: { 
    createdAt: 'created_at', 
    updatedAt: 'updated_at', 
} }
);

subTaskSchema.statics.countCompletedSubTasks = async function(taskId) {
  return this.countDocuments({ task_id: taskId, status: 1 , deleted_at: null }); // Count completed subtasks
};

subTaskSchema.post('save', async function() {
  const Task = mongoose.model('Task');
  const taskId = this.task_id;
  // console.log(taskId);
  // Count the number of completed subtasks for the task
  const completedSubTasksCount = await this.constructor.countCompletedSubTasks(taskId);

  // Get the total number of subtasks for the task
  const totalSubTasksCount = await this.constructor.countDocuments({ task_id: taskId , deleted_at: null });

  let newStatus = 'TODO'; // Default status

  if (completedSubTasksCount > 0 && completedSubTasksCount < totalSubTasksCount) {
    newStatus = 'IN_PROGRESS'; // Some subtasks are completed
  } else if (completedSubTasksCount === totalSubTasksCount) {
    newStatus = 'DONE'; // All subtasks are completed
  }

  // Update task status based on subtask status
  await Task.findByIdAndUpdate(taskId, { status: newStatus });
});

const SubTask = mongoose.model('SubTask', subTaskSchema);


export default SubTask;
