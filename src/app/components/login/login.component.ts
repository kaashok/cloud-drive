import { Component } from '@angular/core';
import { GithubServiceService } from 'src/app/services/github-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private githubService: GithubServiceService) { }

  login() {
    this.githubService.getAuthURL().subscribe({
      next: (data: any) => {
        const githubLoginURL: string = data["authUrl"];
        window.location.href = githubLoginURL;
      }
    })
  }
}
