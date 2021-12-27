import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ClassroomComponent } from './classroom/classroom.component';
import { SubjectComponent } from './subject/subject.component';
import { MarkComponent } from './mark/mark.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ClazzComponent } from './clazz/clazz.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleGroupComponent } from './schedule-group/schedule-group.component';
import { ScheduleTeacherComponent } from './schedule-teacher/schedule-teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    LoginComponent,
    ClassroomComponent,
    SubjectComponent,
    MarkComponent,
    UserComponent,
    UserProfileComponent,
    ClazzComponent,
    ScheduleComponent,
    ScheduleGroupComponent,
    ScheduleTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
