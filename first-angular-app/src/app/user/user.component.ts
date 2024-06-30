import { Component, EventEmitter, Input, Output, input} from '@angular/core';

import {type User } from './user.model';
// type User = {
//   id: string;
//   avatar: string;
//   name: string; 
//  }

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent {
   @Input ({required: true}) user!: User; // input are the properties of component that can be set from outside of the component.[user]=user selected= "user.id === selecteduserId"
   @Input ({required: true}) selected!: boolean;
   @Output() select = new EventEmitter<string>();// output are the custom event that can be emitted that also contain a data
   
  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
