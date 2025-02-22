import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private baseUrl: string = 'http://localhost:8080/estados';

  constructor(private httpClient: HttpClient) { 
  }

  getEstados(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(this.baseUrl);
  }
}
