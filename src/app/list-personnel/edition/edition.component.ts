import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Music} from "../../model/Music";
import {ListMusiqueService} from "../../partage/service/list-musique.service";

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {

  musique: Music;

  /**
   * Component constructor
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly listMusiqueService: ListMusiqueService
  ) {
    this.musique = {};
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.route.data.subscribe(( musique: any) => (this.musique = musique.musique));
  }

  submit(musique: any) {
    this.listMusiqueService.update(musique).subscribe(() => {
      this.router.navigate(['/listMusique']).then(r => null);
    });
  }

  cancel() {
    this.router.navigate(['/listMusique']).then(r => null);
  }

}
