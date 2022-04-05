import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  // for adding tab titles dynamically
  @Input() tabTitle = ""
  // a prop for indicating whether tab is active or not
  @Input() active = false
 
  constructor() { }

  ngOnInit(): void {
  }

}
