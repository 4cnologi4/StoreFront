import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProtectedComponent } from './components/protected/protected.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'protected-route', component: ProtectedComponent, canActivate: [AuthGuard] }
];

export default routes;
