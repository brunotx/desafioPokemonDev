import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      this.pokemon = JSON.parse(params.queryParams);
      this.evolutionList = this.pokemon.evolutuion;
    });
  }
}
