# ServerSdkTest

## Overview


## Running locally

```
npm run-script dev-start
```

By default, the port is 3059, you could modify it with the variable **PORT**

## Test

To test, you need to specify some environment variables as :

```
npm run dev-test
```

or

```
DEBUG=debug:*,warn:*,error:* NODE_ENV=dev npm test
```

```
DEBUG=debug:*,warn:*,error:* NODE_ENV=dev PORT=3059 node app.js
```
