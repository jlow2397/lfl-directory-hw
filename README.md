# LFL Employee Directory code challenge

For this assignment you will be building an online employee directory, using only vanilla JS (**no jQuery**).

Please fork this repository for your work, you should spend no more than 4-6h on this, please make sure to document your process in the `Dev Notes` section of this `README`

Feel free to reach out to with any questions or for clarification.

## Setup
- No dependencies needed
- Task runners are okay
- `SASS/SCSS` is okay, your choice
- `dom.js` contains some helper functions

## Requirements
#### Sidebar / main content layout is honored per screenshots

#### A `View` option that displays all employees & their info

![view](images/print.png)

#### An `Add` option that allows users to input a name, an office number, and a phone number

![add](images/add.png)

#### A `Verify` option that allows users to input a name and returns a success/error state to the UI

![verify](images/verify.png)

#### An `Update` option that allows the user to input name, office number, and phone number -- updating only the office number and phone number upon a name match

#### A `Delete` option that deletes the employee with the matching name

## Bonus
- Style all/any of the aforementioned interactions however you see fit, this is an opportunity to show off your creativity!
- MVC JS architecture

## Dev notes
- first, I created the HTML elements in app.js using for loops for the sake of legible code
- then I created the forms that corresponded to each of the buttons on the Navigation bar
- I noticed that Add/Update had 3 form fields while Verify/Delete had 1 form field, so I grouped them according to that
- I then handled the logic of the functions, starting with Add Employee & Verify Employee
- Next I connected the logic of the functions to the event handler within the form input
- I implemented a MVC logic that utilizes app.js to update the Model first then updating the DOM View after
- I then styled the components to fit a dark-mode aesthetic with LFL branding & color accents
