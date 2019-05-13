import { Component } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('listAnim', [
      state(
        'removed',
        style({
          animation: 'remove 800ms',
          'animation-iteration-count': 1
        })
      )
    ])
  ]
})
export class AppComponent {
  posts = [];
  details;
  animState;

  constructor() {
    this.getPosts();
  }

  getPosts() {
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

  removeAll() {
    this.animState = 'removed';

    setTimeout(() => {
      this.posts = [];
    }, 400);
  }
}
