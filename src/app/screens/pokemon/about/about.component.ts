import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonModel } from 'src/app/model/pokemonModel';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  pokemon: PokemonModel;

  constructor() { }

  ngOnInit(): void {
    this.pokemon = JSON.parse(localStorage.getItem('currenctPokemon'));
  }

}
