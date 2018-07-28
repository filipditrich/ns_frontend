import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'ns-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  public title: string;
  public path: string[];
  public headerTitle = [];
  public breadcrumbs: any[] = [];

  constructor(private router: Router,
              private titleService: Title) {

    // Get URL path
    this.path = this.router.url.split('/');
    if (this.path[0] === '') { this.path.splice(0, 1); }

    // Generate Breadcrumbs array
    this.path.forEach((path, index) => {
      const full = [];
      for (let i = index; i >= 0; i--) { full.push(this.path[i]); }
      if (path.indexOf('-') >= 0) { path = path.split('-').join(' '); }
      this.breadcrumbs.push({ name: path, fullPath: full.reverse().join('/') });
      if (index === 0 || index === (this.path.length - 1)) { this.headerTitle.push(path); }
    });

    // Take the last breadcrumb and transport it to the title prop (delete it from breadcrumbs array)
    const last = this.breadcrumbs.splice(-1, 1);
    this.title = last[0].name;
    this.titleService.setTitle(this.headerTitle.join(' » ').replace(/\b\w/g, l => l.toUpperCase()));

  }

  ngOnInit() {
  }

}
