import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
// importing global service
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // providers: [ModalService]
})
export class ModalComponent implements OnInit, OnDestroy {
  // receiving the modalID, which is an empty string by def
  @Input() modalID = '';

  // passing a param of service type
  constructor(public modal: ModalService, public el: ElementRef) {
    // console.log(this.modal.visible)
    console.log(el);
  }

  // for moving our element out of the component container
  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }

  // handling the close process
  closeModal($event: Event) {
    $event.preventDefault();
    this.modal.toggleModal(this.modalID);
  }
}
