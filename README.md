<img alt="HipChat" style="width: 100px; height: 100px" src="https://raw.githubusercontent.com/jedcn/hipchat-hotline/master/docs/images/hipchat.png">
<img alt="Hotline" style="width: 100px; height: 100px" src="https://raw.githubusercontent.com/jedcn/hipchat-hotline/master/docs/images/hotline.png">

# hipchat-hotline

[![Build Status](https://travis-ci.org/jedcn/hipchat-hotline.svg?branch=master)](https://travis-ci.org/jedcn/hipchat-hotline)
[![Coverage Status](https://coveralls.io/repos/jedcn/hipchat-hotline/badge.svg?branch=master)](https://coveralls.io/r/jedcn/hipchat-hotline?branch=master)
[![Code Climate](https://codeclimate.com/github/jedcn/hipchat-hotline/badges/gpa.svg)](https://codeclimate.com/github/jedcn/hipchat-hotline)

## Overview

This is an NPM module that provides a command line script named
`hipchat-hotline`. It lets you send messages to HipChat users or to
HipChat rooms:

    Usage: hipchat-hotline <recipient> <msg>
      Options
        When sending to either user or room:
          --message-format text | html
          --notify         false | true
        When sending to a room:
          --color          yellow | green | red | gray | purple

It has many uses, but was created so that processes (build, ci,
deployment, general automation) could notify people with when (and
how) they completed.

**HipChat is a good medium because it's so accessible, and you get
notifications, timestamps, and search for free.** Build, ci, and
deployment information is obviously available elsewhere, but it's
usually less accessible and not ambiently available.

Messages to Users:

```sh
hipchat-hotline user@company.com "<a href='$BUILD_URL'>This build</a> failed."
hipchat-hotline @SpecificUser Your latest commit has been built and deployed.
```

Messages to Rooms:

```sh
hipchat-hotline 'Maintenance Room' 'Merged branches removed. Cleanup complete.'
hipchat-hotline --color red TeamRoom "<a href='$BUILD_URL'>This build</a> failed."
```

## Installation

```sh
npm install -g hipchat-hotline
```

### Who are you sending as?

You must set an environment variable named `HIPCHAT_API_TOKEN` in
order to use `hipchat-hotline`. You will send messages as the identity
to which this token belongs.

How can you find your token? Presuming you've got a HipChat account,
login to https://www.hipchat.com and:

* Click Edit Profile
* Click API Access
* Look for your token after the text "To access the API as yourself.."

What are you looking for? Tokens are 40 characters long. Here's an
example of one: `72JvEnJuXaI3l4K6zLcC8hp2PUvRGJn09hA2FA4Q`.

If those instructions didn't work for you, or if the
https://hipchat.com website changes its user interface, you can note
what the `www` in https://www.hipchat.com changes to after you login
and jump straight to the page that shows the token:
https://what-the-www-changes-to.hipchat.com/account/api

Once you've got this token, set it as an environment variable:

    export HIPCHAT_API_TOKEN=72JvEnJuXaI3l4K6zLcC8hp2PUvRGJn09hA2FA4Q

Alternatively, you can add this information to a file named
`~/.hipchat-hotlinerc`.

Add a line that looks like:

    HIPCHAT_API_TOKEN=72JvEnJuXaI3l4K6zLcC8hp2PUvRGJn09hA2FA4Q

And `hipchat-hotline` will load this information into your environment
before it runs.

## Examples

Examples follow and are split into two categories:

1. For People, and then
2. For Rooms

### For People

#### Using @nickname

Send a message to a single person on hipchat using an @nickname:

```sh
hipchat-hotline @YourFriend "Hi there"
```

#### Using email address

or you can use an email address:

```sh
hipchat-hotline yourfriend@company.com 'Time is up! Let us do this!'
```

#### Sidenote about Quotes

`hipchat-hotline` is a command line utility, and so, your shell will
interpret arguments before it runs. It is safest to pass two
arguments by explicitly wrapping the arguments in quotes.

However, if you're daring you can take advantage of the fact that
`hipchat-hotline` will combine all arguments beyond the first into the
second, so, these two ideas become equivalent:

```sh
hipchat-hotline @user 'This is a message'
hipchat-hotline @user This is a message
```

#### `--message-format`: `text` vs `html` and defaults

HipChat (the service) allows you to specify whether your message
should be interepted as `text` or `html`. By default `hipchat-hotline`
will send `text`, unless we see that your content has the HipChat
supported HTML tags in it. If `hipchat-hotline` sees those tags it
will send `html`:

```sh
hipchat-hotline @user 'This will be text'
hipchat-hotline @user "This will be html: <a href='https://hipchat.com'>hipchat</a>"
```

However, you can be explicit about `text` vs `html`, if you're into
that:

```sh
hipchat-hotline --message-format text @user "This will be <b>text</b>"
```

#### `--notify`

By default the hipchat-hotline notifies people and makes their phone
buzz or client application "pop up" on their desktop, but you can be
quiet about it:

```sh
hipchat-hotline --notify false @user "This will be quiet"
```

### For Rooms

Send a message to everyone in a particular room:

```
hipchat-hotline MiracleOfScience "Everything is OK."
hipchat-hotline 'Wrap Room Name In Quotes If There Are Spaces' 'Got it! Thanks.'
```

#### `--color`

HipChat allows you to specify the color of a message when you're
sending to a room. The default color is `green`, and you can choose
from `red` and `gray`, and `purple`:

```
hipchat-hotline --color gray "Phoenix Landing" "It's been awhile."
hipchat-hotline --color green "Rangzen Tibetan Place" 'Good Food!'
hipchat-hotline --color purple 'The Field' Nice atmosphere.
hipchat-hotline --color red "The Enormous Room" "Where'd you go?"
```

#### `--notify`

You do not need to interrupt a room:

```sh
hipchat-hotline --notify false TheMiddleEast "This will appear, but won't notify."
```

#### `--message-format` (again)

You can also do the `--message-format` thing, setting it to `text` or
`html` as you please.

### More Examples?

Here's a shell script that is used for general testing. It provides
several examples of how this command line utility could be used:
[test/examples.sh][examples].

[examples]: ./test/examples.sh

## Contributing

If you'd like to contribute check out
[CONTRIBUTING.md][CONTRIBUTING.md].

[CONTRIBUTING.md]: ./docs/CONTRIBUTING.md
