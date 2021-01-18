# Cluby Assignment


## Stack:

- React
- Typescript
- Redux
- Redux-Saga
- React-Form-FP
- React Testing Library

## Implementation

### Overall

**React** application written in **Typescript**, which is introduced to the app to avoid having PropTypes of Flow, as it is pretty hard to maintain and not really that safe, **Typescript** also adds implicit documentation of code since it makes JSDoc obsolete. Of course, all of these are just bonuses to static type checking that will prevent run time exceptions which is probably javascript biggest flaw.
For more documentation please refer to (https://reactjs.org/)


### State

**Redux** is used for state management, as it is the most broadly accepted state management mechanism in the **React** community. The pure nature of the redux makes it easy to test, therefore core app logic can be 100% covered with unit tests. Also, with one-directional data flow we avoid a bunch of unwanted mutations and prevent sneaky bugs that can occur by changing the global state from the non-centralized controller.
For more documentation please refer to (https://redux.js.org/)


### Async

**Redux-Saga middleware** is used for the async layer. By extracting async logic outside of the component and state layers we are abstracting API itself from UI logic, in this case, the component layer (UI) is not aware of the asynchronies actions, the components just consume the state and dispatch the actions, actions are then intercepted by sagas that are in charge of sending/getting data from the API and putting the results down to **Redux** which than provides that data to the components. One more thing that this approach provides is data transformation before it's reduced to the state, which will eliminate expensive data calculations in the UI layer, therefore the rendering flow is focused on user interaction and not on preparing data.
For more documentation please refer to (https://redux-saga.js.org/)


### Tests

Unit Testing is achieved through **Jest**. The business logic layers must have high coverage, but as an addition to this we also have a user interaction testing with **React Testing Library**, which allows user events simulations (clicks, hovers, filter changes, etc).
For more documentation please refer to (https://testing-library.com/docs/react-testing-library/intro)


### UI Helper Library

As UI helper library of choice is Ant Design. For more docs please refer to (https://ant.design/)


## Development

Before running the project you need to set appropriate environment variables which are listed in .env.example

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn mock-server`

Launches mock server on http://localhost:8100/ and provides fake API which can be used for end-to-end testing (not implemented yet) and also local development without connecting to the real API.
In order to connect the app to it set appropriate environment variable to `REACT_APP_API_URL=http://localhost:8100`.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
