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
