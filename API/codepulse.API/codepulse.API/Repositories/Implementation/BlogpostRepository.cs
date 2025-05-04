﻿using codepulse.API.Data;
using codepulse.API.Repositories.Interface;
using CodePulse.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace codepulse.API.Repositories.Implementation
{
    public class BlogpostRepository : IBlogpostRepository
    {
        private readonly ApplicationDbContext dbContext;

        public BlogpostRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            await dbContext.BlogPosts.AddAsync(blogPost);
            await dbContext.SaveChangesAsync();
            return blogPost;
        }

        public async Task<BlogPost?> DeleteAsync(Guid id)
        {
            var existingBlogPost = await dbContext.BlogPosts.FirstOrDefaultAsync(x => x.id == id);

            if (existingBlogPost != null)
            {
                dbContext.BlogPosts.Remove(existingBlogPost);
                await dbContext.SaveChangesAsync();
                return existingBlogPost;
            }

            return null;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return await dbContext.BlogPosts.Include(x => x.Categories).ToListAsync();
        }

        public async Task<BlogPost?> GetByIdAsync(Guid id)
        {
            return await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.id == id);
        }

        public async Task<BlogPost?> GetByUrlHandleAsync(string urlHandle)
        {
            return await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.UrlHandle == urlHandle);
        }

        public async Task<BlogPost?> UpdateAsync(BlogPost blogPost)
        {
            var existingBlogPost = await dbContext.BlogPosts.Include(x => x.Categories)
                .FirstOrDefaultAsync(x => x.id == blogPost.id);

            if (existingBlogPost == null)
            {
                return null;
            }

            // Update BlogPost
            dbContext.Entry(existingBlogPost).CurrentValues.SetValues(blogPost);

            // Update Categories
            existingBlogPost.Categories = blogPost.Categories;

            await dbContext.SaveChangesAsync();

            return blogPost;
        }
    }
}
