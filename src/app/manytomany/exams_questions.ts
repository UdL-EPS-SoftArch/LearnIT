
import { Resource } from '@lagoshny/ngx-hal-client';

export class ExamQuestion extends Resource {

  uri: string;
  _links: any;
  _embedded: any;

  id: any;

  exam: any;
  question: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
