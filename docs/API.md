# Accessing Endpoints to send and view Data: Using FastAPI and PostgresSQL

## Authentication: 

| Action | Method | URL
| ----------- | ----------- | ----------- |
| /Protected | GET | http://localhost:8000/protected/
| Get Token | GET | http://localhost:8000/token/ |
| Create Veteran Account | POST | http://localhost:8000/api/accounts/veterans/
| List Accounts | GET | http://localhost:8000/api/accounts/
| Create Partner Account | POST | http://localhost:8000/api/accounts/partners/

Account types:

```json
AccountType 'string'
title: AccountType
An enumeration.

Enum:
[ veteran, partner, approved_partner ]
```
This identify the user and what account type they have which determine what they have access to on our webpage.

**Veteran account input:**
```json
VetAccountIn{
account_type*	AccountType[...]
username*	Username[...]
password*	Password[...]
email*	Email[...]
first_name*	First Name[...]
last_name*	Last Name[...]
 
}
```
* No account can have same username or email

When a veteran create an account this is how fastapi and postgresSQL save their input.

**Partner Account input:**
```json
PartnerAccountIn{
account_type*	AccountType[...]
username*	Username[...]
password*	Password[...]
email*	Email[...]
first_name*	First Name[...]
last_name*	Last Name[...]
company_name*	Company Name[...]
city*	City[...]
state*	State[...]
country*	Country[...]
 
}
```
* No account can have same username or email 

This is the required information for out partners and once we vet and confirm the partners they will be labeled as an approved_partner.

**Token:**

```json
Token{
description:	
Represents a bearer token.

access_token*	string
title: Access Token
token_type	string
title: Token Type
default: Bearer
 
}
```
This is token we use to authenticate and protect our users and determine who can view what.


## Login/Logout

| Action | Method | URL
| ----------- | ----------- | ----------- |
|Login| POST | http://localhost:8000/token/
| Logout | DELETE | http://localhost:8000/token/ |


**Login:**

```json
Body_login_token_post{
grant_type	Grant Type[...]
username*	Username[...]
password*	Password[...]
scope	Scope[...]
client_id	Client Id[...]
client_secret	Client Secret[...]
 
}

AccountToken{
description:	
Represents a bearer token.

access_token*	string
title: Access Token
token_type	string
title: Token Type
default: Bearer
account*	AccountOut{...}
 
}
```
When a user login they receive a token to validate the log in and it gets deleted once they log out and receive a new one with every new login.

## ActivitiesForm

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Activities | GET | http://localhost:8000/api/activities/
| Create an Activity | POST | http://localhost:8000/api/activities/ |
| Update an Activity | PUT | http://localhost:8000/api/activities/id/
| Delete an Activity | DELETE | http://localhost:8000/api/activities/{activity_id}/


## Categories

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Categories | GET | http://localhost:8000/api/categories/


**Input:**
```json
ActivitiesIn{
name*	string
title: Name
description	string
title: Description
start_date*	string($date)
title: Start Date
end_date*	string($date)
title: End Date
location*	string
title: Location
category*	integer
title: Category
 
}
```
 **Output:**
 ```json
ActivitiesOut{
id*	integer
title: Id
name*	string
title: Name
description	string
title: Description
start_date*	string($date)
title: Start Date
end_date*	string($date)
title: End Date
location*	string
title: Location
category*	integer
title: Category
 
}
```
**Categories:**
```json
CategoryOut{
id*	Id[...]
name*	Name[...]
 
}
```
Creating a new activity saves the id, name, description, start_date, end_date, location and gives you a list of four options from the categories table to choose from which would be hunting, fishing, water sports or job fair. 

## Resources

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Resources | GET | http://localhost:8000/api/resources/
| Create an Resource | POST | http://localhost:8100/api/resources/ |
| Delete an Resource | DELETE | http://localhost:8000/api/resources/id/

