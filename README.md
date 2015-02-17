# hipchat-hotline

## Overview

    # Send a message to a single person on hipchat
    hchl <email-address> <message>

    # Send a message to a hipchat room
    hchl <hipchat-room> <message>

## For Example..

    hchl friend@company.com "Ack! Take a look at <a href='$BUILD_URL'>build $BUILD_NUMBER</a>"
    hchl "Lego Room" "Everything is awesome!"

## Installation

    npm install -g hipchat-hotline

### Setup: Who are you?

Login to https://www.hipchat.com with the account you want to send
messages as and:

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
