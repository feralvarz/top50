import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  card;
  @Input() dataSource;
  @Output() viewEvent: EventEmitter<any> = new EventEmitter();
  @Output() removeEvent: EventEmitter<boolean> = new EventEmitter();

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

  viewDetails() {
    this.card.clicked = true;
    this.viewEvent.emit(this.card);
  }

  remove() {
    this.removeEvent.emit(true);
  }
}
