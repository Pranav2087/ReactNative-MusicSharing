import React from 'react';

//Constant created for carrying the state of the Location based on whether it is closeby or not
const MapContext = React.createContext({
  NerLov: '',
  Lname: '',
  locationID: '',
  setNerLov: () => {},
  setLname: () => {}, 
  setLocationID: () => {},
});

export default MapContext;
