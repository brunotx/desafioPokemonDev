import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  pokemonList = [];
  nextPage: string;
  modalRef: BsModalRef;
  findPokemon: string;
  notFound: boolean = false;
  errorMessage: string;
  loading: boolean = false;
  unsubscribe_: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private modalService: BsModalService
  ) { }


  ngOnDestroy(): void {
    if (this.unsubscribe_ !== undefined) { this.unsubscribe_.unsubscribe(); }
  }

  ngOnInit(): void {
    this.getAllPokemons();
  }


  public getAllPokemons() {
    this.pokemonService.getAllPokemon().toPromise().then(
      (data) => {
        this.pokemonInfo(data);
      }
    );
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
    this.notFound = false;
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

  public openModal(id: number) {
    this.modalRef = this.modalService.show(PokemonComponent, {
      initialState: { pokemonId: id },
      class: 'modal-dialog-centered, modal-lg',
      keyboard: false,
      animated: true,
    });
  }


  public searchPokemon() {
    this.pokemonList = [];

    if (this.findPokemon === '' || this.findPokemon === undefined ) {
      this.getAllPokemons();
      return;
    }

    this.loading = true;
    this.unsubscribe_ = this.pokemonService.getInfoPokemon(this.findPokemon).subscribe(
      (data) => {
        const model = {
          id: data.id,
          name: data.name
        }
        this.loading = false;
        this.notFound = false;
        this.pokemonList.push(model);
      },
      (err) => {
        this.loading = false;
        this.errorMessage = err.error;
        this.notFound = true;
      }
    )
  }
}
