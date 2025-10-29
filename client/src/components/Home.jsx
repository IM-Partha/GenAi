import  { useState } from "react";
import Header from "./Header";
import FileUpload from "./FileUpload";
import Chat from "./Chat";
import "./Home.css";

const Home = () => {
  const [file, setFile] = useState(null);

  return (
    <div className="home-page">
      <Header />

      <div className="main-container">
        {/* LEFT SIDE — PDF Upload */}
        <div className="left-panel">
          <FileUpload setFile={setFile} />
        </div>

        {/* RIGHT SIDE — Chat */}
        <div className="right-panel">
          <Chat file={file} />
        </div>
      </div>
    </div>
  );
};

export default Home;
