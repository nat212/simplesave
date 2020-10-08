import { Component, OnInit } from '@angular/core';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'ss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'SimpleSave';
  constructor(private update: UpdateService) {}

  public ngOnInit(): void {
    this.update.subscribe();
  }
}
