// shared/types/index.ts

import React from "react";

declare global {
  namespace React {
    type ReactNode =
      | string
      | number
      | boolean
      | ReactElement
      | null
      | undefined;
  }
}

declare namespace WPv2 {
  export interface Title {
    raw: string;
    rendered: string;
  }

  export interface Content {
    raw: string;
    rendered: string;
    block_version?: number;
    protected?: boolean;
  }

  export interface Excerpt {
    raw: string;
    rendered: string;
    protected?: boolean;
  }

  export interface Meta {
    inline_featured_image?: boolean;
    footnotes?: string;
    [key: string]: any;
  }

  export interface Links {
    self: Link[];
    collection: Link[];
    about?: Link[];
    author?: EmbeddedLink[];
    replies?: EmbeddedLink[];
    "version-history"?: VersionHistoryLink[];
    "predecessor-version"?: VersionLink[];
    "wp:featuredmedia"?: EmbeddedLink[];
    "wp:attachment"?: Link[];
    "wp:term"?: TermLink[];
    curies?: Cury[];
  }

  export interface Link {
    href: string;
    targetHints?: {
      allow: ("GET" | "POST" | "PUT" | "PATCH" | "DELETE")[];
    };
  }

  export interface EmbeddedLink extends Link {
    embeddable: boolean;
  }

  export interface VersionHistoryLink {
    count: number;
    href: string;
  }

  export interface VersionLink {
    id: number;
    href: string;
  }

  export interface TermLink {
    taxonomy: string;
    embeddable: boolean;
    href: string;
  }

  export interface Cury {
    name: "wp";
    href: string;
    templated: true;
  }

  export interface Post {
    id: number;
    date: string;
    date_gmt: string;
    guid: { rendered: string };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: "publish" | "draft" | "inherit" | string;
    type: "post" | "page" | "attachment" | string;
    link: string;
    title: Title;
    content: Content;
    excerpt: Excerpt;
    author: number;
    featured_media?: number;
    comment_status: "open" | "closed";
    ping_status: "open" | "closed";
    sticky: boolean;
    template: string;
    format: "standard" | string;
    meta: Meta;
    categories: number[];
    tags: number[];
    class_list: string[];
    _links: Links;
  }

  export interface Media {
    id: number;
    date: string;
    date_gmt: string;
    guid: { rendered: string };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string };
    author: number;
    comment_status: string;
    ping_status: string;
    meta: Meta;
    template: string;
    description: { rendered: string };
    caption: { rendered: string };
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: object;
    post: number;
    source_url: string;
    _links: Links;
  }

  export interface Category {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
    meta: Meta;
    _links: Links;
  }

  export interface Tag {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: "post_tag";
    meta: Meta;
    _links: Links;
  }

  export interface GetPostsParams {
    context?: "view" | "embed" | "edit";
    page?: number;
    per_page?: number;
    search?: string;
    after?: string;
    before?: string;
    author?: number[];
    author_exclude?: number[];
    exclude?: number[];
    include?: number[];
    offset?: number;
    order?: "asc" | "desc";
    orderby?:
      | "author"
      | "date"
      | "id"
      | "include"
      | "modified"
      | "parent"
      | "relevance"
      | "slug"
      | "title";
    slug?: string[];
    status?: string[];
  }
}

declare namespace SKBKit {
  export interface News {
    id: string; // Уникальный идентификатор новости
    attid: string; // Дополнительный идентификатор (например, для вложения)
    heading: string; // Заголовок новости
    preview: string; // Превью новости (текст или URL изображения)
    photos: string[]; // Массив URL фотографий
    text: string[]; // Массив строк текста новости
    views: number; // Количество просмотров
    date: number; // Дата публикации в формате timestamp
  }

  export interface GetNewsResponse {
    news: News[];
    headers: {
      "x-wp-total": string;
      "x-wp-totalpages": string;
    };
  }

  export interface GetNewsByIdParams {
    id: number;
  }

  export interface SendContactFormParams {
    name: string;
    email: string;
    message: string;
    subject?: string;
    phone?: string;
    company?: string;
    position?: string;
  }

  export interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    organizer?: string;
    participants?: number;
    image_url?: string;
  }
  export interface ApiResponse<T = any> {
    data: T;
    headers: {
      "x-wp-total": string;
      "x-wp-totalpages": string;
    };
    status: number;
    statusText: string;
  }
}

declare namespace App {
  export interface HtmlElement {
    type: "html";
    element: {
      type: string;
      key: string | null;
      ref: null;
      props: {
        children: React.ReactNode;
        className?: string;
        [key: string]: any;
      };
      _owner: null;
    };
  }

  export interface MediaBlock {
    type: "mediablock";
    value: string[];
  }

  export type ParsedContent = HtmlElement | MediaBlock;

  export interface ProjectPost {
    id: number;
    title: string;
    content: ParsedContent[];
    lab: string;
    preview: string | null;
    categories: string[];
    tag: string;
    previewText?: string;
  }

  export interface LabPost extends ProjectPost {
    previewText: string;
  }

  export interface PostsResult {
    projects: Record<number, ProjectPost>;
    labs: Record<number, LabPost>;
    other: ProjectPost[];
  }

  export interface MediaItem {
    id: number;
    src: string;
    category: string;
    name: string;
  }

  export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    subject?: string;
  }

  export interface NewsItem {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;
    image_url?: string;
    excerpt?: string;
  }
}
