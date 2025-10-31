import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Auth } from './auth';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from 'rxjs';
import { TokenResponse } from './authInterface';

let isRefreshing$ = new BehaviorSubject<Boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.token || authService.cookieService.get('token');
  if (!token) return next(req);

  if (!isRefreshing$.value) {
    return refreshAndProcced(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return refreshAndProcced(authService, req, next);
      }

      return throwError(error);
    })
  );
};

const refreshAndProcced = (authService: Auth, req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);
    return authService.refreshAuthToken().pipe(
      switchMap((res: any) => {
        return next(addToken(req, res.access_token)).pipe(tap(() => isRefreshing$.next(false)));
      })
    );
  }

  if (req.url.includes('refresh')) return next(addToken(req, authService.token!));

  return isRefreshing$.pipe(
    filter((isRefreshing$) => !isRefreshing$),
    switchMap((res) => {
      return next(addToken(req, authService.token!));
    })
  );
  // return next(addToken(req, authService.token!));
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return (req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }));
};
