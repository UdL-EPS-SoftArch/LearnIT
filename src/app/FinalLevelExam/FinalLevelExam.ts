import { Resource } from '@lagoshny/ngx-hal-client';
import { Exam } from '../exam/exam';
import {FinalLevelExam} from '../FinalLevelExam/FinalLevelExam';

export class FinalLevelExam extends Exam{
  levelId: any;
  mark: any;
  topicId: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}

