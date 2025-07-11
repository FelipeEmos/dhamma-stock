import { useIframeHashRouter } from "hash-slash";
import { CreateOrder } from "./CreateOrder.tsx";
import { EditOrder } from "./EditOrder.tsx";
import { Orders } from "./Orders.tsx";

function App() {
  const router = useIframeHashRouter();

  return (
    <>
      <main className="mx-auto max-w-xl space-y-8 px-3 py-8">
        {router.route({
          "/": () => <Orders />,
          "/order": () => <CreateOrder />,
          "/order/:id": id => <EditOrder id={id} />,
        })}
      </main>
    </>
  );
}

export default App;
