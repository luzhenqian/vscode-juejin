import { Category, Post } from "../../types";

import * as vm from "vm";
// don't use import, because TypeScript build error
const cheerio = require("cheerio");
var md = require("markdown-it")();

import { timeFromNow } from "../utils/time";

export function categoriesMapping(raw: any[]): Category[] {
  return raw.map(({ category_id, category_name }) => ({
    id: category_id,
    name: category_name,
  }));
}

export function postListMapping(raw: any[]): Post[] {
  return raw.map(
    ({
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
        rank_index,
        ctime,
      },
      author_user_info: { avatar_large, user_id, user_name },
      category,
      tags,
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
        rankIndex: Math.floor(rank_index * 1000),
        createdAt: timeFromNow(Number(ctime + "000")),
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

export function postMapping(raw: string) {
  const $ = cheerio.load(raw);
  const scriptContent = $("body > script")[0].firstChild.data;
  let data: any = {};
  vm.runInNewContext(`${scriptContent}`, {
    window: data,
  });
  const markdown = (
    data.__NUXT__.state.view.column.entry.article_info.mark_content as string
  ).replace(/^---$.*^---$/ms, "");
  const html = md.render(markdown);
  return { html };
}
