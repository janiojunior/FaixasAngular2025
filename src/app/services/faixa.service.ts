import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faixa } from '../models/faixa.model';
import { Modalidade } from '../models/modalidade.model';

@Injectable({
  providedIn: 'root'
})
export class FaixaService {
  private baseUrl: string = 'http://localhost:8080/faixas';

  constructor(private httpClient: HttpClient) { 
  }

  findAll(page?:number, pageSize?:number): Observable<Faixa[]> {
    let params={};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        page_size: pageSize.toString()
      }
    }

    console.log(this.baseUrl);
    console.log({params});

    return this.httpClient.get<Faixa[]>(this.baseUrl, {params});

  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Faixa> {
    return this.httpClient.get<Faixa>(`${this.baseUrl}/${id}`);
  }

  insert(faixa: Faixa): Observable<Faixa> {
    const obj = {
      id: faixa.id,
      nome: faixa.nome,
      descricao: faixa.descricao,
      preco: faixa.preco,
      estoque: faixa.estoque,
      nomeImagem: faixa.nomeImagem,
      idModalidade: faixa.modalidade.id
    }

    return this.httpClient.post<Faixa>(this.baseUrl, obj);
  }

  update(faixa: Faixa): Observable<any> {
    const obj = {
      id: faixa.id,
      nome: faixa.nome,
      descricao: faixa.descricao,
      preco: faixa.preco,
      estoque: faixa.estoque,
      nomeImagem: faixa.nomeImagem,
      idModalidade: faixa.modalidade.id
    }
    return this.httpClient.put<Faixa>(`${this.baseUrl}/${obj.id}`, obj);
  }

  delete(faixa: Faixa): Observable<any> {
    return this.httpClient.delete<Faixa>(`${this.baseUrl}/${faixa.id}`);
  }

  getUrlImage(nomeImagem: string): string {
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

  uploadImage(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);
    
    return this.httpClient.patch<Faixa>(`${this.baseUrl}/image/upload`, formData);
  }

  findModalidades(): Observable<Modalidade[]> {
    return this.httpClient.get<Modalidade[]>(`${this.baseUrl}/modalidades`);
  }


}
