import { isValid, parseISO } from "date-fns";

export class DateUtil {

  public static isValidISODateTime(dateString: string): boolean {
    const date = parseISO(dateString);
    return isValid(date);
  }
}