import { Injectable } from '@angular/core';
import{ ApiServiceService} from'./../Common/api-service.service'
@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {

  constructor(private apiService:ApiServiceService) { }
  public Upload(obj: object):any{
    const url = '/File/uploadFile';
    return this.apiService.PostMethodWithTokenHeader(url,obj)

  }
}
