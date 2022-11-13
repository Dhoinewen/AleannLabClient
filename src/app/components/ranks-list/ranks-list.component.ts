import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IRanks} from "../../models/ranks";
import {RanksService} from "../../services/ranks.service";

@Component({
  selector: 'app-ranks-list',
  templateUrl: './ranks-list.component.html',
  styleUrls: ['./ranks-list.component.css']
})
export class RanksListComponent implements OnInit {

  ranks$: Observable<IRanks[]>

  constructor( private ranksService: RanksService) { }

  ngOnInit(): void {

    this.ranks$ = this.ranksService.getRanks()
  }

}
