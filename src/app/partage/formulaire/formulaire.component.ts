import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Music} from "../../model/Music";

@Component({
  selector: 'formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {

  form: FormGroup;
  @Input() musiqueModel: Music;

  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<any>;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
    this.form = FormulaireComponent.buildForm();
    this.musiqueModel = {
      styles: []
    };
  }

  ngOnInit() {
    debugger;
    this.form.patchValue({
      id: this.musiqueModel.id,
      title: this.musiqueModel.title,
      description: this.musiqueModel.description,
      album: this.musiqueModel.album,
      artist: this.musiqueModel.artist,
      duration: this.musiqueModel.duration,
      date: this.musiqueModel.date,
      styles: this.musiqueModel.styles || [],
      picture: this.musiqueModel.picture,
    });
  }

  cancel() {
    this.cancelEvent$.emit();
  }

  submit(musique: Music) { //Formulaire
    musique.picture = this.musiqueModel.picture;
    this.submitEvent$.emit(musique);
  }


  addChipset(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      //this.musiqueModel.title!.push(value);
    }
    event.chipInput!.clear();
  }

  removeChipset(titre: any): void {
    //const index = this.musiqueModel.titres!.indexOf(titre);
    //this.musiqueModel.titres!.splice(index, 1);
  }

  onFileSelected(event:Event | null) {
    const files = (<HTMLInputElement>event?.currentTarget).files;
    const file:File | null = files!.item(0);

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        //this.musiqueModel.picture = reader.result;
      }
    }
  }

  /**
   * Fonction pour construire notre formulaire
   * @returns {FormGroup}
   *
   * @private
   */
  private static buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.minLength(10)),
      album: new FormControl('', Validators.required),
      artist: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      duration: new FormControl(''),
      date: new FormControl('', Validators.pattern('^(0[1-9]|[12][0-9]|3[01])$\-(0[1-9]|1[012])\-\d{4}')),
      styles: new FormControl(''),
      picture: new FormControl(''),
    });
  }
}
