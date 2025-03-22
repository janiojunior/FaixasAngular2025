import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Estado } from '../../models/estado.model';
import { inject } from '@angular/core';
import { EstadoService } from '../../services/estado.service';

export const estadoResolver: ResolveFn<Estado> = 
    (route : ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      
      return inject(EstadoService).findById(route.paramMap.get('id')!);
    
};
