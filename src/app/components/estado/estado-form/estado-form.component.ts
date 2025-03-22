import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoService } from '../../../services/estado.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Estado } from '../../../models/estado.model';


@Component({
  selector: 'app-estado-form',
  imports: [RouterLink, NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule],
  templateUrl: './estado-form.component.html',
  styleUrl: './estado-form.component.css'
})
export class EstadoFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const estado: Estado = this.activatedRoute.snapshot.data['estado'];

    this.formGroup = this.formBuilder.group({
      id: [(estado && estado.id) ? estado.id : null],
      nome: [(estado && estado.nome) ? estado.nome : '', Validators.required],
      sigla: [(estado && estado.sigla) ? estado.sigla : '', Validators.required],
    })

  }

  salvar() {
    if (this.formGroup.valid) {
      const estado = this.formGroup.value;

      if(estado.id == null) {
        this.estadoService.insert(estado).subscribe({
          next: (estadoCadastrado) => {
            this.router.navigateByUrl('/estados');
          },
          error: (errorResponse) => {
            console.log('Erro ao gravar' + JSON.stringify(errorResponse));
          }
        })
      } else {
        this.estadoService.update(estado).subscribe({
          next: () => {
            this.router.navigateByUrl('/estados');
          },
          error: (errorResponse) => {
            console.log('Erro ao gravar' + JSON.stringify(errorResponse));
          }
        })
      }
    }
  }
  excluir() {
    const estado = this.formGroup.value;
    if(estado.id != null) {
      this.estadoService.delete(estado).subscribe({
        next: () => {
          this.router.navigateByUrl('/estados');
        },
        error: (errorResponse) => {
          console.log('Erro ao excluir' + JSON.stringify(errorResponse));
        }
      })
    }
  }

}
