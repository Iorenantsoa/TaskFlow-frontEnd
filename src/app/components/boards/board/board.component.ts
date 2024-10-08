import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BoardDto } from './dto/board.dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, HttpClientModule , FormsModule ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})


export class BoardComponent implements OnInit {

  boards: BoardDto[] = []
  newBoard: string = ""
  activePopupId: string | null = null   
  updateBoardName: string = ""

  constructor(
    private boardService: BoardService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.boardService.getBoards().subscribe(
      (response) => {
        if (response.success) {
          this.toaster.success(response.message, "Succes")
          this.boards = response.board
        } else {
          this.toaster.error(response.message, "Erreur")
        }
      },
      (error) => {
        this.toaster.error(error, "Erreur")
        console.log(error)
      },
    )
  }

  
 
  onShowPopUp(boardId: string , boardName : string): void { 
    this.activePopupId = this.activePopupId === boardId ? null : boardId;
    
    this.updateBoardName = boardName;
  }


  deleteBoard(boardId: string): any {

    if (!boardId) {
      this.toaster.error("Tableau non trouvé", "Erreur")
      return null
    } else {
      this.boardService.deleteBoard(boardId)?.subscribe(
        (response) => {
          if (response.success) {
            this.toaster.success("Tableau effacé avec success", "Success")
            this.activePopupId = null
            window.location.reload()
          } else {
            this.toaster.error(response.message, "Erreur")
            this.activePopupId = null
          }
        },
        (error) => {
          this.activePopupId = null
          this.toaster.error("Une erreur s'est produite", "Erreur")
        }
      )
    }

  }



  onEditBoard(board: BoardDto) { 
    this.updateBoardName = board.name;  // Préremplir l'input avec le nom du board
  }

  updateBoard(id: string): any {
    if (!id) {
      this.toaster.error("Tableau non trouvé", "Erreur")
      return null
    } else {

      console.log(this.updateBoardName)
      if ( this.updateBoardName != "") {

        this.boardService.updateBoard(id, this.updateBoardName).subscribe( 
          (response) => {
            if (response.success) {
              this.toaster.success("Mise à jour effectuée avec success", "Success")
              this.activePopupId = null
              window.location.reload()
            }
          },
          (error) => {
            this.toaster.error("Tableau non trouvé", "Erreur")
            this.activePopupId = null
          }
        )
      }
      else{
        this.toaster.error("Veuillez entrer la nouvelle valeur", "Erreur")
            this.activePopupId = null
      }

    }
  } 
  workingBoardDetail(id : string){
    this.router.navigate(["working-board",id])
  }
}








