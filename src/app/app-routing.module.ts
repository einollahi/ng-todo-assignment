import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { TodoComponent } from './page/components/todo/todo.component';

const routes: Routes = [
  {path: '', component: NavComponent, children: [
    {path: '', component: TodoComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
