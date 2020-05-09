
import { Resource } from '@lagoshny/ngx-hal-client';

export class Exam extends Resource {

  id: any;
  //contentLink: string;
  //name: string;
  uri: string;
  _links: any;
  //topic: any;
  //student: Student;
  //finished: boolean;
  question: any;
  nbOfQuestions: any;
  //correctAnswers: number;
  //incorrectAnswers: number;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);

  }
}





