import { Component } from '@angular/core';
declare const require;

const mockData = require('./mockdata.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor() {
    console.log(mockData);
  }
}
