import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../model/add-blog-post.model';
import { BlogpostService } from '../services/blogpost.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model : AddBlogPost;
  addBlogPostSubscribe ?: Subscription;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible : boolean = false;
  ImageSelectorSubscription ?: Subscription;

  constructor(private blogpostService : BlogpostService, private router: Router,private categoryService : CategoryService, private imageService : ImageService) {
    this.model={
      title : '',
      shortDescription:'',
      content:'',
      featuredImageUrl:'',
      urlHandle:'',
      publishedDate : new Date(),
      author :'',
      isVisible : true,
      categories:[],
    }
    
  }
  ngOnInit(): void {
    this.categories$= this.categoryService.getAllCategories();

    this.ImageSelectorSubscription= this.imageService.onSelectImage().subscribe({
          next: (Response) =>{
            this.model.featuredImageUrl=Response.url;
            this.closeImageSelector();
          }
        });
  }
  
  onSubmitForm() {
    this.addBlogPostSubscribe = this.blogpostService.createBlogPost(this.model)
                                .subscribe({
                                  next : (response) =>{
                                    this.router.navigateByUrl('admin/blogposts')
                                  }
                                })  
                               console.log(this.model);
  }
  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }

ngOnDestroy(): void {
    this.addBlogPostSubscribe?.unsubscribe();
    this.ImageSelectorSubscription?.unsubscribe();
  }
}
