import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() dataSource;
  card;

  constructor() {}

  ngOnInit() {
    if (this.dataSource !== undefined) {
      this.card = {
        author: this.dataSource.author || 'No Author',
        date: this.dataSource.created || null,
        clicked: this.dataSource.clicked,
        content: this.dataSource.title || 'No Title',
        img: this.dataSource.thumbnail || null,
        comments: this.dataSource.num_comments || null
      };
    }
  }
}