**Input:**
```json
ResourcesIn{
url*	string
title: Url
 
}

ResourcesOut{
url*	string
title: Url
id*	integer
title: Id
 
}
```
when look at the resource tab the only thing needed will be the link to the actual page and not a link to another link we vet all links there and ensure when one is added to be an actual link to something useful and not a trail of links.

## Events

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Events | GET | http://localhost:8000/api/events/ 
| Create a Event | POST | http://localhost:8000/api/events/ |
| Update a Event | PUT | http://localhost:8100/api/events/id/
| Delete a Event | DELETE | http://localhost:8100/api/events/id/

**Input:**
```json
EventsIn{
event_title*	Event Title[...]
start_date*	Start Date[...]
end_date*	End Date[...]
description	Description[...]
street_address*	Street Address[...]
city*	City[...]
state*	State[...]
 
}
```
**Output:**
```json
EventsOut{
id*	Id[...]
event_title*	Event Title[...]
start_date*	Start Date[...]
end_date*	End Date[...]
description	Description[...]
street_address*	Street Address[...]
city*	City[...]
state*	State[...]
 
}
```
when a user login they can see the available events with the map API description on clicking a certain event. but in order for one to add an event they have to be an approved_partner which will display a button the user can acquire through requesting and the team proving they are legit and here for the right reasons.

## Message Board

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List All Messages | GET | http://localhost:8000/api/messages/
| Create a Message | POST | http://localhost:8100/api/messages/ |
| Get a Message | GET | http://localhost:8000/api/messages/id/
| Update a Message | PUT | http://localhost:8000/api/messages/id/
| Delete a Message | DELETE | http://localhost:8000/api/messages/id/
| Read a Message | PUT | http://localhost:8000/api/messages/{message_id}/add-view/
| Get a Response Message | GET | http://localhost:8000/api/messages/{message_id}/responses/
| Add a Response Message | POST | http://localhost:8000/api/messages/{message_id}/responses/


**Input:**
```json
MessagesIn{
account*	Account[...]
title*	Title[...]
body*	Body[...]
date*	Date[...]
 
}
```
**Output:**
```json
MessagesOut{
account*	Account[...]
id*	Id[...]
title*	Title[...]
body*	Body[...]
date*	Date[...]
views*	Views[...]
response_count*	Response Count[...]
 
}
```

**View:**
```json
MessageWithResponsesOut{
account*	Account[...]
id*	Id[...]
title*	Title[...]
body*	Body[...]
date*	Date[...]
views*	Views[...]
response_count*	Response Count[...]
responses*	Responses[...]
 
}
```
Messages is actually one of the more complicated ones, if give the enduser the ability to view the messages without being logged in but once they are logged in they can actually create their own message and reply to others. If the user do click on the message the view count automatically goes up by one and if they reply so does the reply and if the creator of the message wants to change the original message they have the ability to do so.

## Jobs

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Jobs | GET | http://localhost:8000/api/jobs/
| Create a Job | POST | http://localhost:8000/api/jobs/ |
| Get a Job | GET | http://localhost:8000/api/jobs/id/
| Update a Job | PUT | http://localhost:8000/api/jobs/id/
| Delete a Job | DELETE | http://localhost:8000/api/jobs/id/

**Input:**
```json
JobsIn{
position*	Position[...]
company_name*	Company Name[...]
description*	Description[...]
requirements*	Requirements[...]
qualifications*	Qualifications[...]
pref_qualifications*	Pref Qualifications[...]
location*	Location[...]
apply_url*	Apply Url[...]
 
}
```
**Output:**
```json
JobsOut{
id*	Id[...]
position*	Position[...]
company_name*	Company Name[...]
description*	Description[...]
requirements*	Requirements[...]
qualifications*	Qualifications[...]
pref_qualifications*	Pref Qualifications[...]
location*	Location[...]
apply_url*	Apply Url[...]
 
}
```
Jobs feature is implement with the intentions of trying to help veterans earn living from reliable sources and not just a company looking for tax cuts only approved_partners can post jobs and if they do post a job they are required to input a url so the veteran can apply straight from our site not chase the rainbow.

