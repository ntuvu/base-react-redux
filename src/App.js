import "./App.scss";
import React from "react";
import MyComponent from "./components/MyComponent";

class App extends React.Component {
  render() {
    return (
      <div className={"app-container"}>
        Hello world
        <MyComponent></MyComponent>
      </div>
    );
  }
}

// const App = () => {
//   return (<div>
//       Hello world
//       <MyComponent/>
//     </div>
//
//   );
//
// };

export default App;
