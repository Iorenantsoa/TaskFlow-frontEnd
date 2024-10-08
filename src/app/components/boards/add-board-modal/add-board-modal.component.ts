import { CommonModule } from '@angular/common';
import { Component, Input ,Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-board-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-board-modal.component.html',
  styleUrl: './add-board-modal.component.css'
})
export class AddBoardModalComponent {
  @Input() isOpen = false; 

  onCloseModal() {
    this.isOpen = false;
   
  }
  
}

