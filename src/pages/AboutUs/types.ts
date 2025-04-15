export namespace WPv2 {
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

  export interface CreatePostParams extends Partial<Post> {}
}

export namespace SKBKit {
  export interface News {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;
    categories: string[];
    tags: string[];
    image_url?: string;
    excerpt?: string;
  }

  export interface GetNewsResponse {
    news: News[];
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

  export interface GetEventsResponse {
    events: Event[];
  }

  export interface VKCallbackParams {
    type: string;
    object: any;
    group_id: number;
    event_id?: string;
  }

  export interface ApiResponse<T> {
    data: T;
    headers: Record<string, string>;
    status: number;
    statusText: string;
  }
}
