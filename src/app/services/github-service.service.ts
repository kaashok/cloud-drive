import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { AppConstant } from '../constants/app.constants';
import { AccessTokenDto } from '../core/dto/auth-model';
import { Observable } from 'rxjs';
import { StorageService } from './storage-services.service';

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {
  private apiUrl = 'https://api.github.com/repos';
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  getAuthURL() {
    return this.httpClient.get(AppConstant.baseURL + '/AuthPage');
  }

  getAccessToken(code: string): Observable<AccessTokenDto> {
    return this.httpClient.post<AccessTokenDto>(AppConstant.baseURL + '/getAccessToken', { code: code });
  }

  getRepoContent(owner: string, repo: string, path: string, accessToken: string) {
    const url = `${this.apiUrl}/${owner}/${repo}/contents/${path}`;   
    const headers = new HttpHeaders().set('Authorization', `token ${accessToken}`).set('Accept', "application/vnd.github.v3.raw");
    return this.httpClient.get(url, { headers });
  }  

}
