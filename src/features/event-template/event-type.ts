import { z } from "jazz-tools";

export const EventTypes = {
  COURSE: "course",
  IN_BETWEEN_COURSES: "in-between-courses",
  SERVICE_PERIOD: "service-period",
  OTHER: "other",
} as const;

export const EventTypeSchema = z.enum([
  EventTypes.COURSE,
  EventTypes.IN_BETWEEN_COURSES,
  EventTypes.SERVICE_PERIOD,
  EventTypes.OTHER,
]);

export type EventType = z.infer<typeof EventTypeSchema>;

export const EventTypeLabel = {
  [EventTypes.COURSE]: "Curso",
  [EventTypes.IN_BETWEEN_COURSES]: "Entrecursos",
  [EventTypes.SERVICE_PERIOD]: "Período de Serviços",
  [EventTypes.OTHER]: "Outro",
};

type EventTypeColorMap = {
  fill: string;
  border: string;
};

export const EventTypeColor = {
  [EventTypes.COURSE]: {
    fill: "bg-blue-500",
    border: "border-blue-700",
  },
  [EventTypes.IN_BETWEEN_COURSES]: {
    fill: "bg-green-500",
    border: "border-green-700",
  },
  [EventTypes.SERVICE_PERIOD]: {
    fill: "bg-purple-500",
    border: "border-purple-700",
  },
  [EventTypes.OTHER]: {
    fill: "bg-gray-500",
    border: "border-gray-700",
  },
} as const satisfies Record<EventType, EventTypeColorMap>;
