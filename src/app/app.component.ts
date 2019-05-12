import { Component } from '@angular/core';
declare const require;

const mockData = require('./mockdata.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts = [];
  details;
  constructor() {
    // this.posts = mockData.data.children;
    fetch(`//api.reddit.com/top?limit=50`)
      .then(response => response.json())
      .then(list => (this.posts = list.data.children));
  }

  seeDetails(content) {
    this.details = content;
  }

  removeCard(index) {
    this.posts.splice(index, 1);
  }
}
