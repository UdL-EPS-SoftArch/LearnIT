import { Resource } from '@lagoshny/ngx-hal-client';

export class Theory extends Resource {
  id: any;
  contentLink: string;
  level: any;
  name: string;

  uri: string;
  text: string;

  _links: any;
  topic: any;



  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
