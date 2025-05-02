import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blogpost/model/blogpost.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{
  url : string | null = null;
  blogDetail$ ?: Observable<BlogPost>;
  constructor(private route:ActivatedRoute, private blogPostService : BlogpostService){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      {
        next:(value)=>{
          this.url=value.get('url');
        }
      }
    );
    
    //fetch the blogpost details using urlHandle
    if(this.url)
     this.blogDetail$ =this.blogPostService.GetBlogPostByUrlHandle(this.url)
    console.log(this.blogDetail$);
  
  }

}
