import { Injectable } from '@angular/core';
import { AddBlogPost } from '../model/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../model/blogpost.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../model/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }

  createBlogPost(model:AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/Blogpost?addAuth=true`, model);
  }
  getAllBlogpost(): Observable<BlogPost[]> {
     return this.http.get<BlogPost[]>('http://localhost:5193/api/Blogpost');
 }
 getBlogpostById(id:string): Observable<BlogPost> {
  return this.http.get<BlogPost>(`http://localhost:5193/api/Blogpost/${id}`);
 }
 GetBlogPostByUrlHandle(urlHandle:string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`http://localhost:5193/api/Blogpost/${urlHandle}`);
 }
 updateBlogPost(id : string, updateBlogPost : UpdateBlogPost): Observable<BlogPost>{
  return this.http.put<BlogPost>(`http://localhost:5193/api/Blogpost/${id}?addAuth=true`, updateBlogPost);
 }
 deleteBlogPost(id : string):Observable<BlogPost>{
  return this.http.delete<BlogPost>(`http://localhost:5193/api/Blogpost/${id}?addAuth=true`);
 }
  
}
