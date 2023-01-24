import { toTitleCase } from "../../base/services/stringService"
import type {Locale as FormatJsLocale, IntlLocaleOptions, Locale} from '@formatjs/intl-locale'
interface LocaleOptions extends Locale {
  textInfo: {
    direction:string;
  }
}
export interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup';
  weekday?: 'long' | 'short' | 'narrow';
  era?:  'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';
  formatMatcher?: 'best fit' | 'basic';
  hour12?: boolean;
  /**
   * Timezone string must be one of IANA. UTC is a universally required recognizable value
   */
  timeZone?: 'UTC' | string;
  dateStyle?: 'full' | 'long' | 'medium' | 'short',
  timeStyle?: 'full' | 'long' | 'medium' | 'short',
  calendar?: 'buddhist' | 'chinese' | ' coptic' | 'ethiopia' | 'ethiopic' | 'gregory' | ' hebrew' | 'indian' | 'islamic' | 'iso8601' | ' japanese' | 'persian' | 'roc',
  dayPeriod?: 'narrow' | 'short' | 'long',
  numberingSystem?: 'arab' | 'arabext' | 'bali' | 'beng' | 'deva' | 'fullwide' | ' gujr' | 'guru' | 'hanidec' | 'khmr' | ' knda' | 'laoo' | 'latn' | 'limb' | 'mlym' | ' mong' | 'mymr' | 'orya' | 'tamldec' | ' telu' | 'thai' | 'tibt',
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24',
  /**
   * Warning! Partial support 
   */
  // fractionalSecondDigits?: 0 | 1 | 2 | 3
}
export function getFormattedDate(d?:Date, Locale?:string) {
  let locale = Locale ? Locale : "en"
  let langDirection = (new Intl.Locale(locale) as LocaleOptions).textInfo.direction;
  

  let date = d?d:new Date();
  let now = new Date();
  let isToday = now.toDateString() === date.toDateString();
  let isYesterday = new Date(new Date(now).setDate(now.getDate() - 1)).toDateString() === date.toDateString();
  const rtf = new Intl.RelativeTimeFormat([locale], { numeric: "auto" });
  
  if (isToday) {
   const today = toTitleCase(rtf.format(0, "day"))
   if(langDirection === 'rtl'){
    return new Intl.DateTimeFormat([locale], { dateStyle: 'full'}).format(date) + ` - ${today}`;
   }
   return `${today} - ` + new Intl.DateTimeFormat([locale], { dateStyle: 'full'}).format(date);

  }else if(isYesterday){
    const yesterday = toTitleCase(rtf.format(-1, "day"))
    if(langDirection === 'rtl'){
      return new Intl.DateTimeFormat([locale], { dateStyle: 'full'}).format(date) + ` - ${yesterday}`;
    }
    return `${yesterday} - ` + new Intl.DateTimeFormat([locale], { dateStyle: 'full'}).format(date);
  } else {
    return  new Intl.DateTimeFormat([locale], { dateStyle: 'full'}).format(date);
  }
}

export function getDateOnly(d?:Date){
  let date = d?d:new Date()
  return new Intl.DateTimeFormat('en-US').format(date)
}

export function getTime(d?:Date) {
  let date = d?d:new Date();
  // let hours = date.getHours();
  // let minutes = date.getMinutes();
  // let seconds = date.getSeconds();
  // return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  let options:DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}