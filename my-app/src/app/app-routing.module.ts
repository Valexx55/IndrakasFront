import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DniComponent } from './componentes/dni/dni.component';
import { ImcComponent } from './componentes/imc/imc.component';

const routes: Routes = [
  {path:'', component: DniComponent},
  {path:'dni', component: DniComponent},
  {path:'imc', component: ImcComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
