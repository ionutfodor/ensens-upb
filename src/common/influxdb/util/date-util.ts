import { isValid, parseISO } from "date-fns";
import { DateType } from "./date-type.enum";

export class DateUtil {

  public static getDateType(dateString: string): DateType {
    const date = parseISO(dateString);
    if (isValid(date)) {
      return DateType.ISO_DATE;
    }

    const timestamp = Number(dateString);
    if (isNaN(timestamp) || !Number.isInteger(timestamp)) {
      return null;
    }

    const dateFromTimestamp = new Date(timestamp / 1e6);
    if (isValid(dateFromTimestamp)) {
      return DateType.TIMESTAMP_NANO;
    }

    return null;
  }
}