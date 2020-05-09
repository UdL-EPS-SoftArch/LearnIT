import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Question} from './question';
import {Observable} from 'rxjs';

@Injectable()
export class QuestionService extends RestService<Question>{

  constructor(injector: Injector) {
    super(Question, 'questions', injector);
  }

  public findByStatementContaining(text: string): Observable<Question[]> {
    const options: any = {
      params: [
        {
          key: 'text',
          value: text
        }
      ]
    };
    return this.search('findByStatementContaining', options);
  }
  /*
  public findQuestionByLevelId(id: number): Observable<Question[]> {
    const options: any = {
      params: [
        {
          key: 'examId',
          value: id
        }
      ]
    };
    return this.search('findQuestionByLevelId', options);
  }
  */
}
