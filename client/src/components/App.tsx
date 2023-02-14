import { useState } from "react";

export default function App() {
  const [data, setData] = useState("");
  const [isClick, setIsClick] = useState(false);

  async function fetchServerData() {
    const res = await fetch("/api/v1/inventory");
    const resData = await res.json();
    setData(resData.data);
    setIsClick(true);
  }

  return (
    <div className="App">
      <button onClick={fetchServerData}>Get Server Data</button>
      {isClick ? <p>{data}</p> : <p>No Data</p>}
    </div>
  );
}
