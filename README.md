# gumtree-watch-cli
Simple Node.js CLI tool that helps to find new ads for a given url

Saves ads to a local storage, then performs a diff on the next run and outputs the results to the console + sends a notification using Pushbullet as an extra.

## Usage
```
$ node index -u "<url>"
```
Works best when used as a cron job.

To setup PushBullet notifications you need to set the environmental variables: `apiKey` and `deviceId`


Tested with Gumtree UK.