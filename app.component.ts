import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';



const starterPokemon = [ "bulbasaur", "squirtle", "charmander" ];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  baseurl: string = 'https://pokeapi.co/api/v2/pokemon/';
  
  public pokemons$!: Observable<any[]>;

  constructor(private http: HttpClient) { }
  

  getPokemon(name: string) {
    return this.http.get(this.baseurl + name);
  } 

  ngOnInit() {
    this.pokemons$ = forkJoin (
      Object.values(starterPokemon).map(name => 
        this.getPokemon(name)
      )
    )
  }

}
