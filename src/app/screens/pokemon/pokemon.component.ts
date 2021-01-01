import { Component, OnDestroy, OnInit } from '@angular/core';
import { noop, zip, concat, Subscription } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { PokemonModel, TYPE_COLOURS } from 'src/app/model/pokemonModel';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, OnDestroy {

  pokemonId: number;
  pokemon: PokemonModel;
  unsubscribe_: Subscription;


  constructor(private pokemonService: PokemonService) { }

  ngOnDestroy(): void {
    if (this.unsubscribe_ !== undefined) { this.unsubscribe_.unsubscribe(); }
  }

  ngOnInit(): void {

    if (this.pokemonId !== undefined && this.pokemonId !== null) {
      const info$ = this.pokemonService.getInfoPokemon(this.pokemonId);
      const species$ = this.pokemonService.getSpeciesPokemon(this.pokemonId);
      this.unsubscribe_ = species$.pipe(
        switchMap(species => {
          const evolution$ = this.pokemonService.getEvolutionsPokemon(species.evolution_chain.url);
          const concat$ = zip(info$, species$, evolution$)
          return concat$;
        }),
      ).subscribe(
        ([info, species, evolution]) => {
          this.pokemon = {
            id: info.id,
            name: info.name,
            base_experience: info.base_experience,
            weight: info.weight,
            height: info.height,
            abilities: info.abilities,
            status: info.stats,
            type: info.types,
            evolutuion: evolution.chain.evolves_to,
            colorType: TYPE_COLOURS[info.types[0].type.name]
          }
          this.getEvolution();
        }
      )
    }
  }



  getEvolution() {
    let evolutionList = [];
    this.pokemon.evolutuion.forEach(element => {
      const arr = element.species.url.split('/')
      evolutionList.push({ name: element.species.name, id: arr[arr.length - 2] });
      if (element.evolves_to.length > 0) {
        element.evolves_to.forEach(element => {
          const arr = element.species.url.split('/')
        evolutionList.push({ name: element.species.name, id: arr[arr.length - 2] });
        });
      }
    });

    const index = evolutionList.map(x => x.name).indexOf(this.pokemon.name);
    if (index !== -1) {
      evolutionList.splice(index, 1);
    }
    const findEndEvolution = evolutionList.filter(x=> this.pokemon.id > x.id);
    if (findEndEvolution.length > 0) {
      evolutionList = [];
    }

    this.pokemon = {...this.pokemon, evolutuion: evolutionList};
    localStorage.setItem('currenctPokemon', JSON.stringify(this.pokemon));
  }

}
