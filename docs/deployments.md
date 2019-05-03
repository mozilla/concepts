## Tagging Releases ##

You can do this whenever you are ready to share anything on Stage

1. https://github.com/mozilla/concepts/releases/new
2. Tag Version: YYYY-MM-DD (append -N if more than one release is tagged on a given day: 2019-04-08-1)
3. Release Title: YYYY-MM-DD
4. Click `Publish`

Please be as detailed as possible in the release notes.

## Push to Stage ##

This will happen on Thursday at the end of sprint.

1. `git checkout stage`  (No luck?  Try `git fetch mozilla` and `git checkout -b stage mozilla/stage` -- both commands assume your remote is named `mozilla`)
2. `git reset --hard YYYY-MM-DD`  # whatever your tag name is
3. `git push mozilla stage -f`  # Replace `mozilla` with whatever you name your upstream.  The `-f` is only necessary if we cherry-picked patches when we pushed last time.

You can check the release version of the staging server [here](https://firstlook.stage.mozaws.net/__version__).

## Test Stage ##

Have people manually verify stage. If issues are found, file issues, resolve them and do a new stage push

## Deploy Production ##

Once we are comfortable that the site has been tested:

1. `git checkout production`
2. `git reset --hard YYYY-MM-DD`  # whatever your tag name is
3. `git push mozilla production -f`  # Replace `mozilla` with whatever you name your upstream.  The `-f` is only necessary if we cherry-picked patches when we pushed last time.


## Checking Deployments ##

You can check the release version of the production  server [here](https://firstlook.firefox.com/__version__)
