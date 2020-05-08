
import { Exam } from '../exam/exam';

export class FinalLevelExam extends Exam {

  //id: any;
 // name:string;
  //contentLink: string;
  //name: string;
  //uri: string;
  //_links: any;
  mark: any;
  level: any;
  topic:string;
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
