
import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {FinalLevelExam} from './FinalLevelExam';
import {Observable} from 'rxjs';

@Injectable()
export class ExamService extends RestService<Exam>{

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
