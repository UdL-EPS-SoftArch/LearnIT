
import { Resource } from '@lagoshny/ngx-hal-client';

export class StudentExam extends Resource {

  uri: string;
  _links: any;
  _embedded: any;

  id: any;
  pendent: any;
  mark: any;

  exam: any;
  student: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
