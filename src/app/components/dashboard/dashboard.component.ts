import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubServiceService } from 'src/app/services/github-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private route: ActivatedRoute, private githubService: GithubServiceService) { }

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.githubService.getAccessToken(code).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
