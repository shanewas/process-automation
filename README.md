## RPA solution

Robotic process automation (RPA) is a software technology that makes it easy to build, deploy, and manage software robots that emulate humans actions interacting with digital systems and software.

# Builder

This is the core repository for Builder project. The `alpha` branch is for making pull requests based on your current work.

## To clone and run for the first time
2. Clone your personal copy in your machine.
3. After the clone run the following command to get up and running
    + `cd aiw-builder`
    + `touch frontend/.env && echo "PORT=4000" > frontend/.env`
    + `npm run install-all`
    + `npm run start`
4. make sure port `4000` is not being used by any other process before you start to run `Builder`

## Collaboration Process

For collaboration, follow the current running sprint on jira. branch based on the issue you are going to work on. Then after making the improvement, make sure nothing is broken and push to your repository. Make a Pull request.

## Technology Used

- Electron
- JavaScript
- Express
- NodeJs
- Mongodb

