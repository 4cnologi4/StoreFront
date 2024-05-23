import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProtectedComponent } from './components/protected/protected.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClienteComponent } from './components/cliente/cliente.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'protected-route', component: ProtectedComponent, canActivate: [AuthGuard] },
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'clients', component: ClienteComponent }
            // Agrega más rutas de ser necesario
        ]
    },
    { path: '**', redirectTo: 'login' },
];

export default routes;
