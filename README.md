# nodejs-intro
Basic NodeJS app and notes for introducing people to the tool.  Used for presenting at FED@IBM for an Intro to Node.js session.  Useful for others interested in learning Node.js basics.

Some of the bulleted lists below on basic information is taken from [nodejs.dev](https://nodejs.dev/learn).

## Overview
* Cross-platform open source server side JavaScript runtime
* Single process, no multi-threading
* Almost everything is asynchronous, few blocking APIs.  This is required since everything is a single process.
* No compiling, unless you introduce another layer like TypeScript or Babel.  This allows for much faster change=>test time.
* Same language as browser side JavaScript, with some minor differences
    * A few things can't be used like `window`, `document`, or view related items.
    * Allows for disk or computer resource access that the browser does not allow
    * Importing files/libraries uses `require()` syntax instead of `import`
* `npm` can be used to manage dependencies and run code

## Installing
Variety of ways to install depending on preference.

1. [My suggested method] [NVM](https://github.com/creationix/nvm): Follow instructions on the README to install.  NVM allows you to easily change the NodeJS version, including updating the PATH.  This ends up being very important if you are working on multiple things and they each require a different NodeJS version.

2. [Mac only] [Homebrew](https://brew.sh/): Follow instructions for installing Homebrew.  Then run `brew install node`.

3. [NodeJS.org download](https://nodejs.org/en/download/): Download setup files directly from NodeJS website and install with their directions.

4. [Other platforms](https://nodejs.org/en/download/package-manager/): Lots of platform specific info.

## Creating your application
Creating a basic application is easy.

1. `npm init` and fill in requested infromation
    ```
    % npm init
    This utility will walk you through creating a package.json file.
    It only covers the most common items, and tries to guess sensible defaults.

    See `npm help json` for definitive documentation on these fields
    and exactly what they do.

    Use `npm install <pkg>` afterwards to install a package and
    save it as a dependency in the package.json file.

    Press ^C at any time to quit.
    package name: (nodejs-intro)
    version: (1.0.0)
    description:
    entry point: (index.js)
    test command:
    ...
1. `package.json` file is created after completion of previous step.  This file manages metadata about the application including the dependencies, entry points, scripts to execute the application, and more.
    * If you are familiar with frontend development, you have probably seen this file before
1. Create an entrypoint file.  For example, `app.js`.
1. In the new file, add `console.log('Hello world')`
1. Run `node app.js` and see the output.  You have your first NodeJS hello world.

## Adding basic features
### HTTP request
There are built-in NodeJS libraries for this ([see http](https://nodejs.org/api/all.html#http_http_get_url_options_callback)), or you can use a third party library like [Axios](https://github.com/axios/axios).  For this example we will use Axios since it's less confusing.

1. `npm install axios --save` to download Axios and mark it as a dependency
1. Execute the call
    ```
    const axios = require('axios');

    axios.get('https://randomuser.me/api/?results=2').then((response) => {
        response.data.results.forEach((person) => {
            console.log(`Email: ${person.email}`);
        });
    });
    ```

    * Notice the `Hello world` output gets put to the console prior to the response data.  That is because the response is processed asynchronously.
    * `axios.get()` starts the GET call but doesn't hold up the process for the response.  Instead it returns a promise which is resolved or rejected when the data comes back.
    * `.then()` accepts a function which gets executed when the HTTP call returns successfully.  In this case we are just printout out the 'email' of each person.

### Read and write files
NodeJS allows you to access things on the disk.  Browsers do not allow this.

1. `fs.readFile()` to execute the read
    ```
    fs.readFile('./my-sample.json', (err, data) => {
        console.log('My file data:', JSON.parse(data));
    });
    ```

    * `Hello world` is again output prior to the file read because this is done asynchronously.
    * Output of file contents is printed before HTTP request since the HTTP request has to go to network and come back which will almost always take longer than disk I/O.

### Create simple HTTP server
A lot of the time NodeJS is used as a REST endpoint.  This can be done very easily with tools such as [ExpressJS](https://expressjs.com/).

1. `npm install express --save` to download and install the dependency
1. Require the library and setup the server.
    ```
    const app = express();
    app.get('/', (req, res) => {
        res.send('Hello world!');
    });
    app.listen(3000, () => console.log('Server is listening on port 3000'));
    ```

    * Sets up an express instance that returns 'Hello world' text when you hit the root route
    * `app.listen()` starts listening to the port asynchronously and does not allow the NodeJS process to complete until listening is done
    * `Hello world` and all other `console.log()` statements still output and the app will still listen to the port and routes

## Debugging
NodeJS can be debugged just like any other server side language.  The method depends on your editor.

1. Set a breakpoint on the line you want to start debugging on
1. In Visual Studio Code, click the Debug tab
1. Click `Run and Debug`
1. Select `NodeJS` from the list
1. This should hit your breakpoint, assuming the code stops at that point


## More advanced topics
NodeJS is capable of most things you would think of doing inside of a normal server side programming language.  Many large companies use it as part of production applications since it consumes small amount of resources and can scale up easily.

Other topics worth investigating:

* Calling bash scripts or other commands from within NodeJS
* Running 'scripts' with NPM
* Testing code
* Shipping NodeJS code
* TypeScript
