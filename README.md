github-version-compare -- npm module to get, and to compare latest version and current version.
===========================================

## Install

```bash
npm install --save github-version-compare
````

## Description

compare package.json version (current app version), and 
GitHub latest release version.

## Usage

As a node module:

```js
const Version = require('github-version-compare');
const packagejson = require('../package.json');
const repository = 'taku-o/github-version-compare';

const version = new Version(repository, packagejson);
version.pull().then(function(version) {
  if (version.hasLatestVersion()) {
    // this version is old.
    const latestVersion    = version.latestVersion;
    const currentVersion   = version.currentVersion;
    const publishedAt      = version.publishedAt;
    const latestReleaseUrl = version.latestReleaseUrl;

    // update application version

  } else {
    // this version is latest.
  }
})
.catch(function(err) {
  // error
  // for example internet connection error.
});

```

display electron version check dialog:

```
const Version = require('github-version-compare');
const packagejson = require('../package.json');
const repository = 'taku-o/github-version-compare';
const electron = require('electron');

function showVersionDialog() {
  const version = new Version(repository, packagejson);
  version.pull().then(function(version) {
    const message = version.hasLatest()? 'new version is found.': 'current version is latest';
    const buttons = version.hasLatest()? ['CLOSE', 'Open Release Page']: ['OK'];

    var dialogOptions = {
      type: 'info',
      title: 'application version check.',
      message: message,
      buttons: buttons,
      defaultId: 0,
    };
    var btnId: number = dialog.showMessageBox(dialogOptions);
    if (btnId == 1) {
      // open release page.
      shell.openExternal(version.latestUrl);
    }
  })
  .catch((err: Error) => {
    log.error(err);
  });
}
```

