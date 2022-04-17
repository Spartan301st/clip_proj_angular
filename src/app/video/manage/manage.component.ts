import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  // 1 for new-to-old video sorting and 2 for vice versa
  videoOrder = '1';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.videoOrder =
        params['params']['sort'] === '2' ? params['params']['sort'] : '1';
    });
  }

  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    // easier way of navigation
    // this.router.navigateByUrl(`/manage?sort=${value}`);
    // complex way of navigation
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      },
    });
  }
}
