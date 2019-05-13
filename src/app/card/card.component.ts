import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
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
      // timestamp to ms
      const postDate = new Date(this.dataSource.created * 1000);

      this.card = {
        author: this.dataSource.author || 'No Author',
        date: moment(postDate)
          .startOf('hours')
          .fromNow(),
        clicked: this.dataSource.clicked,
        content: this.dataSource.title || 'No Title',
        img: this.dataSource.thumbnail || null,
        full_img: null,
        comments: this.dataSource.num_comments || null
      };
    }
  }

  viewDetails() {
    this.card.clicked = true;
    const imgfullRaw = this.dataSource.preview.images[0].source.url;
    // replace old format in image, causing 403
    this.card.full_img = imgfullRaw.replace(/&amp;/g, '&');
    this.viewEvent.emit(this.card);
  }

  remove() {
    this.removeEvent.emit(true);
  }
}
