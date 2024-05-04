import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/core';
import { StorageService } from './storage-services.service';
import { RepositoryContentDto } from '../core/dto/octokit.response.model';


@Injectable({
  providedIn: 'root'
})
export class OctokitService {

  private octokit: Octokit | null;
  constructor(private storageService: StorageService) {
    this.octokit = null;
  }

  async getAllPrivateRepos() {
    return await this.handleOctoKitRequest('GET /user/repos', { visibility: 'private' });
  }

  async getRepoContents(owner: string, repo: string, path: string):Promise<RepositoryContentDto[] | RepositoryContentDto> {
    return await this.handleOctoKitRequest('GET /repos/{owner}/{repo}/contents/{path}', { owner, repo, path });
  }

  private async handleOctoKitRequest(url: string, options: any): Promise<any> {
    if (this.octokit === null) {
      this.intialize();
    }
    try {
      const response = await this.octokit?.request(url, options);
      return response?.data;
    }
    catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  private intialize() {
    this.octokit = new Octokit({ auth: this.storageService.accessToken })
  }


}
