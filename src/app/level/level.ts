import { Resource } from '@lagoshny/ngx-hal-client';

export class Level extends Resource {
  id: any;
  name: string;
  description: string;
  topics: any;
  uri: string;
  _links: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
