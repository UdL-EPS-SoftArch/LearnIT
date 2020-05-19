
import { Resource } from '@lagoshny/ngx-hal-client';

export class Exam extends Resource {

  uri: string;
  _links: any;
  _embedded: any;

  id: any;
  name: string;
  nbOfQuestions: any;

  mark: any;
  pendent: any;

  exams_questions: any;
  exams_students: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
