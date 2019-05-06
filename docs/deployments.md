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

1. `git checkout prod`
2. `git reset --hard YYYY-MM-DD`  # whatever your tag name is
3. `git push mozilla prod -f`  # Replace `mozilla` with whatever you name your upstream.  The `-f` is only necessary if we cherry-picked patches when we pushed last time.


## Checking Deployments ##

You can check the release version of the production  server [here](https://firstlook.firefox.com/__version__)

## Rolling back deployments ##

There are some weird issues with rolling back deployments with Gatsby. If you are trying to roll back before an experiment was deployed, it may not work...in a pinch you can add the experiment you want to get rid of to the [ignore list](https://github.com/mozilla/concepts/blob/2019-05-06/gatsby-config.js#L22) and do a new tag.
