import { Injectable } from '@angular/core';
import { ApiServiceService } from '../Common/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private apiService: ApiServiceService) {}
  public GetAllStore(): any {
    const url = '/master/stores/getAll';
    return this.apiService.GetMothod(url);
  }
  public Save(obj: object): any {
    const url = '/master/stores/Save';
    return this.apiService.PostMethodWithTokenHeader(url, obj);
  }
  public Delete(id: string): any {
    const url = '/master/stores/delete/' + id;
    return this.apiService.DeleteMethodWithTokenHeader(url);
  }
}
