import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../board.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-working-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './working-board.component.html',
  styleUrl: './working-board.component.css'
})
export class WorkingBoardComponent implements OnInit {

  boardId: string = ""
  workingBoard: any = null
  activePopupId: string | null = null
  listIdAddCard: string | null = null
  titleCard: string = ""
  showFormAddCard : boolean = false

  constructor(
    private activeRoute: ActivatedRoute,
    private boardService: BoardService,
    private toast: ToastrService,
    private router: Router

  ) { }
  ngOnInit(): void {
    this.WorkingBoardDetail()
  }

  onShowPopUp(boardId: string): void {
    this.activePopupId = this.activePopupId === boardId ? null : boardId;

  }
  onHidePopUp() : void{
    this.activePopupId = null
  }


  WorkingBoardDetail(): any {
    this.activeRoute.params.subscribe(
      (params) => {
        this.boardId = params['id']
      }
    )
    return this.boardService.workingBoard(this.boardId).subscribe(
      (response) => {
        if (response.success) {
          this.toast.success(response.message, "Bon travail")
          this.workingBoard = response.board 
        } else {
          this.toast.error(response.message, "Erreur")
          this.router.navigate(['boards'])
        }
      } 
    )
  }

  addList(formulaire: NgForm): any {

    let boardId;
    this.activeRoute.params.subscribe(
      (params) => {
        boardId = this.boardId = params['id']
      }
    )

    if (boardId) {
      return this.boardService.addList(formulaire.form.value, boardId).subscribe(
        (response) => {
          if (response.success) {
            window.location.reload()
            this.toast.success(response.message, "Success")
          } else {
            this.toast.error(response.message, "Erreur")
          }
        },
        (error) => {
          this.toast.error('Une erreur s\'est produite', "Erreur")

        }
      )
    } else {
      this.toast.error('Tableau non trouvé', "Erreur")
    }

  }

  onDeleteList(id: any): any {
    this.boardService.deleteList(id).subscribe(
      (response) => {
        if (!response.success) {
          this.toast.error(response.message, "Erreur")
        } else {
          this.toast.success(response.message, "Success")
          window.location.reload()
        }

      }


    )
  }
  onAddCard(onAddCardForm: NgForm, listId: any): any {

    return this.boardService.addCard({ title: onAddCardForm.form.value.card }, listId).subscribe(
      (response) => {
        if (response.success) {
          this.toast.success(response.message, "Success")
          window.location.reload()
        } else {
          this.toast.error(response.message, "Error")
        }
      },
      (error) => {
        this.toast.error("Une erreur s'est produite", "Error")

      }
    )
  }

}
