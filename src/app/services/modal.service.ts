import { Injectable } from '@angular/core';

// inteface for defining the data types for the props
interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  // private for security
  // an array of modal ids
  // memo leak testing
  // public modals: IModal[] = []
  private modals: IModal[] = []

  constructor() { }

  // here we are adding an id of a modal to modals array, that has a visibility false by def
  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
  }

  // remove a modal with an associated id
  unregister(id: string) {
    this.modals = this.modals.filter(modal => modal.id !== id)
  }

  // for retrieving val of the visible prop
  isModalOpen(id: string): boolean {
    // return this.visible
    // return true
    // basically we are checking which modal is open according to its id + we're using the optional chaining with ?. notation
    // as the function can only return a boolean value we can either use !! first to convert the value to an opposite boolean 
    // and then back to original boolean value or wrap the value with the  Boolean converter
    return Boolean(this.modals.find(modal => modal.id === id)?.visible)
    // return !!this.modals.find(modal => modal.id === id)?.visible
  }

  // for modifying the prop val
  toggleModal(id: string) {
    const modal = this.modals.find(modal => modal.id === id)
    // this.visible = !this.visible

    // if there was such a modal, there should be unique one with the given id, then we'll toggle its visibility
    if(modal) {
      modal.visible = !modal.visible
    }
  }
}
