import { Resource } from 'angular4-hal-aot';
import {Student} from '../user/student';
import {Question} from '../question/question';
import {Exam} from '../exam/exam';

export class Exam extends Resource {
  id: number;
  uri: string;
  name = '';
  student: Student;
  finished: boolean;
  questions: Question[];
  correctAnswers: number;
  incorrectAnswers: number;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}





