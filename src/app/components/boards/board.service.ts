import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardResponseDto } from './board/dto/boardResponse.dto';
import { AddBoardDto } from './board/dto/addBoardDto';
import { ListDto } from './working-board/dto/list.dto';
import { ListResponseDto } from './working-board/dto/list-response.dto';
import { CardDto } from './working-board/dto/card.dto';

@Injectable({
  providedIn: 'root'

})
export class BoardService {

  constructor(private httpClient: HttpClient) { }

  getBoards(): Observable<BoardResponseDto> {
    return this.httpClient.get<BoardResponseDto>("http://localhost:3000/board/myBoards")
  }

  addBoard(board: AddBoardDto): Observable<BoardResponseDto> {
    return this.httpClient.post<BoardResponseDto>("http://localhost:3000/board/create-board", { name: board.name })
  }
  deleteBoard(id: any): Observable<any> | null {
    return this.httpClient.delete<any>(`http://localhost:3000/board/delete-board/${id}`)
  }

  updateBoard(id: any, board: string): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:3000/board/update-board/${id}`, { name: board })
  }


  workingBoard(id: string): Observable<BoardResponseDto> {
    return this.httpClient.get<BoardResponseDto>(`http://localhost:3000/board/workingBoard/${id}`)
  }

  addList(newList: ListDto, boardId: any): Observable<ListResponseDto> {

    return this.httpClient.post<ListResponseDto>(`http://localhost:3000/list/create-list/${boardId}`, newList)
  }

  deleteList(id: any): Observable<ListResponseDto> {
    return this.httpClient.delete<ListResponseDto>(`http://localhost:3000/list/delete-list/${id}`)
  }

  addCard(card : any , listId : any) : Observable<any>{
    return this.httpClient.post(`http://localhost:3000/card/create-card/${listId}` , card)
  } 
}
