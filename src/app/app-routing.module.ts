import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ListPersonnelComponent } from './list-personnel/list-personnel.component';
import { SuggestionsComponent} from "./suggestions/suggestions.component";

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'listMusique', component: ListPersonnelComponent },
  { path: 'suggestions', component: SuggestionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
