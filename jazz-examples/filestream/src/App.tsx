import { FileWidget } from "./FileWidget.js";
import { Logo } from "./Logo.tsx";

function App() {
  return (
    <>
      <main className="mx-auto mt-16 flex max-w-3xl flex-col gap-8 px-3">
        <Logo />
        <FileWidget />
      </main>
    </>
  );
}

export default App;
