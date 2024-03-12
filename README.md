# HackersNews App

## Description

This is a web application for rendering and displaying news articles from the Hacker News API with pagination controls.

## Setup

1. Ensure that Node.js and npm are installed on your machine.
2. Run `npm install` to install the project dependencies.

## Scripts

- `npm run dev`: Start the development server using Vite.
- `npm run build`: Build the project for production using TypeScript and Vite.
- `npm run preview`: Preview the production build using Vite's preview server.

## Dependencies

- `axios`: Promise-based HTTP client for making API requests.
- `bootstrap`: Front-end framework for building responsive web pages.
- `sass`: CSS extension language for styling the application.
- `typescript`: Programming language that adds static type-checking to JavaScript.

## Feature Highlights

- Real-time news article rendering from the Hacker News API.
- Search functionality to filter news articles by keywords.
- Pagination controls for navigating through news articles.
- Date and time formatting for article timestamps.

## API Reference

The application fetches news articles from the Hacker News API. The API is accessed at `http://hn.algolia.com/api/v1/search?query=...`. No API keys are required, and there are no rate limits specified.

## Running the Application Locally

To compile SCSS to CSS and transpile TypeScript to JavaScript, run the following commands:

```bash
npm run compile:scss # Compiles SCSS files to CSS
npm run transpile:ts # Transpiles TypeScript files to JavaScript
```

## Error Handling

The application handles errors gracefully, displaying user-friendly error messages in case of network issues or data fetch failures. Axios errors are specifically caught and handled to ensure the application remains responsive.
