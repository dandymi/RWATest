import { Component, OnInit, OnDestroy } from '@angular/core';
import { TagService } from '../../services';

@Component({
  selector: 'tag-list',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnDestroy {

  tags: string[];
  sub: any;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.sub = this.tagService.getTags()
                .subscribe(tags => this.tags = tags);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
