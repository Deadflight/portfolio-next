import enMessages from "../../messages/en.json";

type Messages = typeof enMessages;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
