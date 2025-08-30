"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import Crumb from "./crumb";
import Markdown from "@/components/markdown";
import { Post } from "@/types/post";
import moment from "moment";
import { Card } from "@/components/ui/card";

export default function BlogDetail({ post }: { post: Post }) {
  return (
    <article className="py-12 md:py-20">
      <div className="container max-w-4xl mx-auto px-6 md:px-8 ">
        <Crumb post={post} />
        
        {/* Article Header */}
        <header className="mb-12 md:mb-16">
          <h1 className="mb-8 mt-12 text-3xl lg:text-5xl font-bold leading-tight md:leading-tight lg:leading-tight tracking-tight text-foreground max-w-4xl">
            {post.title}
          </h1>
          
          {/* Author Info */}
          <div className="flex items-center gap-4 pt-6 border-t border-border/30">
            {post.author_avatar_url && (
              <Avatar className="h-12 w-12 border-2 border-border/20">
                <AvatarImage
                  src={post.author_avatar_url}
                  alt={post.author_name}
                  className="object-cover"
                />
              </Avatar>
            )}
            <div className="flex flex-col gap-1">
              {post.author_name && (
                <span className="font-semibold text-base text-foreground">{post.author_name}</span>
              )}
              <span className="text-sm text-muted-foreground font-medium">
                {post.created_at && moment(post.created_at).format('MMMM DD, YYYY')}
              </span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="relative">
          {post.content && (
            <div className="prose prose-lg md:prose-xl max-w-3xl">
              <Markdown content={post.content} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
