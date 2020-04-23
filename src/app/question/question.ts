import { Resource } from '@lagoshny/ngx-hal-client';

export class Question extends Resource {
  statement: string;
  uri: string;
  answer: string;
  id: any;
  topicId: any;
  levelId: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
