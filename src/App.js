import React, { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");

  const onChangeHandler = (event) =>{
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  console.log(value)

  return (
    <div>
      <input type = "text" onChange={onChangeHandler} value={value}/>
    </div>
  );
};

export default App;