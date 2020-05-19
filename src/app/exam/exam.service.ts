
import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Exam} from './exam';
import {Observable} from 'rxjs';

@Injectable()
export class ExamService extends RestService<Exam>{

  constructor(injector: Injector) {
    super(Exam, 'exams', injector);
  }

  public findById(id: number): Observable<Exam[]> {
    const options: any = {
      params: [
        {
          key: 'id',
          value: id
        }
      ]
    };
    return this.search('findById', options);
  }
  /*
  public findByStatementContaining(text: string): Observable<Exam[]> {
    const options: any = {
      params: [
        {
          key: 'name',
          value: text
        }
      ]
    };
    return this.search('findByStatementContaining', options);
  }
  */
}
