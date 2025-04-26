import { Component, OnInit, signal } from '@angular/core';
import { Faixa } from '../../../models/faixa.model';
import { FaixaService } from '../../../services/faixa.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';

type Card = {
  title: string;
  modalidade: string;
  preco: number;
  imageUrl: string;
}

@Component({
  selector: 'app-faixa-card-list',
  imports: [MatCardModule, NgFor, MatButton],
  templateUrl: './faixa-card-list.component.html',
  styleUrl: './faixa-card-list.component.css'
})
export class FaixaCardListComponent implements OnInit {

  faixa: Faixa[] = [];
  cards = signal<Card[]>([]);

  constructor(private faixaService: FaixaService) {

  }
  ngOnInit(): void {
    this.carregarFaixas();
  }

  carregarFaixas() {
    this.faixaService.findAll(0, 10).subscribe(data => {
      this.faixa = data;
      this.carregarCards();
    })
  }
  carregarCards() {
    const cards: Card[] = [];
    this.faixa.forEach(faixa => {
      cards.push({
        title: faixa.nome,
        modalidade: faixa.modalidade.label,
        preco: faixa.preco,
        imageUrl: this.faixaService.getUrlImage(faixa.nomeImagem)
      })
    })
    this.cards.set(cards);
  }

}
