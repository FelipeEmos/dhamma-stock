import { useAccount } from "jazz-tools/react";
import { DraftIndicator } from "./DraftIndicator.tsx";
import { OrderThumbnail } from "./OrderThumbnail.tsx";
import { JazzAccount } from "./schema.ts";

export function Orders() {
  const { me } = useAccount(JazzAccount, {
    resolve: { root: { orders: true } },
  });

  return (
    <>
      <section className="space-y-5">
        <a
          href={`/#/order`}
          className="relative block rounded-md border border-stone-200 bg-white p-3 text-center dark:border-stone-900 dark:bg-stone-900"
        >
          <strong>Add new order</strong>
          <DraftIndicator />
        </a>

        <div className="space-y-3">
          <h1 className="mb-3 border-b border-stone-200 pb-2 text-lg dark:border-stone-700">
            <strong>Your orders 🧋</strong>
          </h1>

          {me?.root?.orders?.length ? (
            me?.root?.orders.map(order =>
              order ? <OrderThumbnail key={order.id} order={order} /> : null
            )
          ) : (
            <p>You have no orders yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
