# Locello, a Local only Trello Board

This is a simple clone of the Trello board that runs locally.

## Tech Stack

The application is React based and [Vite](https://vitejs.dev/) with TypeScript and monorepo setup used for tooling.
There is no third-party scripts used including any utilities or React components.

## Installation and Running the App

The app doesn't use any fancy application setup. Installing the _npm dependencies_ and starting the _dev server_ is
enough for running the application locally.

```shell
# install the dependencies
npm install

# start the dev server
npm run dev
```

**Note**
Since application is using the _LocalStorage_ for database, on the first run, and until you clear the localStorage, there will be no lists or cards available.

## Devil in Details
For the seek of simplicity, application uses localStorage and Context API for state management. To keep the state simple, the _BoardStore_ has couple of items, 
* `activeBoard` as the ID of the current board that you are viewing. 
* `config` object that has the _db_ functions
* `board` object that has the list of the _lists_ and _cards_. `lists` and `cards` only contains the _uuid_ of the respective items. This was a decision by the design to avoid a hugh store object and easing the filtering, adding items. 
* `changedList` as the ID of the affected column after drag&drop operation. Since the store is very simple and not have complex data model, it was easy to update the list which a card is dropped, however updating the list that the card is dragged from needed an additional trigger. The _ID_ provides the trigger for updating the list.

All the content of lists and cards are fetched from _Storage_ at the render time and cached in the local state of their respective component. In real application, this could slow down the application load, where it would be preferred to get the card content for a respective list at once, ideally cached on the CDN, depending on the load with couple of seconds or more.

Security part of the application is omitted. Since the _Storage_ can be modified through browser's console, all the application data is vulnerable by default.

The drag&drop functionality built as business specific in this code challenge. In a real application, it is preferred to have a reusable component with proper action triggers.

For the data persistence, application supports both _LocalStorage_ and _SessionStorage_. It can be defined with `db` prop on `BoardStore` provider. This is one of the reason that application state is containing a _db_ function in its `config`. In real production environment, probably you would not need a _db_ function in the state and do the database actions via backend services.

[T_T] there are no unit tests in this work. In real application, there should be enough unit tests that engineers can confidently update components or change functionality.
