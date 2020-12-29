import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pokemonList = [];
  nextPage: string;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemon().toPromise().then(
      (data) => {
        this.pokemonInfo(data);
      }
    )
  }


  public scrollPage() {
    this.pokemonService.getNextPagePokemon(this.nextPage).toPromise().then(
      (data) => {
        this.pokemonInfo(data);
      }
    )
  }

  private pokemonInfo(data) {
    this.nextPage = data.next;
    for (let i = 0; i < data.results.length; i++) {
      const element = data.results[i];
      const urlSplit = element.url.split('/');
      const id = urlSplit[urlSplit.length - 2];
      const model = {
        id: id,
        name: element.name
      };
      this.pokemonList.push(model);
    }
  }


}
