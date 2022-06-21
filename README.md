# Assessment

## The application
This repository contains a frontend and a backend service. These services together serve as a ToDo List App.
Read the below documentation for details about each service.

[FrontEnd Readme](Frontend/README.md)

[Backend Readme](Backend/TodoList.Api/README.md)

## The task
> ℹ️ **The task at hand is to deploy the application inside a container or on a vm in a cloud. The application is completely self contained and should not require any additional dependencies to run.**

The end solution should deployable to an empty cloud account/subscription, such as a new AWS account. A person from ClearPoint should be able to deploy the end solution to their cloud account to verify if it works. There should not be a requirement for ClearPoint to access a candidate's cloud services account to deploy this solution.

Candidates should use IaC to deploy the infrastructure required. Please let us know which one would you go for.

Candidates should provide documentation on their solution, including:

* Pre requisites for your deployment solution.
* High level architectural overview of your deployment.
* Process instructions for provisioning your solution.

Please take a look at the [Assessment Grading Criteria](#-assessment-grading-criteria) below.

## Bringing up the app using docker-compose

For testing purposes, the application can be deployed using docker-compose. Running `docker-compose up` from the root directory of this project will build the images and spin up containers for `frontend` and `backend` and the app will be accessible at http://localhost:3000

However, the end solution should provide such infrastructure that would satisfy the [Assessment Grading Criteria](#-assessment-grading-criteria) below.

## Assessment Grading Criteria

##### Key Criteria

The submission should the following criteria:

* Must be able to start from a cloned git repo.
* Must document any pre-requisites clearly.
* Must deploy infrastructure using code.
* Must deploy to a cloud account/subscription.

##### Grading

Candidates will be assessed across the following categories:

##### General Approach

* Clarity of code
* Comments where relevant
* Consistency of Coding

#### Security

* Least Privilege
* Network segmentation (if applicable to the implementation)
* Secret storage (if applicable)
* Platform security features

#### Simplicity

* Do not overengineer the solution

#### Resiliency

* Infrastructure should support Auto scaling and the application should be highly available

#### Bonus points

* Deploy via an automated CICD process.
