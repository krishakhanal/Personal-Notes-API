Task API
Description
The Task API is a simple RESTful API designed to manage tasks. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks. Each task has an ID, a name, a description, and a status. The API is built with Node.js and Express and uses a JSON file for data storage.

Features
Create Tasks: Add new tasks to the system.
Retrieve Tasks: Get a list of all tasks or filter tasks by status.
Update Tasks: Modify existing tasks by updating their details.
Partially Update Tasks: Update the status of a task without changing other details.
Delete Tasks: Remove tasks from the system.
Installation
To get started with the Task API, follow these steps:

Prerequisites
Node.js (v14 or higher)

Running the Server
Start the Server:


npm start
The server will run on http://localhost:3002.



1. GET /tasks
Open Postman.
Set the request type to GET.
Enter the URL: http://localhost:3002/tasks
Click Send.
Review the response in the Body tab.
2. POST /tasks
Set the request type to POST.
Enter the URL: http://localhost:3002/tasks
Go to the Body tab and select raw.
Choose JSON from the dropdown menu.
Enter the JSON data:

{
  "name": "Complete project documentation",
  "description": "Finish writing the documentation for the API project",
  "status": "pending"
}
Click Send.
Check the response for the new task details.
3. PUT /tasks/
Set the request type to PUT.
Enter the URL: http://localhost:3002/tasks/1 (replace 1 with the task ID you want to update)
Go to the Body tab and select raw.
Choose JSON from the dropdown menu.
Enter the JSON data:

{
  "name": "Updated Task Name",
  "description": "Updated description",
  "status": "completed"
}
Click Send.
Verify the response to ensure the task was updated.
4. PATCH /tasks/
Set the request type to PATCH.
Enter the URL: http://localhost:3002/tasks/1 (replace 1 with the task ID you want to update)
Go to the Body tab and select raw.
Choose JSON from the dropdown menu.
Enter the JSON data:

{
  "status": "in-progress"
}
Click Send.
Review the response to confirm the status was updated.
5. DELETE /tasks/
Set the request type to DELETE.
Enter the URL: http://localhost:3002/tasks/1 (replace 1 with the task ID you want to delete)
Click Send.
Check the response to ensure the task was deleted.

Error Handling
400 Bad Request: Invalid request data.
404 Not Found: Resource not found.
500 Internal Server Error: Server or data issues.

