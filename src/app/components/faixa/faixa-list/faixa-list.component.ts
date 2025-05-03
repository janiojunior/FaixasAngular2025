import { Component, OnInit } from '@angular/core';
import { Faixa } from '../../../models/faixa.model';
import { FaixaService } from '../../../services/faixa.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-faixa-list',
  standalone: true,
  imports: [MatPaginatorModule, NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './faixa-list.component.html',
  styleUrl: './faixa-list.component.css'
})
export class FaixaListComponent implements OnInit {
  faixas: Faixa[] = [];
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'acao'];

  // variaveis de controle para a paginacao
  totalRecords = 0;
  pageSize = 10;
  page = 0;


  constructor(private faixaService: FaixaService) {

  }

  ngOnInit(): void {
    this.faixaService.findAll(this.page, this.pageSize).subscribe(
      data => { this.faixas = data }
    );

    this.faixaService.count().subscribe(
      data => { this.totalRecords = data }
    );

  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

}