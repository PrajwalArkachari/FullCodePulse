import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

     constructor(private http:HttpClient, private cookieService : CookieService) { }
    addCategory(model:AddCategoryRequest):Observable<void>{
      return this.http.post<void>('http://localhost:5193/api/Categories?addAuth=true',model, {
        headers:{
          'Authorization' : this.cookieService.get('Authorization')
        }
      });
    }
    getAllCategories(): Observable<Category[]>{
      return this.http.get<Category[]>('http://localhost:5193/api/Categories');

    }
    getCategoryById(id:string):Observable<Category>{
      return this.http.get<Category>(`http://localhost:5193/api/Categories/${id}`);
    }
    updateCategory(id:string, updateCategoryRequest : UpdateCategoryRequest): Observable<Category>{
      return this.http.put<Category>(`http://localhost:5193/api/Categories/${id}?addAuth=true`, updateCategoryRequest, {
        headers:{
          'Authorization' : this.cookieService.get('Authorization')
        }
      });
    }
    deleteCategory(id:string):Observable<Category>{
      return this.http.delete<Category>(`http://localhost:5193/api/Categories/${id}?addAuth=true`);
    }

}
