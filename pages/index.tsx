import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tags = [checkbox1, checkbox2, checkbox3]
      .map((model, index) => model === true && { name: `Tag ${index + 1}` })
      .filter((model) => model !== false);

    const { data } = await axios.post("/api/hello", { name, details, tags });

    if (data.id) {
      console.log("success");
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleCheckbox1Change = () => {
    setCheckbox1(!checkbox1);
  };

  const handleCheckbox2Change = () => {
    setCheckbox2(!checkbox2);
  };

  const handleCheckbox3Change = () => {
    setCheckbox3(!checkbox3);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: ".5rem" }}>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            style={{ marginLeft: ".5rem" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: ".5rem" }}>
          Details:
          <textarea
            value={details}
            onChange={handleDetailsChange}
            style={{ marginLeft: ".5rem", width: "100%", height: "10rem" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: ".5rem" }}>
          Checkbox 1:
          <input
            type="checkbox"
            checked={checkbox1}
            onChange={handleCheckbox1Change}
            style={{ marginLeft: ".5rem" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: ".5rem" }}>
          Checkbox 2:
          <input
            type="checkbox"
            checked={checkbox2}
            onChange={handleCheckbox2Change}
            style={{ marginLeft: ".5rem" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: ".5rem" }}>
          Checkbox 3:
          <input
            type="checkbox"
            checked={checkbox3}
            onChange={handleCheckbox3Change}
            style={{ marginLeft: ".5rem" }}
          />
        </label>
      </div>
      <button
        type="submit"
        style={{
          padding: ".5rem 1rem",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: ".5rem",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
}
