import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { PreviewComponent } from '../app/preview/preview.component';
import { EditComponent } from '../app/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/preview', pathMatch: 'full' },
  { path: 'preview', component: PreviewComponent },
  { path: 'edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
