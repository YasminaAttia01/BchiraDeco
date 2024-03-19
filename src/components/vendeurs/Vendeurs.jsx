import React from "react";
import DescriptionBox from "../parts/descriptionBox/DescriptionBox";

function Vendeurs() {

        const boxes = [
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z" />
              </svg>
            ),
            title: "Navigation",
            text: "Parcourez les différents articles disponibles.",
            background: "red",
          },]
  return (
    //style vendeurs-container at achteurs.scss
    <div className="vendeurs-container">
      <h3>les acheteurs</h3>
      <div className="icons">
        {boxes.map((box, i) => (
          <DescriptionBox
            key={i}
            icon={box.icon}
            title={box.title}
            text={box.text}
            background={box.background}
          />
        ))}
      </div>
    </div>
  );
}

export default Vendeurs;
