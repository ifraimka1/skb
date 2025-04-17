import WPAPI from "wpapi";

export const wp = new WPAPI({
  endpoint: "https://test.skbkit.ru/wp-json/",
  username: "admin",
  password: "admin",
});

export const skbEndpoint = wp._options.endpoint;
declare namespace App {
  type MediaItem = {
    id: number;
    src: string;
    category: string;
    name: string;
  };

  type ProjectPost = {
    id: number;
    title: string;
    content: ParsedContent[];
    lab: string;
    preview?: string;
  };

  type ParsedContent =
    | { type: "text"; content: string }
    | { type: "media"; urls: string[] };

  type ContactFormData = {
    name: string;
    email: string;
    message: string;
    subject?: string;
  };
}
