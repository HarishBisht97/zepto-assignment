import "./App.css";
import AutoSelect from "./AutoSelect";
import { USERS } from "./mockdata";

function App() {
  const handleSelectChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
  };

  return (
    <div className="flex justify-center items-center mt-16 w-full">
      <div>
        <AutoSelect options={USERS} onChange={handleSelectChange} />
      </div>
    </div>
  );
}

export default App;
