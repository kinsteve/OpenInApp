import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';
import User from '../models/user.model.js';
import Task from '../models/task.model.js';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

let currentCallStatus;

export const handleCallStatus = (status, sid) => {
  // Handle the call status here
  console.log(`Received call status for CallSid ${sid}: ${status}`);
  currentCallStatus = status;
};

const makeVoiceCall = async () => {
  try {
    const tasks = await Task.find({ due_date: { $lt: new Date() } }); // Fetch tasks that have crossed their due date
    let callAnswered = false; // Variable to keep track if call is answered or not

    for (const task of tasks) {
      if (!callAnswered) {
        const users = await User.find({ task_id: task._id }).sort({ priority: 1 }); // Fetch users sorted by priority in ascending order

        for (const user of users) {
          if (!callAnswered) {
            const call = await client.calls.create({
              method: 'GET',
              statusCallback: 'https://4912-2409-40d2-1017-8281-618b-1c40-3636-c958.ngrok-free.app/webhook',
              statusCallbackEvent: ['completed'],
              statusCallbackMethod: 'POST',
              url: 'http://demo.twilio.com/docs/voice.xml',
              to: user.phone_number,
              from: process.env.TWILIO_PHONE_NUMBER
            });

            console.log(`Calling user ${user.name} with priority ${user.priority}`);
            console.log(call.sid);

            // Wait for a few seconds to check if the call is answered
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Check if the call was answered
            if (currentCallStatus === 'completed') {
              console.log(`Call to user with phoneNumber ${user.phone_number} answered.`);
              callAnswered = true;
            }
            else{
                console.log(`Call to user with phoneNumber ${user.phone_number} didn't answer.`);
            }
          }
        }
      }
    }

    if (!callAnswered) {
      console.log('No user answered the call.');
    }
  } catch (err) {
    console.error(err);
  }
};

// Cron job that runs every day at 9am
const cron = require('node-cron');
cron.schedule('0 9 * * *', () => {
  console.log('Running cron job...');
  makeVoiceCall();
});
