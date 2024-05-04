import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubServiceService } from 'src/app/services/github-service.service';
import { StorageService } from 'src/app/services/storage-services.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent {

  constructor(private route: ActivatedRoute, private router: Router, private githubService: GithubServiceService, private storageServices: StorageService) { }

  //This component is kind of intermediate, after login in URL we will get code, to hide the code we are keep this intermediate component
  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      //Get the Access Token
      this.githubService.getAccessToken(code).subscribe({
        next: (data) => {
          this.storageServices.accessToken = data.access_token;
          this.router.navigate(['/dashboard'])
        },
        error: (error) => {
          console.log(error);
        }
      });      
    }
  }
}
