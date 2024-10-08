import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { AuthenticationService } from '../authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BoardComponent } from '../boards/board/board.component';
import { AddBoardModalComponent } from '../boards/add-board-modal/add-board-modal.component';
import { BoardService } from '../boards/board.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AddBoardModalComponent, FormsModule, BoardComponent,],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  showMenu: boolean = false
  showProfile: boolean = false
  showOverlay: boolean = false
  showRecent: boolean = true
  showFavory: boolean = true
  nameNewBoard: string = ''
  isModalOpen = false;
  isOpen = false;
  user: any


  constructor(
    private boardService: BoardService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.getUserLoggedIn()
  }

  onCloseModal() {
    this.isOpen = false;

  }

  openModal() {
    this.isOpen = true;
  }


  onShowMenu() {
    this.showMenu = !this.showMenu
    this.showMenu = this.showMenu
  }
  onHideMenu() {
    this.showMenu = false
  }
  onShowProfile() {
    this.showProfile = !this.showProfile
  }
  onShowRecent() {
    this.showRecent = !this.showRecent
  }

  onShowFavory() {
    this.showFavory = !this.showFavory
  }

  onAddBoard(formulaire: FormsModule) {
    console.log(formulaire)
    this.boardService.addBoard({ "name": this.nameNewBoard }).subscribe(
      (response) => {
        if (response.success) {

          window.location.reload()
          this.toastr.success(response.message, "Succes") 

        } else {

          this.toastr.error(response.message, "Erreur")
        }
      },
      (error) => {
        this.toastr.error(error.message, "Erreur") 
      }
    )
    this.nameNewBoard = ""
    this.isOpen = false
  }

  onLogOut() {
    this.authenticationService.userLogOut()
  }


  isLogged(): boolean {
    return this.authenticationService.isLogged()
  }

  getUserLoggedIn() {

    this.authenticationService.getUserLoggedIn().subscribe(
      (response) => {
        this.user = response
        // this.toastr.info("Utilisateur récupéré" , "Info")
      },
      (error) => {
        this.toastr.error(error)
      }

    )
  }


}
