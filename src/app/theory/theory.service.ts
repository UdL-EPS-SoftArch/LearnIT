import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Theory} from './theory';
import {Observable} from 'rxjs';

@Injectable()
export class TheoryService extends RestService<Theory>{

  constructor(injector: Injector) {
    super(Theory, 'theories', injector);
  }

  public findByStatementContaining(text: string): Observable<Theory[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByStatementContaining', options);
  }
}
