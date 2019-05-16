import { BookService } from './book.service';
import { Component } from '@angular/core';
import {Book} from"./book";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs/observable";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'httpClientGet';
 // softBooks:Book[];
 datasaved= false;
 bookForm:FormGroup;
 allbooks:Observable<Book[]>;
 bookUpdate= null
  constructor(private formbuilder:FormBuilder, private bookService:BookService){}

  ngOnInit(){
this.getSoftBook()
this.bookForm= this.formbuilder.group({
  name:['', [Validators.required]], 
  category:['', [Validators.required]], 
  company:['', [Validators.required]], 
})
  }

  onFormSubmit(){
    this.datasaved=false;
    let book= this.bookForm.value;
    this.createBooks(book);
    this.bookForm.reset()

  }

  createBooks(book:Book){
    if(this.bookUpdate==null){
      this.bookService.createBook(book).subscribe(
        book=>{
          this.datasaved=true;
        this.getSoftBook();
        this.bookUpdate=null
        }
      )
    }
    else{
      book.id=this.bookUpdate
      this.bookService.updateBook(book)
      .subscribe(book=>{
        this.datasaved= true;
        this.getSoftBook()
        this.bookUpdate=null
      })
    }
    
  }

  editBook(bookid:string){
    this.bookService.getBookById(bookid).subscribe(book=>{
       this.bookUpdate= bookid;
       this.bookForm.controls['name'].setValue(book.name);
       this.bookForm.controls['category'].setValue(book.category);
       this.bookForm.controls['company'].setValue(book.company);
    })
  }

  getSoftBook(){
   this.allbooks = this.bookService.getBookFromStore()
  }
}
