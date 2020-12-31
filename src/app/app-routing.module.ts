import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { PokemonService } from './services/pokemon.service';


const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: '', loadChildren: './screens/pokemon/pokemon.module#PokemonModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
