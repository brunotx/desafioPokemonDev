import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  public getPokemon(): Observable<any> {
    return this.http.get<any>(environment.pokemonAPI + 'pokemon');
  }

  public getNextPagePokemon(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  public getEvolutionsPokemon(url: string): Observable<any> {
    return this.http.get<any>(url);
}

public getSpeciesPokemon(id): Observable<any> {
  return this.http.get<any>(environment.pokemonAPI + `pokemon-species/${id}/`);
}

public getInfoPokemon(id): Observable<any> {
  return this.http.get<any>(environment.pokemonAPI + `pokemon/${id}/`);
}


}
