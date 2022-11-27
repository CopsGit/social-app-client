<h1 align="center">Social App Client</h1><br>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

[![Npm Version](https://img.shields.io/node/v/@mui/material)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
[![Npm Version](https://badge.fury.io/js/npm.svg)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
![version](https://img.shields.io/badge/version-0.1.0-gree)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields)](https://github.com/CopsGit)

Social App Client is a web project based on JavaScript, React.js. The base UI surface was designed by [LamaDev](https://github.com/safak/youtube2022/tree/react-social-ui). I redesign some of the UI with [Material UI Components](https://mui.com/). I also wrote a backend server [Social App Server](https://github.com/CopsGit/social-app-server) with Typescript, MongoDB, Express.

### Dependencies

* [Node.js](https://nodejs.org/en/)

## Installation

```bash
git clone git@github.com:CopsGit/social-app-client.git
```

Use the package manager [yarn](https://yarnpkg.com/getting-started/install) or [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install packages.

```javascript
yarn install
```
```javascript
npm install
```

## Usage
Create a .env file and add your social app backend server URL
```javascript
REACT_APP_API_URL=XXXXXXXXXXXXXXXXXXXXXXX
```

Run one of the command below, and the project will be run at http://localhost:3000/
```javascript
yarn start
```
```javascript
npm start
```

## Finished
- [x] Register
- [x] Login
- [x] Create Posts, likes
- [x] Follow & Suggestions
- [x] Recent activities
- [x] Change Avatar
- [x] Dashboard User page
- [x] Dashboard Post page

## TO-DO
### New features
- [ ] comment posts
- [ ] edit posts & delete posts
- [ ] friends. Online, offline, invisible status
- [ ] dashboard activities
- [ ] dashboard percentage changes (users, posts...)
- [ ] Profile page

### Bugs & Improvements
- [ ] Login fetch user data optimization
- [ ] Posts sort by create time optimization
- [ ] Activities listed on the user main page optimization (some needed, other don't)
- [ ] responsive design optimization

## Authors

Contributors names and contact info

[Copsgit](https://github.com/CopsGit)

## Version History

* 0.1.0
    * Initial Release

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments

Inspiration, code snippets, etc.
* [Material UI Components](https://mui.com/)
* [LamaDev](https://github.com/safak/youtube2022/tree/react-social-ui)
* [Google](https://google.com)
* [Stackoverflow](https://stackoverflow.com/)
* [Reddit](https://www.reddit.com/)