#!/bin/sh

#
# STEP 0:
#
# You can make any of these commands supply debugging information by
# prepending:
#
#   DEBUG='*'
#
# to them.
#

# STEP 1:
#
# Uncomment the following line and update it with a valid value. A
# valid value can be found as described in README.md
#
#HIPCHAT_API_TOKEN=<See README.md to get this value>
#

#
# STEP 2:
#
# Uncomment the following line and update it with a value that is an
# email address or "HipChat Nickname" for the user that'll receive
# test notifications. This user will receive several hipchats each
# time you run this shell script
#
#TARGET_USER=<youremail@company.com or @YourNickname>
#
if [ ! -n "${TARGET_USER+1}" ]; then
  echo "TARGET_USER must be the email/@NickName to send messages to."
  exit 1
fi
bin/hchl $TARGET_USER "This is a 'text' message"

# If your message contains tags, hipchat-hotline will presume you mean
# for it to be interpreted as html and send it that way.
bin/hchl $TARGET_USER "This is an <b>html</b> message. <a href='https://hipchat.com'>HipChat Rules</a>"

# But, if you want to override this html detection behavior, you can
# explicitly say that that your message should be sent as text:
bin/hchl --message-format text $TARGET_USER "This is a 'text' message containing <b>html</b>."

# By default hipchat-hotline will attempt to notify (ie: buzz, blink,
# pop-up) the person receiving the message. However, you can control
# this with --notify:
bin/hchl --notify false $TARGET_USER "This is a quiet message"

#
# STEP 3:
#
# Uncomment the following line and update it with a value that is the
# name of a HipChat Room that you have access to. This room will
# receive several hipchats each time you run this shell script.
#
#TARGET_ROOM="HipChat API Testing Room"
#

if [ ! -n "${TARGET_ROOM+1}" ]; then
  echo "TARGET_ROOM must be room name to send messages to."
  exit 1
fi

bin/hchl "$TARGET_ROOM" "This is a 'text' message"

# If your message contains tags, hipchat-hotline will presume you mean
# for it to be interpreted as html and send it that way.
bin/hchl "$TARGET_ROOM" "This is an <b>html</b> message. <a href='https://hipchat.com'>HipChat Rules</a>"

# But, if you want to override this html detection behavior, you can
# explicitly say that that your message should be sent as text:
bin/hchl --message-format text "$TARGET_ROOM" "This is a 'text' message containing <b>html</b>."

# By default hipchat-hotline will attempt to notify (ie: buzz, blink,
# pop-up) everyone in the room that receives the message. However, you
# can control this with --notify:
bin/hchl --notify false "$TARGET_ROOM" "This is a quiet message"

# Unlike with direct user communication, you're allowed to specify
# colors when sending messages to rooms. The default is green, and it
# can be controlled with --color:
bin/hchl --color red "$TARGET_ROOM" "This is a red message"
