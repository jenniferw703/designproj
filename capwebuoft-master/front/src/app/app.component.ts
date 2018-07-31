import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent {
  title = 'ECE496';

  private authed: boolean;

  constructor() { }

  ngOnInit() { }

}
