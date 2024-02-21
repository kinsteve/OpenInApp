// task.model.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  due_date: {
    type: Date,
    required: [true, 'Due date is required'],
    validate: {
      validator: function(v) {
        return v && v >= new Date(); // Validate that due_date is a future date
      },
      message: props => `${props.value} is not a valid due date. Due date must be a future date.`,
    },
  },
  priority: {
    type: Number,
    required: [true, 'Priority is required'],
    enum: {
      values: [0, 1, 2, 3],
      message: `{VALUE} is not a valid priority. Priority must be 0, 1, 2, or 3.`,
    },
    default: 0,
  },
  status: {
    type: String,
    enum:{
      values: ['TODO', 'IN_PROGRESS', 'DONE'],
      message: `{VALUE} is not a valid status. Status must be 'TODO','IN_PROGRESS' or 'DONE'`
    },   
    default: 'TODO',
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

const Task = mongoose.model('Task', taskSchema);

export default Task;
