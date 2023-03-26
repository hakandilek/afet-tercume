import { SwMessage } from "./sw-message.interface";

export class SwCheckForUpdates implements SwMessage {
  readonly type = 'SwCheckForUpdates';
}
