import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public modal: ModalService) { }

  ngOnInit(): void {
  }
  // for opening the modal once we click on the necessary element
  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal("auth")
  }

}
