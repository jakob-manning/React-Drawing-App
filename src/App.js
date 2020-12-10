import './App.css';
import BubbleContainer from "./Containers/BubbleContainer/BubbleContainer";
import Wrapper from "./hoc/Wrapper/Wrapper";
import Menus from "./Containers/Menus/Menus";
import React from "react"
import SideDrawer from "./Components/UI/SideDrawer/SideDrawer";

function App() {
  return (
      <Wrapper>
          <Menus/>
          <BubbleContainer />
      </Wrapper>
  );
}

export default App;
