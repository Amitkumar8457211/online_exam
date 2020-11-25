import { NgModule } from '@angular/core';
import { Routes, RouterModule , CanActivate } from '@angular/router';
import { AuthguardGuard } from './guard/authguard.guard';
import { ExamlistComponent } from './components/examlist/examlist.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ExamComponent } from './components/exam/exam.component';



const routes: Routes = [

  { path: 'login',component: LoginComponent },

  { path: 'home',component: ExamlistComponent,canActivate: [AuthguardGuard]  },

  { path: 'exam',component: ExamComponent ,canActivate: [AuthguardGuard] },

  { path: '',redirectTo: '/login',pathMatch: 'full'},

//  { path: '**', redirectTo: 'home' },

  { path: '**',component: PagenotfoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
