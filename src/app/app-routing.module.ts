import { NgModule } from '@angular/core';;
import { Routes, RouterModule} from "@angular/router";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {UserComponent} from "./components/user/user.component";
import {RanksListComponent} from "./components/ranks-list/ranks-list.component";
import {RankComponent} from "./components/rank/rank.component";


const routes: Routes = [
  {path: '', redirectTo: '/api/v1/users', pathMatch: 'full'},
  {path: 'api/v1/users', component: UsersListComponent},
  {path: 'api/v1/users/:id', component: UserComponent},
  {path: 'api/v1/ranks', component: RanksListComponent},
  {path: 'api/v1/ranks/:id', component: RankComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
