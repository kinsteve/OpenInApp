
Task Manager API
================

This project is a Task Manager API that allows users to manage their tasks and subtasks. It includes features such as creating tasks, creating subtasks, updating task and subtask details, deleting tasks and subtasks, and more. The API also includes cron jobs for automating certain tasks like changing task priorities based on due dates and making voice calls using Twilio for overdue tasks.

Features
--------

1.  Create Task: Allows users to create a new task with a title, description, and due date. Requires JWT authentication.

2.  Create Subtask: Allows users to create a subtask for a specific task.

3.  Get All User Tasks: Retrieves all tasks for a user, with options to filter by priority, due date, and pagination.

4.  Get All User Subtasks: Retrieves all subtasks for a user, with an optional filter by task ID.

5.  Update Task: Allows users to update task details such as due date and status (`TODO` or `DONE`).

6.  Update Subtask: Allows users to update the status of a subtask (`0` for incomplete or `1` for complete).

7.  Delete Task: Soft deletes a task, marking it as deleted without permanently removing it from the database.

8.  Delete Subtask: Soft deletes a subtask, marking it as deleted without permanently removing it from the database.

Cron Jobs
---------

1.  Priority Adjustment: Automatically adjusts the priority of tasks based on their due dates.

2.  Voice Calling: Uses Twilio to make voice calls for overdue tasks. Calls are made based on the priority of the user, with higher priority users called first. Calls are only made if the previous user does not answer.

Instructions
------------

-   Ensure proper validation is implemented for input and user authentication for API calls.
-   Implement error handling for user-friendly error messages.
-   Use [jwt.io](https://jwt.io/) for creating JWT tokens with user ID and implement corresponding decoding logic.
-   Update corresponding subtasks when tasks are updated or deleted.
-   Use Postman to demonstrate all APIs.

Technologies Used
-----------------

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   Twilio (for voice calling)
-   Ngrok (for webhook testing)

Getting Started
---------------

1.  Clone the repository: `git clone https://github.com/your-repo.git`
2.  Install dependencies: `npm install`
3.  Set up environment variables in a `.env` file.
4.  Start the server: `npm start`
5.  Use Postman or similar tools to interact with the API.

API Reference
-------------
Refer my Postman Published API
https://documenter.getpostman.com/view/19766208/2sA2rB12vK

Contributors
------------

-   Krishnay Mudgal🧑‍💻

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.
