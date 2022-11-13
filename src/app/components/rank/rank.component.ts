import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RanksService} from "../../services/ranks.service";
import {IRanks} from "../../models/ranks";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  newName: FormControl
  newQueue: FormControl
  rankID: number
  rank: IRanks
  loading = true

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private ranksService: RanksService) {
  }

  ngOnInit(): void {

    this.newName = new FormControl
    this.newQueue = new FormControl

    this.routeSub = this.route.params.subscribe(params => {
      this.rankID = params['id']
    });

    this.ranksService.getRank(this.rankID).subscribe(rank => {
      this.rank = rank
      this.loading = false
    })
  }

  changeName(): void {
    this.ranksService.changeName(this.rankID, this.newName.value, this.newQueue.value)
  }

}
