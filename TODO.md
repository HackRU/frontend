# HackRU Front-End TODO List
## by TresTres


0.  Create new branch.  Investigate current frontend.
1.  Remove modals.  Switch to interfaces
2. 	Introduce redux.  Delegate actions to actions and components to components.
  a.  The current code works but looks yucky in my opinion.  The main principle is that the React component
  should only have to "worry" about taking in the input and serving up the results.  
  b.  Hence function definitions, initial states, API calls, interval setups, etc. should be put under actions, and the reducers will 
  take care of the rest.
  c.  The state of everything becomes managed by a central store.  Everything can simply refer to it for consistent information instead of having 
  to manage parent-child and sibling-sibling relationships between compnents and the accompanying headaches of data flow.
  d.  If nothing else, redux will properly separate the mechanics from the appearance from the layout.  You can separate efforts into 
  action groups and component groups instead of having the possibliity of multiple coders editing one file.
3.  How2CrossPlatform?  Am stupid.
