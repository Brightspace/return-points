# return-points
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]

A set of APIs to get/set a URL to "return to" after launching into a workflow
that may have multiple entry points.

## Usage

Install `return-points` as a dependency:

```shell
npm install return-points
```

## Choosing a Return Point Key

To prevent nested or circular workflows from stepping on each other, each
return point must have a unique string-based key. This key must be known by
both sides: the source page launching the workflow and the destination page
which sends the user back to the source.

Try to make the key as unique as possible for the situation or object being
viewed/operated on. Also try to avoid collisions with other applications.

Examples of good keys:
* "D2L.LE.Quizzing.Quiz.Edit.502" (editing quiz with ID=502)
* "D2L.LE.Content.CreateTopic.6609" (workflow to create a new topic in OU=6609)
* "D2L.LP.Profile.View.32346" (viewing profile for user=32346)

## Setting the Return Point
Before navigating into the destination workflow, the source page should call
into the `set` API using the predetermined key. By default, the current URL
will be used as the return point, but an optional URL can also be provided.

```javascript
var returnPoints = require('return-points');

returnPoints.set( 'myKey', '/optional/url' );
```

## Getting the Return Point
Once your workflow is complete, you need to return the user back to the source
page. This can be accomplished by navigating to the result of the `get` API.

A default location must be provided in case the API can't determine the
original source URL. This might occur if the user navigated to the destination
directly somehow.

```javascript
var returnPoints = require('return-points');

var url = returnPoints.get( 'myKey', '/default/url' );
document.location.href = url;
```

[npm-url]: https://npmjs.org/package/return-points
[npm-image]: https://badge.fury.io/js/return-points.png
[ci-image]: https://travis-ci.org/Brightspace/return-points.svg?branch=master
[ci-url]: https://travis-ci.org/Brightspace/return-points
[coverage-image]: https://img.shields.io/coveralls/Brightspace/return-points.svg
[coverage-url]: https://coveralls.io/r/Brightspace/return-points?branch=master
