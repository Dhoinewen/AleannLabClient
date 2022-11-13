import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models/users";
import {UsersService} from "../../services/users.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {IRanks} from "../../models/ranks";
import {RanksService} from "../../services/ranks.service";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  newRank: FormControl
  newName: FormControl

  ranks$: Observable<IRanks[]>

  userID: number
  user: IUser
  loading = true

  ranksDetail: IRanks

  private routeSub: Subscription;

  constructor(private usersService: UsersService, private ranksService: RanksService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.newRank = new FormControl()
    this.newName = new FormControl()

    this.ranks$ = this.ranksService.getRanks()

    this.routeSub = this.route.params.subscribe(params => {
      this.userID = params['id']
    });
    this.usersService.getUser(this.userID).subscribe(user => {
      this.user = user
      this.loading = false
    })

    this.ranks$.subscribe(data => {
      let rankDetail = data.find(item => item.id == this.user.rank)
      if (rankDetail != undefined) {
        this.ranksDetail = rankDetail
      }
    })
    this.newRank.valueChanges.subscribe(change => console.log(change))
  }

  deleteUser(): void {
    this.usersService.deleteUser(this.userID).subscribe()
  }

  changeQueue(): void {
    this.usersService.changeRank(this.userID, this.newRank.value.id, this.user.name)
  }

  changeName(): void {
    this.usersService.changeRank(this.userID, this.user.rank, this.newName.value)
  }

}
