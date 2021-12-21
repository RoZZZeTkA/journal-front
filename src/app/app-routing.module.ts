import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClazzComponent } from './clazz/clazz.component';
import { GroupComponent } from './group/group.component';
import { LoginComponent } from './login/login.component';
import { MarkComponent } from './mark/mark.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SubjectComponent } from './subject/subject.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'group/add', component:GroupComponent},
  {path: 'room/add', component:ClassroomComponent},
  {path: 'subject/add', component:SubjectComponent},
  {path: 'mark/add', component:MarkComponent},
  {path: 'user/add', component:UserComponent},
  {path: 'class/add', component:ClazzComponent},
  {path: 'user/id/:id', component:UserProfileComponent},
  {path: 'schedule/:id', component:ScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
