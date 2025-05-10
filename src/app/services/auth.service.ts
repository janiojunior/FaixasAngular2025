import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseURL: string = 'http://localhost:8080/auth';
  private tokenKey = 'jwt_token';
  private usuarioLogadoKey = 'usuario_logado';
  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient, 
              private localStorageService: LocalStorageService, 
              private jwtHelper: JwtHelperService) {

    this.initUsuarioLogado();

  }

  private initUsuarioLogado() {

  }


  // loginADM(login: string, senha: string): Observable<any> {

  // }

  setUsuarioLogado(usuario: Usuario): void {
  }

  setToken(token: string): void {
  }

  getUsuarioLogado() {
  }

  getToken(): string | null {
    return null;
  }

  removeToken(): void {
  }

  removeUsuarioLogado(): void {
  }

  isTokenExpired(): boolean {
    return false;
  }

}