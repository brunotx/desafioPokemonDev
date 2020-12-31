import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonComponent } from './pokemon.component';
import { AboutComponent } from './about/about.component';
import { StatsComponent } from './stats/stats.component';
import { EvolutionsComponent } from './evolutions/evolutions.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [

    { path: '', redirectTo: 'about', pathMatch: 'full' },
    { path: 'about/:id', component: AboutComponent, outlet: 'modal' },
    { path: 'stats/:id', component: StatsComponent, outlet: 'modal' },
    { path: 'evolutions/:id', component: EvolutionsComponent, outlet: 'modal' }
    
];

@NgModule({
    declarations: [
        PokemonComponent,
        AboutComponent,
        StatsComponent,
        EvolutionsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    providers: [],
    bootstrap: []
})
export class PokemonModule { }
