---

#PLAN

##Model

###Event Table

- name
- date
- time
- location
- description
- max_guest
- guest_count
- username

###API Breakdown

- [POST] add event (auth)
- [GET] get event by id
- [PUT] edit event (auth)
- [DELETE] delete event (auth)
- [GET] get user events(auth)
- [GET] get events (public)
- [PUT] increase event count (auth)

###Task for tomorrow

- Persit username to localstorage
- Create react context to store username (from localstorage) and display to some pages especally dashboard, event form page
- Guard login page
- Persist or save user rsvp'd to localstorage
- Implement Rest API
