# Diggly Front-End
[![Build Status](https://img.shields.io/travis/WikiDiggly/Diggly-Front-End.svg?style=flat-square)](https://travis-ci.org/brh55/Diggly-Front-End)
[![DevDependencies Status](https://img.shields.io/david/dev/WikiDiggly/Diggly-Front-End.svg?style=flat-square)](https://david-dm.org/dev/brh55/Diggly-Front-End.svg)
![Version](https://img.shields.io/github/tag/WikiDiggly/Diggly-Front-End.svg?style=flat-square&label=Version)
[![Drexel Senior Design](https://img.shields.io/badge/Drexel%20University-Senior%20Design-FFC600.svg?style=flat-square)](http://www.cci.drexel.edu/SeniorDesign/2015_2016/Diggly/Diggly.html)

#### Scrumboard: [![Stories in Ready](https://badge.waffle.io/WikiDiggly/Diggly.svg?label=ready&title=Ready to Do - Task)](http://waffle.io/WikiDiggly/Diggly)

Diggly creates smart data extraction and visualization of the knowledge contained in the Wikipedia encyclopedia. Diggly leverages 3 distinguishing characteristics of the Wikipedia encyclopedia to transform the way that a user consumes and interacts with the information. These defining characteristics are:
- The vastness of the Wikipedia encyclopedia
- Availability of structured information (infobox and categorization)
- Inherently linked nature of Wikipedia articles (through categorization, outbound links to other articles and ‘See also’ section of each article)

Diggly is a visual Wikipedia explorer representing information from Wikipedia using graphs and simplified information, with little text. With Diggly, the innate ‘free-flow text’ characteristic of Wikipedia encyclopedia becomes a last resort. Instead, users of Diggly will be presented with the same information as Wikipedia and the powerful capacity to navigate related topics through condensed, easily consumed and aesthetically pleasing user interactions. This intuitive linked information is represented visually through graphs and other natural models of linked-data visualization.

![Diggly Screenshot](https://cloud.githubusercontent.com/assets/6020066/13560360/27f55e4a-e3ec-11e5-81ca-47b3cd6d704e.png)

## Front-End Set Up
1. Install all dependencies
    
    - `$ npm install`
    - `$ bower install`

2. To start up development
    
    - `$ gulp serve`

### Gulp Tasks
Commands | Description
-------- | -----------
`gulp` or `gulp build` | Builds an optimized version of your application in /dist
`gulp serve` |  Launches a browser sync server on your source files
`gulp serve:dist` | Launches a server on your optimized application
`gulp test` | Launches your unit tests with Karma
`gulp test:auto` |  Launches your unit tests with Karma in watch mode
`gulp protractor` | Launches your e2e tests with Protractor
`gulp protractor:dist` | Launches your e2e tests with Protractor on the dist files

### Unit Testing
This repository testing suite consist of:

- [Jasmine: Testing Framework](http://jasmine.github.io/)
- [PhantomJS: Headless WebKit](http://phantomjs.org/)
- [Karma: Test Runner](https://karma-runner.github.io/0.13/index.html)

#### Workflow
1. Create a test, and name the spec with a `.spec.js` suffix:

    ie: `my.controller.spec.js`

2. After writing initial test, use `$ gulp test`
    - `$ gulp test:auto` will re-run test on every change, and can save a considerable amount of time.

3. The [Nyan Report](https://github.com/dgarlitt/karma-nyan-reporter) will output the testing results.
