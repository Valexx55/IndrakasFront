import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './componentes/alumno/alumno.component';

const routes: Routes = [
  {path:"alumnos", component: AlumnoComponent}
];

//TODO linkar el componente con el menú de appcomponent.html
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
