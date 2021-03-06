## Description

This is the backend application for patients and doctors involved in a process of booking an appointment. Patients are able to register themselves and login with valid credentials. Patients can book appointment on a working day except Monday and Thursday. Patient will get a reminder day before scheduled appointment. Both patient and doctor need to login and confirm an appointment as a prerequisite to mark the appointment as ‘Done’. Appointment can have following states: Scheduled, Rescheduled, Missed, Canceled and Done.

## Installation

### Prerequisites

- [Node](https://nodejs.org/en/download/)

- [Mongo](https://www.mongodb.com/try/download)

## Instructions for starting application

Instructions for starting an application:

1. clone repository with “git clone https://github.com/abircic/PatientApp.git"
2. open terminal and run “npm install”
3. create `.env` file with configuration

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
	"firstName": "testName",
	"lastName": "lastName",
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

\*\*In case of error API returns response containing status code and message:

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

### GET http://localhost:3000/user/fetchDoctors

Used for fetching doctors

**Response**

```
{

	"success":  true,
	"message":	"success",
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

### POST http://localhost:3000/appointment/create

**Request**

```
{
    "doctorId":"6241b1a4165a23dce6f1d386",
    "patientId":"6241b1bb165a23dce6f1d388",
    "fromDate":"2022-04-06T17:30:05.511Z"
}
```

**Response**

```
{
    "success": true,
    "message": "success",
		"appointmentId:"6241b1a4165a23dce6f1d386"
}
```

**Example error response**
status code: 400
**Response**

```
{
    "success": false,
    "message": "invalid_day_of_week"
}
```

**Response**

```
{
	"success":"false"
	"message":"invalid_password"
}
```

**Response**

```
{
    "success": false,
    "message": "appointment_can_not_be_today"
}
```

**Response**

```
{
    "success": false,
    "message": "invalid_doctor_id"
}
```

### PUT http://localhost:3000/appointment/update

**Request**

```
{
    "id":"62441da4c5acba2afa443bb1",
    "fromDate":"2022-04-06T20:30:05.511Z",
    "status":"done"
}
```

**Response**

```
{
    "success": true,
    "message": "success",
		"appointment:" "id"
}
```

**Example error response**
status code: 400
**Response**

```
{
    "success": false,
    "message": "doctor_already_has_an_appointment_at_this_time"
}
```

**Response**

```
{
    "success": false,
    "message": "invalid_day_of_week"
}
```

**Response**

```
{
    "success": false,
    "message": "invalid_status"
}
```

### GET http://localhost:3000/appointment/fetch?id=6268f857f9c08e74b301d7d5&type=2

**Response**

```
{
    "success": true,
    "appointments": [
        {
            "fromDate": "2022-04-28T08:00:00.000Z",
            "toDate": "2022-04-28T08:30:00.000Z",
            "firstName": "Ivan",
            "lastName": "Ivic",
            "status": "done",
            "id": "6268f8c7f9c08e74b301d856"
        },
        {
            "fromDate": "2022-04-29T09:00:00.000Z",
            "toDate": "2022-04-29T09:30:00.000Z",
            "firstName": "Filip",
            "lastName": "Filipic",
            "status": "missed",
            "id": "6268f931f9c08e74b301d8e2"
        }
    ]
}
```
