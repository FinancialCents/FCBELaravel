# Third-Party Billing API

The billing API provides a single endpoint to access invoices given a user ID.

Base URL: `mock-billing-api.financial-cents.com`

**List Invoices**
```shell
GET /api/v1/user/{user_id}/invoices

Parameters: {user_id}: integer, should match the user_id in the users table on your local database.
Query: none
Response: JSON. Paginated list of invoices in the following format:
{
  current_page: integer,
  next_page_url: ?string,
  previous_page_url: ?string,
  data: Array<{user_id: integer, client_name: string, due_date: Date, status: string, amount: integer}>
}
```
Note: amount is in cents so 100 = $1 USD.

### Authentication
For the purposes of this test, we will not be using any type of authentication.


