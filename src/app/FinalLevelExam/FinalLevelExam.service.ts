
import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Exam} from './Exam';
import {Observable} from 'rxjs';

@Injectable()
export class FinalLevelExamService extends RestService<Exam>{

  constructor(injector: Injector) {
    super(FinalLevelExam, 'FinalLevelExams', injector);
  }

  public findById(id: number): Observable<FinalLevelExam[]> {
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
}
