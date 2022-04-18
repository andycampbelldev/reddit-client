# Reddit Client

This project is being completed as part of the Codecademy Frontend Engineer Career Path. Core requirements are as follows:

- Build the application using React and Redux
- Users can see an initial view of the data when first visiting the app
- Users can search using terms
- Users can filter data based on categories that are predefined
- Users are shown a detailed view (modal or new page/route) when they select an item
- Users are delighted with a cohesive design, animations and transitions
- Users are able to leave error states
- Write unit tests for components using Jest and Enzyme (or another suitable React component testing library)
- Write end-to-end tests
- Application is responsive
- Application gets 90+ scores on Lighthouse (allowing for lower scores for Performance related to assets served from Reddit)
- Application is deployed using GitHub pages or Netlify
- Optional - set up a CI/CD workflow to automatically deploy your application when the master branch is updated
- Optional - make the application a Progressive Web App

## Wireframes

Per the wireframes below I've opted for a grid layout to display the content returned from Reddit. Each post will be shown as a card, with the image from the post used as a background for the card. The image will be darkened with pseudo element and gradient, and the post title displayed over the top of the image. This is intended to offer a richer visual experience by showing a variety of content without the need to scroll.

The title of each post will be a clickable link that opens the full post and comments in a modal.

This type of grid layout will also lend itself to a consistent look and feel across devices as we can simply reduce the number of columns in each row as the size of the screen decreases.

<img width="1005" alt="image" src="https://user-images.githubusercontent.com/42552076/163736548-6cce415a-9317-413f-b9d2-a1a6e2127219.png">

## Tech

Per the requirements, this application will be built with React and Redux. React Router will also be implemented to handle client-side routing for available subreddits, and when browsing to specific posts.

Reactstrap will be used to provide basic styling and components.

## Features

- Users can see an initial view of the data when first visiting the app
- Users can search using terms
- Users can filter data based on categories that are predefined
- Users are shown a detailed view (modal or new page/route) when they select an item
- Users are delighted with a cohesive design, animations and transitions


## Future Work

- Optional - set up a CI/CD workflow to automatically deploy your application when the master branch is updated
- Optional - make the application a Progressive Web App
