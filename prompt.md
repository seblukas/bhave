I want to create a typescript backend which runs an express server.

- The code should be written in typescript
- For local development the backend should hot-reload
- The express app should be very simple and have on get endpoint called habits, which returns all habits
- The express app should have a post endpoint to create a new habit
- Habits for now should be saved in a local json file
- when creating the backend separate the concerns (init express app, router, controller for endpioints, service layer, and data layer)
- A habit in the system should have
    - a title, a description, an array of dates when the habit should be tracked, a start date, an update time stamp, an id, and a slug
- Separate your code in classes
- Every class should have a unit test file next to it.