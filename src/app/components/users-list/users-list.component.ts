import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {IUser} from "../../models/users";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {IRanks} from "../../models/ranks";
import {RanksService} from "../../services/ranks.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  ranks$: Observable<IRanks[]>
  ranks: IRanks[]

  users$: Observable<IUser[]>

  sortType: FormControl

  newUserData  = new FormGroup({
    name: new FormControl(),
    rankID: new FormControl()
  })

  constructor(private usersService: UsersService, private ranksService: RanksService) { }

  ngOnInit(): void {

    this.sortType = new FormControl('')

    this.users$ = this.usersService.getUsers(this.sortType.value)
    this.ranks$ = this.ranksService.getRanks()

    this.ranks$.subscribe(data => {
      this.ranks = data
    })
    this.newUserData.valueChanges.subscribe(data => console.log(data))

    this.sortType.valueChanges.subscribe(data => {
      this.users$ = this.usersService.getUsers(data)
    })
  }

  addNewUser(): void {
    this.usersService.createUser(this.newUserData.value.name, this.newUserData.value.rankID)
    this.ngOnInit()
  }

  getQuery(rankID: number): number  {
    let queue = this.ranks.find(item => item.id == rankID)
    if (queue != undefined) {
      return queue.queue
    } else return 10

  }
}
