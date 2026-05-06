Problem 7 : Course Enrollment API
Task:
Create Course APIs using MongoDB.
Course Schema:
{
courseName: String,
trainer: String,
duration: Number,
fees: Number
}

APIs:
● POST /courses
● GET /courses
● GET /courses/:id
● PUT /courses/:id
● DELETE /courses/:id
Constraints:
● All fields required
● duration and fees must be greater than 0

● Proper validation and error handling required
Bonus:
Create API:
GET /courses/cheap

Return all courses having fees less than 5000.
