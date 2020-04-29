import { Resource } from '@lagoshny/ngx-hal-client';

export class Topic extends Resource {
  topicId: any;
  name: string;
  description: string;
  questions: any;
  theory: any;
  level: any;
  uri: string;
  _links: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
