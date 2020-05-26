
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

  EXAMS_QUESTIONS: any;
  EXAMS_STUDENTS: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
