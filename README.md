# Overview
As part of your daily tasks at Financial Cents, you will create features that require the following skills:
1. Being proficient in designing DB schemas and queries
2. Implementing reliable software architecture principles including testability, scalability, fault tolerance and high performance 
3. Building with cybersecurity as a top priority
4. Building maintainable code with low complexity

This challenge is designed to resemble a realistic task where these skills are tested. 
Please read the instructions carefully and reach out to us with any questions. There is no
time limit on completing the challenge and there are no restrictions on which resources you can use.

# Your Task

## Scenario
Our customers are asking us to build an invoice listing page that shows all the invoices they sent to their clients.
The main reason they want this is that their current billing platform does not offer an easy way to get all
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
for importing the invoices and provide internal API endpoints to list and view an invoice.

## Considerations

### Authorization
- Only authenticated users can access the listing page.
- Each user can only access invoices that belong to their account.

### Database
- Create a MySQL database for this task.
- You will need tables for clients and invoices.
- Optimize tables by adding indexes to support filtering by owner, client name, invoice status and invoice due date. 

### Internal API Endpoints
Our front end engineers need an endpoint to retrieve invoices:

**Listing Invoices**
Lists invoices sorted by due_date in descending order
```
GET /api/invoices
Accepts the following filtering parameters:
- client_name: string (optional).
- status: string (optional). one of pending, paid, past due or void (optional)
- due_date: string (optional). Formatted as Y-m-d
- order_by: string (optional. Default: due_date). One of client_name, status or due_date.
- order_dir: string (optional. Default: desc). One of asc or desc.
```

### Commands
Create a command to initiate pulling data from the billing API for all users. The command should simply iterate over
the users table and dispatch a job for each user. The job is responsible for pulling invoices from the billing API.
