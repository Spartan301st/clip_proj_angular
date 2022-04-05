import { Component, AfterContentInit, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit {

  // a decorator for projected content. We have to pass a 
  // param to that decorator which is an element we would like to select from the projected content
  // making prop optional
  // @ContentChildren(TabComponent) tabs?: QueryList<TabComponent>  = new QueryList()
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>  = new QueryList()

  constructor() { }

  // using ngAfterContentInit instead of ngOnInit to grab the data after content has been projected
  ngAfterContentInit(): void {
    // finding active tab
    const activeTabs = this.tabs?.filter(tab => tab.active)

    // if no tab is active select the first one
    if(!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs!.first)
    }
  }

  selectTab(tab: TabComponent) {
    // setting all the tabs to inactive
    this.tabs?.forEach(tab => tab.active = false )
    // setting the give ntab to active
    tab.active = true;

    // alternative way of calling preventDefault()
    return false;

  }

}
