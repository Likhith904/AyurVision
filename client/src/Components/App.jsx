import Navbar from "./Navbar";
import MyForm from "./MyForm";
import ChatBot from "./ChatBot";

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "100px" }}>
        <MyForm />
      </div>
      <ChatBot />
    </div>
  );
}
