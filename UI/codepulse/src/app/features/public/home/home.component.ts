import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blogpost/model/blogpost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Blogs$ ?: Observable<BlogPost[]> ;
  constructor(private blogPostService : BlogpostService){}

  ngOnInit(): void {
    this.Blogs$=this.blogPostService.getAllBlogpost();
   
  }
}
