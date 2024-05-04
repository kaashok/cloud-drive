import { Component } from '@angular/core';
import { GithubServiceService } from 'src/app/services/github-service.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private githubService: GithubServiceService, private progressBarService: ProgressBarService) { }

  login() {
    this.progressBarService.showSpinner = true;    
    this.githubService.getAuthURL().subscribe({
      next: (data: any) => {
        const githubLoginURL: string = data["authUrl"];
        window.location.href = githubLoginURL;
      }
    })
  }
}
