import { Resource } from '@lagoshny/ngx-hal-client';

export class Theory extends Resource {

  uri: string;
  _links: any;

  id: any;
  name: string;
  text: string;
  contentLink: string;

  level: any;
  topic: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
