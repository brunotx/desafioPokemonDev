import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { noop, Subscription } from 'rxjs';
import { PokemonModel } from 'src/app/model/pokemonModel';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.css']
})
export class EvolutionsComponent implements OnInit, OnDestroy {

  pokemon: PokemonModel;
  evolutionList = [];
  unsubscribe_: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    if (this.unsubscribe_ !== undefined) { this.unsubscribe_.unsubscribe(); }
  }

  ngOnInit(): void {
    this.unsubscribe_ = this.route.params.subscribe(params => {
      if (params !== undefined) {
        this.pokemon = JSON.parse(params.queryParams || null);
          this.evolutionList = this.pokemon !== null  && this.pokemon !== undefined ? this.pokemon.evolutuion : [];
      }
    }, noop, noop);
  }
}
