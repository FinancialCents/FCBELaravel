# Third-Party Billing API

The billing API provides a single endpoint to access invoices given a user ID.

Base URL: `https://mock-billing-api.financial-cents.com`

**List Invoices**
```shell
GET /api/v1/users/{user_id}/invoices

Parameters: 
 - {user_id}: integer. See below for more info on how to obtain a user ID.
Query: none
Response: JSON. Paginated list of invoices in the following format:
{
  current_page: integer,
  next_page_url: ?string,
  prev_page_url: ?string,
  path: string,
  per_page: integer,
  to: integer,
  total: integer,
  data: Array<Invoice>
}

Invoice: {
  id: integer,
  user: UserObject,
  client_name: string,
  due_date: string,
  status: string,
  amount: integer
}

UserObject: {
  id: integer,
  name: string,
  email: string
}
```
Note: `amount` is in cents so 100 = $1 USD.

Note: `client_name, user_id` are a unique combination.

## Authentication
For the purposes of this test, we will not be using any type of authentication.

## Where do User IDs come from?
The user id is any integer provided by your application. Since this is a mock API, it will generate invoices for any
user id you provide. The only stipulation is that this ID should be an integer.

## Error Codes
The mock API could return the following errors:

| HTTP Status Code | Description                                                                          |
|------------------|--------------------------------------------------------------------------------------|
| 500              | Server Error. Try again later.                                                       |
| 503              | Service Unavailable. Try again later.                                                |
| 429              | Too many requests. Use Retry-After in the response header to know how long to wait.  |
| 422              | Validation error.                                                                    |
| 400              | Bad Request. Inspect response message for info.                                      |

## Rate Limiting
This API allows up to 60 requests per minute. When rate limit is reached, a 429 HTTP status will be returned along
with a Retry-After header that contains the number of seconds to wait before re-attempting the request.
