import { SwMessage } from "./sw-message.interface";

export class SwConfig implements SwMessage {
  readonly type = 'SwConfig';
  constructor(
    public searchLogApi: string,
    public dbVersion: number
  ) { }
}
