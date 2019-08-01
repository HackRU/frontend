# HackRU Frontend

The frontend is the main place for people to interact with HackRU on the web. It has our splash page, our sponsor package pages, the hacker dashboard, the admin dashboard (planned) and the sponsor dashboard (planned).

This readme is largely aimed at new developers on the frontend team. If that's you, welcome! Always remember that a README and even the extended wiki aren't fully comprehensive, so don't be afraid to ask questions in the HackRU internal chats.

## Brief Outline

At a glance, don't be worried if you don't know something! We have a collection of [some resources](https://github.com/HackRU/frontend/wiki/Resources) to learn everything mentioned here.

- The site is a [single-page application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) which means that the browser doesn't have to reload the whole page when users navigate around the site.
- We use [React](https://reactjs.org) as our web framework, with [Bootstrap](https://getbootstrap.com/) as a base for our styling
- Our workflows are all based around npm and git: those are pretty much the only tools you need to know

TODO: create wiki pages with resources for learning web development in general, React, npm, and git

## Getting Started

To get started with installing the repo, you should [install a recent verison of npm and node.js](https://nodejs.org/en/). NPM is what we use to install and manage the dependencies for the frontend repository. Make sure it's installed correctly with `npm -v`.

Next clone the frontend git repository somewhere on your computer, and navigate to it with a terminal session. Use the command `npm install` to pull down the resources needed to build and run the project. Once this completes, you're off to the races: use `npm run start` to launch the development web server. It should give you a link to open in your browser, where you should see your development copy of the HackRU website!

If any of the steps above have an error, **please ask for help!** We're always ready to help out, and an error probably means the next step is going to wrong in a bizarre fashion.

You might want to install the React Developer Tools as a browser extension. It's not mandatory but pretty helpful, for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/). It augments your existing browser dev-tools (bound to F12) with React awareness, so you can see a tree of the React components on the page.

Once you have the page running in your browser, you're all set up! Ping someone for a starter task, and embark on your HackRU adventure.

## Making a Change

Once you've gotten the repository up and running, it's time to do some development. You can use any text editor with the frontend, and don't worry about code style. We have automated tools to take care of that!

The first step in your change is to create a git branch on your local repository with some relevant name. Let's say you're fixing the styling on the dashboard buttons; a good branch name would be `fix-dashboard-button-style`. Feel free to make lots of small commits during your work. The commit history within a specific change doesn't really matter: each Pull Request gets squashed down to a single commit before being merged into master.

The next step is to make edits to the relevant components, until everything works the way you want it. Again, *feel free* to ask for help throughout here. What takes you two days to figure out might take a more experienced team member all of five minutes!

Once your changes are made, it's time for some automated checks. Our checks are `npm run check`, which just reports errors, and `npm run fix`, which fixes them for you. They both invoke `prettier` and `eslint`, which are tools we use to maintain code quality. [`prettier`](https://prettier.io/) automatically formats code; [eslint](https://eslint.org/) checks it for errors or bad practice. Between the two, we try to take as much load off your shoulders as possible. Don't dedicate any thought to code styling, because `prettier` will make sure your code looks standard. `eslint` can catch some kinds of errors, like a typo in a variable name, and warn about common mistakes. *Always* commit your code before running `npm run fix`: it changes the files on disk, and if you want to undo a change, it's better to be able to take advantage of git.

The next step is to submit your code for review and CI (automated code checking). Make a pull request on the Github page, with a description of your changes. If your changes are forward-facing, include a screenshot to show them off quickly to reviewers. Once you have an approving review and the automated code checks pass (using `npm run check` from above), you can merge your code into the master branch!

TODO: write a wiki that goes into more depth about each step between making the change it showing up in the site

## Don't Panic!

A quote from Ez, a previous frontend team lead:

"Seriously, this project is not part of your required curricula. It's something extra, it's something for the community, and it means learning a lot of things on the fly. This can be a huge boon - you will definitely have a tremendous amount of experience, both technical-wise and organization-wise. This community is a great opportunity to expand your network.

In case something goes wrong, or in case of a fire, or in case you feel overwhelmed or daunted by what's going on, here are some rules of thumb:

1. Take some time to calm down and chill out. Health comes first, even from a practical perspective. You can't fix anything while panicking. HALT is a real good pattern to keep in mind: Don't try to work on things when you are hungry, angry/upset, lonely/lost, or tired to the extent that you can't perform properly. It will make things worse. Heroes be damned, don't try to stay up til 5am working on something on your own. If last minute crunching is needed, we shouldn't be doing it by ourselves.
2. Write down what exactly has gone wrong and tell someone. Contact the team lead, one of the directors, our assigned rnd mentor, the git-help channel, etc. We will all will be willing to help clean up the mess. It's not just because this project affects all of us, and it's not just because we have a responsibility - it's because we literally have set shit on fire before and caused holy hell to occur through our mistakes. We want to be do as much as we can, and yelling and accusing people is definitely counter-productive.
3. Cooperate and work together with whoever's helping you to fix what happened as much as possible. Stay on the issue, learn from it, and don't add or subtract from directions to prevent further issues from rising.
4. After it's passed, we'll all sit down and discuss the reason for what happened. Huge breaks and long error logs can be the result of innocent mistakes or even non-mistakes that have been handled a specific way by the library/framework/language in use. We will all benefit from learning what happened and from implementing a procedure to prevent it from happening again. A good principle is to review the documentation given and to also write some of your own.
5. Remember that communication is key, and that we are all very appreciative of your efforts and contributions. If you need to stop working on HackRU, we will understand and adapt as necessary. We just ask that you be courteous and tell of us any and all issues/questions that you have."

The web team has cooled off a bit in the time since (less taking-down-production or critical bugs) but this is still very important. HackRU should not come before school, or work if it's applicable. It's ok for this not to be your first, second, third, whatever priority. The most important thing is communication: don't over-commit on what you can do, but also don't reach out to ask for help. 

