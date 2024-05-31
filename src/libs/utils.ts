import dayjs from "dayjs";
import relativeTiem from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTiem);

export const timeAgo = dayjs;
