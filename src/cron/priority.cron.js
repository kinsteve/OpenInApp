import moment from "moment";
import cron from "node-cron";
import Task from "../models/task.model.js";

const currentDay = moment(); 
const tomorrow = moment().add(1, 'days'); 
const dayAfterTomorrow = moment().add(2, 'days'); 
const thirdDay = moment().add(3, 'days'); 
const fourthDay = moment().add(4, 'days'); 
const fifthDay = moment().add(5, 'days'); 
// Define priority ranges
const priorityRanges = [
    { from: currentDay, to: currentDay, priority: 0 },
    { from: tomorrow, to: dayAfterTomorrow, priority: 1 },
    { from: thirdDay, to: fourthDay, priority: 2 },
    { from: fifthDay, priority: 3 }, // No end date for 5+ days
  ];
  
// Cron job function
const updatePriorities = async () => {
    try {
        for (const range of priorityRanges) {
          const query = {
            due_date: { $gte: range.from.startOf('day').toDate() }
          };
    
          if (range.to) {
            query.due_date.$lte = range.to.endOf('day').toDate();
          }
    
          await Task.updateMany(query, {
            $set: { priority: range.priority },runValidation:true
          });
        }
      } catch (error) {
        console.error('Failed to update priority:', error);
      }
};

// Schedule and start the cron job
cron.schedule('0 0 * * *', updatePriorities);     // Schedule at midnight every day

