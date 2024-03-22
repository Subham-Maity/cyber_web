import React from "react";

const Skills = ({ skills }: { skills: string[] }) => {
  return (
    <ul className="style-none skill-tags d-flex flex-wrap pb-25">
      {skills?.map((val, i) => (
        <li key={`${val}-${i}`}>{val}</li>
      ))}
      {/* <li className="more">3+</li> */}
    </ul> 
  );
};

export default Skills;
