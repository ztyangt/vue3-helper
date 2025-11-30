export type EventCallback = (...args: any[]) => void;

export interface EventListener {
  callback: EventCallback;
  once?: boolean;
}
