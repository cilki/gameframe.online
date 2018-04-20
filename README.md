# gameframe.online

<http://gameframe.online>

## Dependencies/Requirements

Be sure to run `npm install` and `pip install -r requirements.txt`

## Building

```bash
npm run build
```

This command generates optimized, small bundles for loading web resources in a production environment

## Contributing

We are not looking for contributors at this time.

## Testing/Miscellaneous

### Mocha Tests

To run the unit tests, run `npm run test`
**NOTE** On some systems, the blob doesn't work correctly, so use `npm run test:unix`

Each test is of the from `*.test.js`, and each test file is symlinked from `frontend\tests`

Alternatively, you can run `make frontend` from the root directory.

### Selenium Tests

To run the acceptance tests, make sure you have Python3, Chrome, Edge, and Firefox installed.
Also have the webdrivers for each browser installed and in your PATH as well (see: <http://selenium-python.readthedocs.io/installation.html>).

```bash
# only need to install once
pip install selenium
python selenium/TestSite.py
# OR
make selenium
```

Sit back and wait about ten minutes and check the results.

### Linting

To run [ESLint](https://eslint.org/), run `npm run lint`

Run `npm run lint:fix` to get ESLint to attempt to fix as many errors as it can for you
