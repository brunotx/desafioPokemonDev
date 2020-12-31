import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { noop } from 'rxjs';
import { PokemonModel } from 'src/app/model/pokemonModel';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.css']
})
export class EvolutionsComponent implements OnInit {

  pokemon: PokemonModel;
  evolutionList = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params !== undefined) {
        this.pokemon = JSON.parse(params.queryParams || null);
          this.evolutionList = this.pokemon !== null  && this.pokemon !== undefined ? this.pokemon.evolutuion : [];
      }
    }, noop, noop);
  }
}
