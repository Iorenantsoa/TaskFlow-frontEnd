import { Routes } from '@angular/router'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginGuard } from './guards/login.guards';
import { LogoutGuard } from './guards/Logout.guard';
import { BoardComponent } from './components/boards/board/board.component';
import { RecentComponent } from './components/boards/recent/recent.component';
import { FavorisComponent } from './components/boards/favoris/favoris.component';
import { WorkingBoardComponent } from './components/boards/working-board/working-board.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: "Login" , canActivate :[LogoutGuard]},
    { path: 'registration', component: RegisterComponent, title: "Register"  , canActivate :[LogoutGuard]},
    { path: '', redirectTo: "dashboard", pathMatch: 'full' ,  },
    { path: 'dashboard', component: DashboardComponent, title: "Tableux de bord" ,canActivate : [LoginGuard]},
    { path: 'boards', component: BoardComponent, title: "Tableaux", canActivate : [LoginGuard] },
    { path: 'working-board/:id', component: WorkingBoardComponent, title: "Working board",  canActivate : [LoginGuard] },
    { path: 'recent-project', component: RecentComponent, title: "Recent" , canActivate : [LoginGuard]},
    { path: 'favoris-project', component: FavorisComponent, title: "Favoris", canActivate : [LoginGuard] },
    { path: '**', component: PageNotFoundComponent, title: "404 page" },
];
