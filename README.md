# hipchat-hotline

[![Build Status](https://travis-ci.org/jedcn/hipchat-hotline.svg?branch=master)](https://travis-ci.org/jedcn/hipchat-hotline)

## Overview

This is an NPM module that provides a command line script named
`hchl`. This script lets you send messages directly to HipChat users
or to everyone in a HipChat room.

The original intent was to provide a small, simple mechanism for
automated processes running on build, ci, or deployment servers to
reach out to administrators through HipChat.

Examples follow detailing how it can be used (1) For People and then
(2) For Rooms.

### For People

Send a message to a single person on hipchat:

    # Using a @nickname
    hchl @YourFriend "Hi there"

or..

    # Using an email address:
    hchl yourfriend@company.com 'Time is up! Let us do this!'

HipChat allows you to send `text` or `html` messages. By default we'll
send `text`, unless we see that your content has some HTML tags in
it. And if that's the case we'll send `html`:

    hchl @nickname "This will be a link to <a href='https://hipchat.com'>hipchat</a>"

But you can be explicit about `text` vs `html`, if you're into that:

    hchl @nickname --message-format text "This will be <b>text</b>"

By default the hipchat-hotline notifies people and makes their phone
buzz or app "pop up", but you can be quiet about it:

    hchl --notify false @nickname "This will be quiet"

### For Rooms

Send a message to everyone in a particular room:

    hchl MiracleOfScience "Everything is OK."

And you can control colors:

    hchl --color red TheEnormousRoom "Things are not cool."

While we're talking about colors, the default color is `green`, and
you can choose from `red` and `gray`, and `purple`.

You don't need to interrupt a room if you don't want:

    hchl --notify false TheMiddleEast "This will appear, but won't notify."

You can also do the `--message-format` thing, setting it to `text` or
`html` as you please.

## Installation

    npm install -g hipchat-hotline

### Setup: Who are you sending as?

In order to use `hchl` (aka: hipchat-hotline) you need to set an
environment variable named `HIPCHAT_API_TOKEN`. Whenever you use
`hchl` you'll send messages as the identify to which this token
belongs.

Presuming you've got a HipChat account, login to
https://www.hipchat.com with the account you want to send messages as
and:

* Click Edit Profile
* Click API Access
* Look for your token after the text "To access the API as yourself.."

Tokens are 40 characters long. Here's an example so that you will know
what to look for: `72JvEnJuXaI3l4K6zLcC8hp2PUvRGJn09hA2FA4Q`

Alternatively, note what the `www` in https://www.hipchat.com changes
to after you login and jump straight to the URL that shows the token:
https://what-the-www-changes-to.hipchat.com/account/api

Once you've got this token, set it as an environment variable:

    export HIPCHAT_API_TOKEN=72JvEnJuXaI3l4K6zLcC8hp2PUvRGJn09hA2FA4Q

And you should be off to the races.

## More Examples?

Here's a shell script that is used for general testing. It provides
several examples of how this command line utility could be used:
[test/examples.sh][examples].

[examples]: ./test/examples.sh
