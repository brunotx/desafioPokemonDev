import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { noop } from 'rxjs';
import { PokemonModel } from 'src/app/model/pokemonModel';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  pokemon: PokemonModel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params !== undefined) {
        this.pokemon = JSON.parse(params.queryParams || null)
      }
    }, noop, noop);
  }

}
