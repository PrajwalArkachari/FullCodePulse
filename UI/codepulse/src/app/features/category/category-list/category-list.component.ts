import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit, OnDestroy {
  categories$ ?: Observable<Category[]>;
  deleteSubscribe ?:Subscription;
  constructor(private categoryServices : CategoryService,private router :Router){
  }
  ngOnInit(): void {
   this.categories$ = this.categoryServices.getAllCategories();

  }
  
  onDelete(id : string ){
    this.deleteSubscribe = this.categoryServices.deleteCategory(id)
    .subscribe({
      next : (response) =>{
        this.router.navigateByUrl("/reload");

      }

    })
  }

  ngOnDestroy(): void {
    this.deleteSubscribe?.unsubscribe;
  }
}
