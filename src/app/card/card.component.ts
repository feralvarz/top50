import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import * as moment from 'moment';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardAnim', [
      state(
        'removed',
        style({
          animation: 'remove 1000ms',
          'animation-iteration-count': 1
        })
      )
    ])
  ]
})
export class CardComponent implements OnInit {
  card;
  animState: string;

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
    this.animState = 'removed';
    setTimeout(() => {
      this.viewEvent.emit(null);
      this.removeEvent.emit(true);
    }, 1001);
  }
}
