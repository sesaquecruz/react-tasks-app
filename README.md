# Tasks App

This is a web application to create and manage tasks efficiently. Users can create an account and log in, then perform actions such as creating, listing, editing, and deleting tasks. 

It is also possible to search for tasks by term and view them sorted by name or due date. Each task contains a name, description, priority, status, and due date.

## Demo

The app is running in a Kubernetes cluster using GKE on GCP. Check out the live demo on: 

- [Tasks App](https://git.tasks.sesaque.com)

Other related repositories are:

- [Tasks Api](https://github.com/sesaquecruz/java-tasks-api)
- [Tasks Infra](https://github.com/sesaquecruz/k8s-tasks-infra)
- [Tasks Docker Hub](https://hub.docker.com/r/sesaquecruz/react-tasks-app/tags)

## Features

- **User Authentication**: Users can sign up and log in to manage their tasks securely. The Identity and Access Management (IAM) used is [Auth0](https://auth0.com/).
- **Create Task**: New tasks can be created easily. Each task has name, description, priority, status, and due date.
- **List Tasks**: All tasks are viewed in a well-organized list.
- **Edit Task**: Update the details of existing tasks when needed.
- **Delete Task**: Remove tasks that are no longer required.
- **Search Tasks**: Find specific tasks using search functionality based on task name, description, priority and status.
- **Sort Tasks**: List tasks sorted by name and due date for better organization.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material UI](https://mui.com/)

## Contributing

Contributions are welcome! If you find a bug or would like to suggest an enhancement, please make a fork, create a new branch with the bugfix or feature, and submit a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) file for more information.
