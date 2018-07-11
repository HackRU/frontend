# Road to Redux 

1.  Introduction(#introduction)
2.  In Defense of Redux(#in-defense-of-redux)
3.  Workflow(#workflow)

## Introduction 
This document hopes to serve as some sort of walkthrough on the transition from the original React App into a React-Redux architecture.  

## In Defense of Redux
There are several different articles and documents on Redux and why it's used -- see the README.  There are also valid [criticisms](https://medium.freecodecamp.org/whats-so-great-about-redux-ac16f1cc0f8b) on Redux, but I would make the personal comment that these difficulties are mostly  because JavaScript is [annoying to learn](https://medium.com/@endigo9740/why-javascript-sucks-from-someone-that-loves-it-94d0c5777e42) and [often just straight up irritating to work with.](https://whydoesitsuck.com/why-does-javascript-suck/)
Many of [our own project leads](https://github.com/Sail338?tab=repositories) and [even our directors](https://github.com/hemangandhi) have expressed disdain with JS and React, yet here we are.  With all its flaws, JS remains flexible and pliable enough to suit our needs.  The end goal, of course, is to enable [anyone's front-end to work with LCS](https://github.com/HackRU/lcs/wiki/Using-LCS)
Reasons why Redux is good in general are:

1.  Because React implements uni-directional data flow, it is better to have a 'single source of truth', referring to the Redux `store` container.  This means many of the components that make up the UI can be much 'dumber'- they don't have to manage the state directly, and they can operate (more or less) independently of changes to the state-tree.
2.  Because we're not really experienced devs, it is better to have something that can restrict us from making mistakes.  An example here is the difficulty in managing side effects (like API calls) and how they interact with component lifecycles using pure React.  At a minimal level, Redux [takes care of this](https://dev.bleacherreport.com/3-things-i-learned-about-working-with-data-in-redux-5fa0d5f89c8b) through `connect`.

Reasons why Redux is good for this project in particular are: 
1.  We need to be able to manage state between components, a simple example being when we must conditionally render.
2.  We need to be able to adapt to feature additions and changes in a clear manner in future iterations of HackRU and maybe other hackathons as well.
3.  ~~Holy crap the original UserForm has >800 lines of code and wtf is going on with the cookies~~
3.  Documentation is important.  In documenting, we can find that there are parts of the UI functionality that could be rewritten more optimally.

## Workflow

Most of the work that will be done will follow: 
1.  Understand the original React component and how it operates in relation to the rest of the UI.
2.  Isolate the appropriate state variables and functions.  
3.  Create an appropriate reducer to provide a proper state shape and to handle dispatched actions.
4.  Rewrite functions that manipulate state as actions and include their types in the reducer.
4.  Rewrite functions that do other things (like API calls) as action creators to be called within the rewritten component.
5.  Rewrite the component to connect with the Redux store with the appropriate reducer and set of actions.


