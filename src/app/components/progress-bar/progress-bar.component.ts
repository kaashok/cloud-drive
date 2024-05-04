import { Component } from '@angular/core';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  showSpinner: boolean = false;
  constructor(private progressBarService: ProgressBarService) {
    this.progressBarService.showSpinner$.subscribe({
      next: (showSpinner) => {
        this.showSpinner = showSpinner;
      }
    })
  }
}
