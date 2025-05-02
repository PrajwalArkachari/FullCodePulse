import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { BlogPost } from '../model/blogpost.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../model/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id : string | null = null;
  routeSubscription ?: Subscription;
  model ?:BlogPost
  categories$ ?: Observable<Category[]>;
  selectedCategories ?: string[];
  updateBlogPostSubscription ?: Subscription;
  getBlogPostSubscription ?:Subscription;
  deleteBlogPostSubscription ?: Subscription;
  imageSelectSubscricption ?: Subscription; 
  isImageSelectorVisible : boolean = false;
  constructor(private route : ActivatedRoute, private blogpostService : BlogpostService, private categoryService : CategoryService,private imageService: ImageService , private router : Router){

  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscricption?.unsubscribe();
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = params.get('id');

        if(this.id){
         this.getBlogPostSubscription =   this.blogpostService.getBlogpostById(this.id).subscribe({
            next:(Response) =>{
              this.model=Response;
              this.selectedCategories = Response.categories.map(x => x.id);
            }
        });
        }
        this.imageSelectSubscricption = this.imageService.onSelectImage().subscribe({
          next:(Response)=>{
            if(this.model){
              this.model.featuredImageUrl=Response.url;
            }
          }
        })
      }
    });
  }

  onFormSubmit() : void{
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription = this.blogpostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
   }
  }

  onDelete() : void {
    if (this.id) {
      // call service and delete blogpost
      this.deleteBlogPostSubscription = this.blogpostService.deleteBlogPost(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }
}
