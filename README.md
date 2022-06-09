## Description
This is the backend application for patients and doctors involved in a process of booking an appointment. Patients are able to register themselves and login with valid credentials. Patients can book appointment on a working day except Monday and Thursday. Patient will get a reminder day before scheduled appointment. Both patient and doctor need to login and confirm an appointment as a prerequisite to mark the appointment as ‘Done’. Appointment can have following states: Scheduled, Rescheduled, Missed, Canceled and Done.
## Installation

### Prerequisites

- [Node](https://nodejs.org/en/download/)

- [Mongo](https://www.mongodb.com/try/download)

## Instructions for starting application
Instructions for starting an application:
1. clone repository with “git clone https://github.com/agilathon/ante_bircic.git"
2. open terminal and run “npm install”
3.  create `.env` file with configuration
 ```
PORT=3000
DB_CONNECTION_STRING=mongodb+srv://antebircic:agilathon@cluster0.i66v0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 ```
4. run “npm start”
5. download and install Postman

## API Endpoints

**Example success response**

### POST http://localhost:3000/user/register
Type field determines if user is registering as doctor or patient. “1" stand for doctor, “2” is for patient.
**Request**
```
{
	"firstName":"testName",
	"lastName"  :  "lastName",
	"type":"1",
	"username":"test@test.com",
	"password":"pass1234"
}
```
**Response**
```
{
	"success":"true"
	"message":"success"
}
```
**In case of error API returns response containing status code and message:

**Example error response**
status code: 400
```
{
	"sucess:"false,
	"message":"already_exist"
}
```
```
{
	"sucess:"false,
	"message":"invalid_username"
}
```
```
{
	"sucess:"false,
	"message":"invalid_type"
}
```
status code: 500
```
{
	"sucess:"false,
	"message":"unexpected_error_occurred"
}
```
### POST http://localhost:3000/user/login

**Request**
```
{
	"username":"test@test.com",
	"password":"pass1234"
}
```
**Response**
```
{
	"success":"true"
	"message":"success"
}
```
**Example error response**
status code: 400
**Response**
```
{
	"success":"false"
	"message":"invalid_username"
}
```
**Response**
```
{
	"success":"false"
	"message":"invalid_password"
}
```
**Example success response**

### PUT http://localhost:3000/user/updatePassword

**Request**
```
{
	"username":"test@test.com",
	"oldPassword":"pass1234",
	"newPassword":"pass1234"
}
```

**Response**
```
{
	"success":"true"
	"message":"success"
}
```
**Example error response**
status code: 400
**Response**
```
{
	"success":"false"
	"message":"invalid_username"
}
```
**Response**
```
{
	"success":"false"
	"message":"invalid_password"
}
```
### PUT http://localhost:3000/user/fetchDoctors
Used for fetching doctors 

**Response**
```
{

	"success":  true,

	"result":  [

		{

			"id":  "623d99e4bee2d1d33c059546",

			"firstName":  "testName",

			"lastName":  "lastName"

		},
		{

			"id":  "623dca52caca754edbd2ebe3",

			"firstName":  "testName",

			"lastName":  "lastName"

		},
		{

			"id":  "623dcaa06bc8967ee7316801",

			"firstName":  "testName",

			"lastName":  "lastName"

		}
	]
}
```
