# Overview
As part of your daily tasks at Financial Cents, you will create features that require the following skills:
1. Being proficient in designing DB schemas and queries
2. Implementing reliable software architecture principles including testability, scalability, fault tolerance and high performance 
3. Building with cybersecurity as a top priority
4. Building maintainable code with low complexity

This challenge is designed to resemble a realistic task where these skills are tested. 
Please read the instructions carefully and reach out to us with any questions. There is no
time limit on completing the challenge and there are no restrictions on which resources you can use.

# The Challenge

## Getting Started
This repo hosts a Laravel 10 application. Feel free to clone this repo locally or start a new Laravel project.
This is where you'll implement the requirements listed below. You are expected to push the full application to
a Github repo when ready to submit.

## Scenario
Our customers are asking us to build an invoice listing page that shows all the invoices they sent to their clients.
The main reason they want this is that their current billing platform does not offer an easy way to search
invoices across their client base nor does it allow them to filter the list to find unpaid or pending invoices.
They end up having to download each client's list of invoices and combine them in an Excel sheet to run their reports. 

The data for these invoices reside in their billing software, which provides a simple API that includes listing
invoices in chronological order. However, their API does not allow for any type of filtering or sorting. Their
API is also known to have intermittent networking issues that normally last a few minutes. Their API documentation
and other information can be found in [docs/billing_api](docs/billing_api.md).

## Task
You are tasked with creating a solution to pull invoices from the third-party API and storing them in a local database.
In addition, our frontend team needs an internal API to list, sort and filter invoices for the authenticated user. Users
should be able to filter by client name, due date and invoice status (paid, pending, past due, void). 

It is not your responsibility to create the frontend for this task. You are only expected to write the code
for importing the invoices from the billing software and provide an internal API endpoint to list and filter invoices.

## Considerations

### Internal API Authorization
- Only authenticated users can access the listing page.
- Each user can only access invoices that belong to their account.

### Local Database
- Create a MySQL database for this task.
- You will need tables for clients and invoices.
- Optimize tables by adding indexes to support filtering. 
- Seed the database with user records but rely on the API to fill the `invoices` and `clients` tables.

### Internal API Endpoints
Our front end engineers need an endpoint to retrieve invoices from our database. Please create this endpoint along 
with any tests you deem necessary to ensure quality and reliability.

**Listing Invoices**

Lists invoices sorted by due_date in descending order by default.
```shell
GET /api/invoices

Accepts the following filtering parameters:
- client_name: string (optional).
- status: string (optional). one of pending, paid, past due or void (optional)
- due_date: string (optional). Formatted as Y-m-d
- order_by: string (optional. Default: due_date). One of client_name, status or due_date.
- order_dir: string (optional. Default: desc). One of asc or desc.

Returns a paginated JSON response of invoices along with the related client.
{
  data: Array<InvoiceObject>
  current_page: integer,
  next_page_url: ?string,
  prev_page_url: ?string,
  path: string,
  per_page: integer,
  to: integer,
  total: integer,
}

InvoiceObject: {
  id: integer,
  client: ClientObject,
  amount: integer,
  status: string,
  due_date: string,
}

ClientObject: {
  id: integer,
  name: string,
}
```

### Commands
Create a command to retrieve data from the billing API for all users. The command should simply iterate over
the users table and dispatch a job for each user. The job is responsible for pulling invoices from the billing API.

Schedule the job to automatically run every hour.

We recommend using Laravel's Http class to make calls to the third-party API as it offers an easy way
to mock and test responses. 

Please make sure that any jobs are fault-tolerant, retry requests appropriately and report failures where necessary.

### Tests
Write tests for your code that verify error handling and authorization. There is no need to unit test everything. Focus
your tests on guaranteeing that pulling data from the third-party API works and that your internal API returns appropriate
responses. For example, test that accessing `/api/invoices/` should return 401 if you are not authenticated.

You may mock third-party API responses to test your logic against it. 

# Submission
Please publish your code on a GitHub repository and share the link with abdullah@financial-cents.com. Add any
supporting documentation in the docs/ folder.

If you have any questions, please don't hesitate to reach out to us!
