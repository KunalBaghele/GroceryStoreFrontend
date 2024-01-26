import { TestBed } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when currentUser is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someValue'); // Mocking localStorage.getItem

    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(canActivate).toBe(true);
  });

  it('should navigate to "" (login page) when currentUser is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Mocking localStorage.getItem

    guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
