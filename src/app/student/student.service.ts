import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Student} from './student';
import {Observable} from 'rxjs';

@Injectable()
export class StudentService extends RestService<Student>{

  constructor(injector: Injector) {
    super(Student, 'students', injector);
  }

  public findByUsernameContaining(text: string): Observable<Student[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByUsernameContaining', options);
  }
}
