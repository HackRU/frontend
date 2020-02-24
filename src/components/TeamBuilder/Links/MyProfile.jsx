import React, { useState } from "react";
//import "../../App.css";
import Select from "react-select";

const skills = [
  { value: "Python", label: "Python" },
  { value: "Front-end", label: "Front-end" },
  { value: "Java", label: "Java" },
  { value: "Back-end", label: "Back-end" },
  { value: "UI/UX", label: "UI/UX" },
  { value: "ML/AI", label: "ML/AI" }
];

const prizes = [
  { value: "Best Hardware Hack", label: "Best Hardware Hack" },
  { value: "Best AI Hack", label: "Best AI Hack" },
  {
    value: "Best Magic Related or Humor Hack",
    label: "Best Magic Related or Humor Hack"
  },
  { value: " Best Rutgers Hack", label: " Best Rutgers Hack" },
  {
    value: "Best Use of Wolfram Language",
    label: "Best Use of Wolfram Language"
  },
  { value: "Best Car App", label: "Best Car App" }
];

const MyProfile = () => {
  // class MyProfile extends React.Component {

  const [{ selectedSkill }, setSkill] = useState(0);
  const [{ selectedPrize }, setPrize] = useState(0);

  var state = {
    selectedSkill: null,
    selectedPrize: null
  };
  function skillChange(selectedSkill) {
    setSkill({ selectedSkill }, () =>
      console.log(`Option selected:`, state.selectedSkill)
    );
  }
  function prizeChange(selectedPrize) {
    setPrize({ selectedPrize }, () =>
      console.log(`Option selected:`, state.selectedPrize)
    );
  }

  return (
    <div className="App">
      <h1 className="App-header">
        MyProfile Component
        <div className="Drop-down">
          <Select
            value={selectedSkill}
            isMulti
            placeholder="Select Skills ..."
            onChange={skillChange}
            options={skills}
          />
        </div>
        <div className="Drop-down">
          <Select
            value={selectedPrize}
            isMulti
            placeholder="Select Prizes ..."
            onChange={prizeChange}
            options={prizes}
          />
        </div>
        <button>Create Profile</button>
      </h1>
    </div>
  );
  // }
};

export default MyProfile;
