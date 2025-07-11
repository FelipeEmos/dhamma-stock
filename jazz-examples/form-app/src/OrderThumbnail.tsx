import { Loaded } from "jazz-tools";
import { BubbleTeaOrder } from "./schema.ts";

export function OrderThumbnail({
  order,
}: {
  order: Loaded<typeof BubbleTeaOrder>;
}) {
  const { id, baseTea, addOns, instructions, deliveryDate, withMilk } = order;
  const date = deliveryDate.toLocaleDateString();

  return (
    <a
      href={`/#/order/${id}`}
      className="flex items-start justify-between gap-3 border p-3"
    >
      <div>
        <strong>
          {baseTea} {withMilk ? "milk " : ""} tea
        </strong>
        {addOns && addOns?.length > 0 && (
          <p className="text-sm text-stone-600">
            with {addOns?.join(", ").toLowerCase()}
          </p>
        )}
        {instructions && (
          <p className="text-sm text-stone-600 italic">{instructions}</p>
        )}
      </div>
      <div className="text-sm text-stone-600">{date}</div>
    </a>
  );
}
