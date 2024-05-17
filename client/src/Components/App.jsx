import Navbar from "./Navbar";
import MyForm from "./MyForm";

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "100px" }}>
        <MyForm />
      </div>
    </div>
  );
}
