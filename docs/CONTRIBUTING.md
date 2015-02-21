# Contributing

Thanks for thinking about helping out, that's :metal:

## Getting Started

Once you've cloned the repo you should see all of the tests passing
when you run these commands:

    npm install && npm test

## Tests and Coverage

Tests are written in Jasmine.

Tests are executed, and test coverage is computed, using gulp plugins.

If you run `npm test` it will lint the code, run it though tests, and
produce a coverage report.

You can see a local coverage report by looking in this file:
`./coverage/lcov-report/index.html`.

## Continuous Integration

All branches that are pushed up to
https://github.com/jedcn/hipchat-hotline will be automatically built
with [https://travis-ci.org](https://travis-ci.org). The same is true
for open pull requests.

The https://travis-ci.org builds just run `npm install && npm test` as
described above.

In addition to running `npm test`, travis-ci will also upload coverage
information to [https://coveralls.io](https://coveralls.io).

## Code Analysis

https://codeclimate.com provides analysis for this project, and it's
available here: https://codeclimate.com/github/jedcn/hipchat-hotline

## Service Overview

hipchat-hotline:

* builds: https://travis-ci.org/jedcn/hipchat-hotline
* coverage: https://coveralls.io/r/jedcn/hipchat-hotline
* source analysis: https://codeclimate.com/github/jedcn/hipchat-hotline

## Installing before Publishing

This NPM package is available at https://npmjs.org, but it's important
to note that you can install candidates and use them *before* you
publish them.

If you are working on `hipchat-hotline` changes locally, you can `cd`
to the root of your clone and run:

```sh
npm install . -g
```

And then you'll be able to run your local `hipchat-hotline`.

If you are working on `hipchat-hotline` and you want *someone else* to
test or interact what what you've built, push your changes up to a
fork/branch and then ask that person to run:

```sh
npm install -g git://github.com/jedcn/hipchat-hotline.git#e00da7a
```

Where `jedcn` is replaced with your username.

When you're done you can run `npm uninstall -g hipchat-hotline`.

More information about these techniques is available here:
https://docs.npmjs.com/misc/developers.
