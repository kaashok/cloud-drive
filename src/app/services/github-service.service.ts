import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { AppConstant } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {

  constructor(private httpClient: HttpClient) { }

  getAuthURL() {
    return this.httpClient.get(AppConstant.baseURL + '/AuthPage');
  }

  getAccessToken(code: string) {
    return this.httpClient.post(AppConstant.baseURL + '/getAccessToken', { code: code });
  }
}
