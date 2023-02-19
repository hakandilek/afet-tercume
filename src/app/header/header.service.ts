import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, Subject } from 'rxjs';
import { HeaderState } from './header-state';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerState$ = new BehaviorSubject<HeaderState>({
    template: HeaderTemplate.empty,
    data: ''
  });
  public getHeaderState(): Observable<HeaderState> {
    return this.headerState$.asObservable().pipe(shareReplay(1));
  }
  public getHeaderStateSubject(): Subject<HeaderState> {
    return this.headerState$;
  }
  public setHeaderState(headerState: HeaderState): void {
    this.headerState$.next({...headerState});
  }
}

export enum HeaderTemplate {
  empty,
  search,
  languageSelection,
  settings
}
