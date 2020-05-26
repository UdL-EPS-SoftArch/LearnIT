
import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Observable} from 'rxjs';

import { ExamQuestion } from './exams_questions';
import { Exam } from '../exam/exam';
import { Question } from '../question/question';

@Injectable()
export class ExamQuestionService extends RestService<ExamQuestion>{

  constructor(injector: Injector) {
    super(ExamQuestion, 'exams_questions', injector);
  }

  public findByExam(exam: Exam): Observable<ExamQuestion[]> {
    const options: any = {
      params: [
        {
          key: 'exam',
          value: exam
        }
      ]
    };
    return this.search('findByExam', options);
  }

  public findByQuestion(question: Question): Observable<ExamQuestion[]> {
    const options: any = {
      params: [
        {
          key: 'question',
          value: question
        }
      ]
    };
    return this.search('findByQuestion', options);
  }
}
