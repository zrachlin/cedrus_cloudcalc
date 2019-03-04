To Run:

- Required: NPM
- git clone https://github.com/zrachlin/cedrus_cloudcalc
- run npm install
- run npm run start:dev

Ideas:

- calculation model:
  - id
  - label
  - input with other labels
  - raw input
  - optional (userId) -> start off with single user, so don't implement this
- input format:
  - text field that allows anything -> have to do error handling -> just try to evaluate the expression and return an error if it is incorrect
    vs
  - prescribed inputs and selectors (dropdown for +-/\*) -> simpler, but harder to deal with 'at least two' numbers -> how do we handle if the user wants to create a complicated expression

-handle hover -> show label when user hovers over the expression in the input

-adding past expressions to new expression:
-when user clicks on past expression, all of its info needs to be available to the new expression
-can this be done without redux?
-user clicks old expression -> handleclick triggers a change of state for 'selectedExpression' -> selectedExpression gets passed as props to the newExpression component -> in component did update of newExpression, look for change in selectedExpression -> if it changes, add it to the local state at the end of the current expression (or maybe where the cursor is in the text field)

- look up how to find where cursor is in text field
