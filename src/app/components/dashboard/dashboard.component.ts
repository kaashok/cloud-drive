import { Component } from '@angular/core';
import { RepositoryContentDto, RepositoryContentType, RepositoryDto } from 'src/app/core/dto/octokit.response.model';
import { OctokitService } from 'src/app/services/octokit.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  repoDetails: RepositoryDto[] = [];
  userName: string = "";
  fileAndFolderList: RepositoryContentDto[] = [];

  
  constructor(private progressBarService: ProgressBarService, private octokitService: OctokitService) {

  }

  async ngOnInit() {
    this.progressBarService.showSpinner = false;
    await this.getPrivateRepo();
  }

  async getPrivateRepo() {
    //Get Private Repo Details
    const repoDetails: RepositoryDto[] = await this.octokitService.getAllPrivateRepos();
    this.repoDetails = repoDetails.sort((a, b) => {
      return (new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    });
    if (this.repoDetails.length > 0) {
      this.userName = this.repoDetails[0].owner.login;
      await this.getRepoContent(this.repoDetails[0].name, "");
    }
  }

  async getRepoContent(repoName: string, path: string) {
    const repoContentDetails: RepositoryContentDto[] = await this.octokitService.getRepoContents(this.userName, repoName, path) as RepositoryContentDto[];
    if (this.repoDetails.length > 0) {
      for (const file of repoContentDetails) {
        const fileData: RepositoryContentDto = await this.octokitService.getRepoContents(this.userName, repoName, file.path) as RepositoryContentDto;

        if (file.type === RepositoryContentType.File) {
          const fileDetails = this.getFileTypeAndContent(file.name);
          if (fileDetails && fileDetails?.fileType && fileDetails?.contentType) {
            fileData.fileType = fileDetails.fileType;
            fileData.base64Content = `data:${fileDetails.contentType};base64,${fileData.content}`;
            this.fileAndFolderList.push(fileData);
          }
        } else {
          this.fileAndFolderList.push(file);
        }
      }
    }
  }

  getFileTypeAndContent(filename: string) {
    const extension = filename.split('.').pop()?.toLowerCase();
    let fileType = null;
    let contentType = null;

    if (extension) {
      switch (extension) {
        case 'pdf':
          fileType = 'PDF';
          contentType = 'application/pdf';
          break;
        case 'png':
          fileType = 'PNG Image';
          contentType = 'image/png';
          break;
        case 'jpg':
        case 'jpeg':
          fileType = 'JPEG Image';
          contentType = 'image/jpg';
          break;
        case 'gif':
          fileType = 'GIF Image';
          contentType = 'image/gif';
          break;
        case 'txt':
          fileType = 'Text File';
          contentType = 'text/plain';
          break;
        default:
          fileType = 'Unknown';
          contentType = 'application/octet-stream'; // Default content type for unknown file types
          break;
      }
    }
    return { fileType, contentType };
  }

}
