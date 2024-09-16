import { Routes } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {path:'' , redirectTo:'timeline' ,  pathMatch:'full'},

  {path:'timeline' , component:TimelineComponent , title:'timeline'},
  {path:'login' , component:LoginComponent , title:'login'},
  {path:'register' , component:RegisterComponent , title:'register'},

];
