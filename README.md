# gameframe.online

Development site: (http://dev.gameframe.online)<br>
Production site: (http://gameframe.online)

### Docker Setup
Download the development image:
```
sudo docker pull cilki/gameframe:latest
```

Launch the container, replacing `<repo>` with the path to the repository:
```
sudo docker run -it -p 80:80 -v <repo>:/app cilki/gameframe:latest
```

Navigate to `localhost`. The container will automatically reload the server when you make a change in the code ;).

### Building
```
npm run build
```
This command generates optimized, small bundles for loading web resources in a production environment

### Contributing
#### Mocha Tests
To run the unit tests, run `npm run test`
**NOTE** On some systems, the blob doesn't work correctly, so use `npm run test:unix`

Each test is of the from `*.test.js`, and each test file is symlinked from `frontend\tests`

#### Selenium Tests
Drivers are for Windows machines. 

If someone can figure out how to test Safari on Windows, please tell me because the documentation (http://selenium-python.readthedocs.io/installation.html) does not work for me. 

To run the acceptance tests, make sure you have Chrome, Edge, and Firefox installed. Then navigate in the terminal to the selenium folder. Finally, run the TestSite.py file with Python3, sit back and wait about fifteen minutes, and check the results. 

#### Linting
To run [ESLint](https://eslint.org/), run `npm run lint`

Run `npm run lint:fix` to get ESLint to attempt to fix as many errors as it can for you
