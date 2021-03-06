import { Component, OnInit } from '@angular/core';
import { Person } from '../model/Person';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { mergeMap } from 'rxjs';
import { AjoutPopupComponent } from './ajout-popup/ajout-popup.component';
import { ListMusiqueService } from '../partage/service/list-musique.service';
import { Music } from '../model/Music';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-list-personnel',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.scss'],
})
export class ListPersonnelComponent implements OnInit {
  musique: Music[] = [];
  view: string = 'card';
  dialogStatus: string = 'inactive';
  private addDialog: MatDialogRef<AjoutPopupComponent> | any;
  public dataSource = new MatTableDataSource<Music>();
  displayedColumns: string[] = [
    'image',

    'titre',
    'artiste',
    'album',
    'duration',
    'date',
    'edit',
    'delete',
  ];

  constructor(
    private readonly listMusiqueService: ListMusiqueService,
    public dialog: MatDialog
  ) {
    //Rien à faire ici
  }

  ngOnInit(): void {
    this.listMusiqueService.fetch().subscribe((musique) => {
      this.musique = musique || [];
    });
    //Probleme asyncrone
    //this.dataSource = new MatTableDataSource(this.musique);
  }

  delete(music: Music) {
    this.listMusiqueService.delete(music.id!).subscribe((musique) => {
      this.musique = musique;
    });
    window.location.reload();
  }

  switchView() {
    this.dataSource = new MatTableDataSource(this.musique);

    if (this.view === 'card') {
      this.view = 'list';
    } else {
      this.view = 'card';
    }
  }

  add(musique: Music) {
    this.listMusiqueService
      .create(musique)
      .pipe(mergeMap(() => this.listMusiqueService.fetch()))
      .subscribe((musique) => {
        this.musique = musique;
        this.hideDialog();
      });
    window.location.reload();
  }

  update(musique: Music) {
    this.listMusiqueService
      .update(musique)
      .pipe(mergeMap(() => this.listMusiqueService.fetch()))
      .subscribe((musique) => {
        this.musique = musique;
        this.hideDialog();
      });
    window.location.reload();
  }

  showDialog() {
    debugger;
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AjoutPopupComponent, {
      width: '600px',
      data: {},
    });

    this.addDialog.afterClosed().subscribe((person: any) => {
      this.dialogStatus = 'inactive';
      if (person) {
        this.add(person);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if (this.addDialog != undefined) {
      this.addDialog.close();
    }
  }
}
