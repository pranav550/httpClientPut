import { Book } from './book';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/observable";

@Injectable({
  providedIn: 'root'
})
export class BookService {
 bookurl="/api/books";
  constructor(private http:HttpClient) { }

  getBookFromStore():Observable<Book[]>{
     return this.http.get<Book[]>(this.bookurl);
  }
  

  createBook(book:Book):Observable<Book>{
     let httpHeaders= new HttpHeaders()
     .set('Content-Type', 'application/Json');
     let options={
       headers:httpHeaders
     }
     return this.http.post<Book>(this.bookurl, book, options);
  }

  updateBook(book:Book):Observable<number>{
    let httpHeaders= new HttpHeaders()
    .set('Content-Type', 'application/Json');
    let options={
      headers:httpHeaders
    }
    return this.http.put<number>(this.bookurl+"/"+book.id, book, options);
 }


  getBookById(bookid:string){
    return this.http.get<Book>(this.bookurl+"/"+bookid)
  }



}
