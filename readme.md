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
