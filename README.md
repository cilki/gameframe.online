# gameframe.online

Development site: (http://dev.gameframe.online)<br>
Production site: (http://gameframe.online)

#### Docker Setup
Download the development image:
```
sudo docker pull cilki/gameframe:latest
```

Launch the container, replacing `<repo>` with the path to the repository:
```
sudo docker run -it -p 80:80 -v <repo>:/app cilki/gameframe:latest
```

Navigate to `localhost`. The container will automatically reload the server when you make a change in the code ;).

#### Building
```
npm run build
```
This command generates an optimized, small bundles for loading web resources in a production environment

#### Contributing
##### Tests
To run the unit tests, run `npm run test`

##### Linting
To run [ESLint](https://eslint.org/), run `npm run lint`

Run `npm run lint:fix` to get ESLint to attempt to fix as many errors as it can for you
