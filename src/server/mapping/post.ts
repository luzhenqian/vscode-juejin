import { Category, Post } from "../../types";

import { parse } from "node-html-parser";
import * as vm from "vm";
import { marked } from "marked";

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

export function postMapping(raw: any): { html: string } {
  const root = parse(raw.html);
  const body = root.getElementsByTagName("body")[0];
  const script = body.getElementsByTagName("script")[0];
  const scriptContent = script.childNodes[0].rawText;
  let data: any = {};
  vm.runInNewContext(`${scriptContent}`, {
    window: data,
  });
  const markdown = (
    data.__NUXT__.state.view.column.entry.article_info.mark_content as string
  ).replace(/^---$.*^---$/ms, "");
  const html = marked.parse(markdown);
  return { html };
}
