import { Resource } from '@lagoshny/ngx-hal-client';

export class Question extends Resource {

  uri: string;
  _links: any;

  id: any
  statement: string;
  answer: string;

  tmp: any;

  //exams_questions: any;

  //topicId: any;
  //levelId: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
