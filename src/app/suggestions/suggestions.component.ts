import { Component, OnInit } from '@angular/core';
import { ListMusiqueService } from "../partage/service/list-musique.service";
import { Music } from "../model/Music";

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent {

  musique : Music = {};

  constructor(private readonly listMusiqueService: ListMusiqueService) {
    this.random();
  }

  random() {
    this.listMusiqueService.fetchRandom().subscribe(musique => {
      this.musique = musique;
    });
  }

}
