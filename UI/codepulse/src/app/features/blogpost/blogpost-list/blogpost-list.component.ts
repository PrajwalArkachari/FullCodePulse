import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../model/blogpost.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  
 blogPosts$?:Observable<BlogPost[]>;


  constructor(private BlogPostServices : BlogpostService) {
    
  }
  ngOnInit(): void {
    this.blogPosts$ = this.BlogPostServices.getAllBlogpost();
   
  }

}
