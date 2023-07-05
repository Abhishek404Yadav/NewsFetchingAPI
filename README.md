# News Fetching API with User Authentication and Preferences

This is a RESTful API that allows users to register, login, and fetch news articles based on their preferences. It incorporates external news APIs to fetch news articles from multiple sources and uses async/await and Promises for fetching and filtering news data. The API implements proper error handling, authentication, authorization, and input validation.

## Endpoints

- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in a user.
- `GET /api/preferences`: Retrieve the news preferences for the logged-in user.
- `PUT /api/preferences`: Update the news preferences for the logged-in user.
- `GET /api/news`: Fetch news articles based on the logged-in user's preferences.

## Error Handling

The API provides appropriate HTTP status codes and error messages for invalid requests, authentication errors, and authorization errors.

## Input Validation

The API performs input validation for user registration and news preference updates, ensuring the validity of the data being submitted.

## Testing

To test the API:

1. Start the API server.
2. Use Postman, Curl, or any HTTP client to send requests to the API endpoints.
3. Register a new user using the `/api/register` endpoint.
4. Log in the user using the `/api/login` endpoint to obtain a bearer token.
5. Set the bearer token in the Authorization header for subsequent requests.
6. Use the `/api/preferences` endpoint to retrieve and update news preferences for the user.
7. Use the `/api/news` endpoint to fetch news articles based on the user's preferences.
8. Verify the responses and ensure the API functions as expected.

## Conclusion

This API provides user authentication, news preferences, and news fetching functionalities. It allows users to register, log in, and retrieve news articles based on their preferences. Proper error handling, input validation, and testing ensure a robust and reliable API experience. Feel free to customize and enhance the API to suit your specific requirements.
