
import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Exam} from '../exam/exam';
import {FinalLevelExam} from './FinalLevelExam';
import {Observable} from 'rxjs';

@Injectable()
export class FinalLevelExamService extends RestService<FinalLevelExam>{

  constructor(injector: Injector) {
    super(FinalLevelExam, 'FinalLevelExams', injector);
  }

  public findFinalById(id: number): Observable<FinalLevelExam[]> {
    const options: any = {
      params: [
        {
          key: 'id',
          value: id
        }
      ]
    };
    return this.search('findFinalById', options);
  }
}
