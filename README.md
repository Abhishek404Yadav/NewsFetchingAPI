# News Fetching API with User Authentication and Preferences

This is a RESTful API that allows users to register, login, and fetch news articles based on their preferences. It incorporates external news APIs to fetch news articles from multiple sources and uses async/await and Promises for fetching and filtering news data. The API implements proper error handling, authentication, authorization, input validation, and includes test cases using Joi for validation.

## Endpoints

- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in a user.
- `GET /api/preferences`: Retrieve the news preferences for the logged-in user.
- `PUT /api/preferences`: Update the news preferences for the logged-in user.
- `GET /api/news`: Fetch news articles based on the logged-in user's preferences.

## Error Handling

The API provides appropriate HTTP status codes and error messages for invalid requests, authentication errors, authorization errors, and input validation errors using Joi.

## Input Validation

The API performs input validation and sanitization using Joi for user registration, login, and news preference updates. It ensures the validity of the data being submitted and sanitizes input to prevent security vulnerabilities.

## Testing

The API includes test cases using Joi to validate the request payloads and expected responses. The test cases cover the user registration, login, preferences retrieval, preferences update, and news fetching functionalities. The test cases ensure that the API functions as expected and provide a reliable testing suite for future development.

To run the test cases:

1. Ensure the API server is running.
2. Run the test suite, which executes the test cases and validates the API responses.

## Usage

1. Start the API server.
2. Use Postman, Curl, or any HTTP client to send requests to the API endpoints.
3. Register a new user using the `/api/register` endpoint.
4. Log in the user using the `/api/login` endpoint to obtain a bearer token.
5. Set the bearer token in the Authorization header for subsequent requests.
6. Use the `/api/preferences` endpoint to retrieve and update news preferences for the user.
7. Use the `/api/news` endpoint to fetch news articles based on the user's preferences.
8. Verify the responses and ensure the API functions as expected.

## Conclusion

This API provides user authentication, news preferences, and news fetching functionalities. It incorporates input validation and sanitization using Joi, ensuring the validity and security of user input. Test cases using Joi provide comprehensive coverage and validation of the API's functionalities. Feel free to customize, enhance, and extend the API based on your specific requirements.