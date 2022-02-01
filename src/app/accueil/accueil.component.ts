import {Component, OnInit} from '@angular/core';
import {ListMusiqueService} from "../partage/service/list-musique.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  nbMusique: number = 0;

  constructor(private readonly listMusiqueService: ListMusiqueService) {}

  ngOnInit(): void {
    this.listMusiqueService.fetch().subscribe(musique => {
      this.nbMusique = musique.length;
    });
  }

}
