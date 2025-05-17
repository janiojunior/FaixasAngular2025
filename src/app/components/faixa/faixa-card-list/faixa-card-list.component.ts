import { Component, OnInit, signal } from '@angular/core';
import { Faixa } from '../../../models/faixa.model';
import { FaixaService } from '../../../services/faixa.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarrinhoService } from '../../../services/carrinho.service';

type Card = {
  idFaixa: number;
  titulo: string;
  modalidade: string;
  preco: number;
  imagemUrl: string;
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

  constructor(private faixaService: FaixaService,
              private snackBar: MatSnackBar,
              private carrinhoService: CarrinhoService
  ) {

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
        idFaixa: faixa.id,
        titulo: faixa.nome,
        modalidade: faixa.modalidade.label,
        preco: faixa.preco,
        imagemUrl: this.faixaService.getUrlImage(faixa.nomeImagem)
      })
    })
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card){
    this.showSnackbarTopPosition('O Produto ('+ card.titulo + ') foi adicionado ao carrinho.');
    this.carrinhoService.adicionar({
      id: card.idFaixa,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1
    });
   
  }

  showSnackbarTopPosition(content: any) {
    this.snackBar.open(content, 'fechar', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

}
