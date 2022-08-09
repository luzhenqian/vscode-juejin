import { Category, Post } from "../../types";

export function categoriesMapping(raw: any[]): Category[] {
  return raw.map(({ category_id, category_name }) => ({
    id: category_id,
    name: category_name,
  }));
}

export function postListMapping(raw: any[]): Post[] {
  return raw
    .filter(({ item_type }) => item_type === 2)
    .map(
      ({
        item_info: {
          article_info: {
            article_id,
            title,
            brief_content,
            cover_image,
            view_count,
            digg_count,
            comment_count,
            collect_count,
            hot_index,
            ctime,
          },
          author_user_info: { avatar_large, user_id, user_name },
          category,
          tags,
        },
      }) => ({
        id: article_id,
        info: {
          title,
          briefContent: brief_content,
          coverImage: cover_image,
          viewCount: view_count,
          diggCount: digg_count,
          commentCount: comment_count,
          collectCount: collect_count,
          hotIndex: hot_index,
          createdAt: ctime,
        },
        author: {
          id: user_id,
          avatar: avatar_large,
          name: user_name,
        },
        category: category.category_name,
        tags: tags.map((tag: any) => tag.tag_name),
      })
    );
}
