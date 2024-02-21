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

const SubTask = mongoose.model('SubTask', subTaskSchema);

export default SubTask;
