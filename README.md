# talkn-media

- Live Communication Media Site.

## Branch strategy

- (TBD) [Github flow](https://guides.github.com/introduction/flow/)

## Review & merge policy

- At least one approval from senior engineers in frontend team to merge any changes into master.

## Technical requirement

### Technical stack

- [react](https://reactjs.org/) (main user interface framework)
- [next.js](https://nextjs.org/) (static site generation framework)
- [styled-components](https://www.styled-components.com/) (style bindings)
- [socket.io](https://socket.io/) (interactive communication)
- [scss](https://sass-lang.com/) (structured css notation)

### Tools

- `nvm` (for managing various `Node.js` versions)
- `node.js` (version specified by `.nvmrc`)
- `yarn` (install by `npm i -g yarn` command)

## How to build

- `yarn dev` : for local development hot reloading build
- `yarn build` & `yarn start` : for local production build

## How to test

- `yarn test:jest`

## Distributed endpoint (if exists)

| env     | Distributed endpoint                 |
| ------- | ------------------------------------ |
| local   | http://localhost:3000                |
| preview | https://${website-next-woad}.vercel.app |
| prod    | https://${media-name}.talkn.io|

# NOTE
