import { DateTime } from "luxon";

export const formattingTime = (time: string) => {
  return DateTime.fromISO(time).toFormat("yyyy-MM-dd");
};
