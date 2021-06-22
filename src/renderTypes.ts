
interface SeoMetadata {
  title: string;
  description: string;
}

interface OpenGraphGeneral {
  'og:url': string;
  'og:type': string;
  'og:title': string;
  'og:description': string;
}

interface OpenGraphImage {
  'og:image:url': string;
  'og:image:secure_url': string;
  'og:image:type': string;
  'og:image:width': number;
  'og:image:height': number;
  'og:image:alt': string;
}
interface OpenGraphMusicSong {
  'music:duration': number
  'music:album': OpenGraphMusicAlbum[];
  'music:album:disc': number;
  'music:album:track': number;
  'music:musician': OpenGraphProfile;
}
interface OpenGraphMusicAlbum {
  'music:song': OpenGraphMusicSong[];
  'music:song:disc': number;
  'music:song:track': number;
  'music:release_date': string;
  'music:musician': OpenGraphProfile;
}
interface OpenGraphMusicPlaylist {
  'music:song': OpenGraphMusicSong[];
  'music:song:disc': number;
  'music:song:track': number;
  'music:creator': OpenGraphProfile;
}
interface OpenGraphMusicRadioStation {
  'music:creator': OpenGraphProfile;
}

interface OpenGraphProfile {
  'profile:first_name'?: string;
  'profile:last_name'?: string;
  'profile:username'?: string;
  'profile:gender'?: 'male' | 'female';
}

type OpenGraphMusic = OpenGraphMusicSong & OpenGraphMusicAlbum & OpenGraphMusicPlaylist & OpenGraphMusicPlaylist
  & OpenGraphMusicRadioStation

interface OpenGraphVideoMovie {
  'video:actor': OpenGraphProfile[],
  'video:actor:role': string,
  'video:director': OpenGraphProfile[],
  'video:writer': OpenGraphProfile[],
  'video:duration': number,
  'video:release_date': string,
  'video:tag': string[];
}

interface OpenGraphVideo extends OpenGraphVideoMovie {
  'video:series': OpenGraphVideoMovie;
}

interface OpenGraphArticle {
  'article:published_time': string;
  'article:modified_time': string;
  'article:expiration_time': string;
  'article:author': OpenGraphProfile;
  'article:section': string;
  'article:tag': string[];
}

interface OpenGraphBook {
  'book:author': OpenGraphProfile[];
  'book:isbn': string;
  'book:release_date': string;
  'book:tag': string[];
}

interface OpenGraph1 {
  general: OpenGraphGeneral;
  image: OpenGraphImage;
  music: OpenGraphMusic;
  video: OpenGraphVideo;
  article: OpenGraphArticle;
  book: OpenGraphBook;
}

type OpenGraph = Partial<OpenGraphGeneral> & Partial<OpenGraphImage> & Partial<OpenGraphMusic> &
  Partial<OpenGraphVideo> & Partial<OpenGraphArticle> & Partial<OpenGraphBook>

interface TwitterCard {
  'twitter:card': string;
  'twitter:site': string;
  'twitter:creator': string;
  'twitter: description': string;
  'twitter:title': string;
  'twitter:image': string;
  'twitter:image:alt': string;
  'twitter:player': string;
  'twitter:player:width': string;
  'twitter:player:height': string;
  'twitter:player:stream': string;
  'twitter:app:name:iphone': string;
  'twitter:app:id:iphone': string;
  'twitter:app:url:iphone': string;
  'twitter:app:id:ipad': string;
  'twitter:app:url:ipad': string;
  'twitter:app:name:googleplay': string;
  'twitter:app:id:googleplay': string;
  'twitter:app:url:googleplay': string;
}

interface SEO {
  metadata: SeoMetadata
  openGraph?: OpenGraph | string;
  twitterCard?: Partial<TwitterCard> | string;
}

export interface RenderOptions {
  url: string,
  lang: string,
  charset: string;
  seo: SEO;
  reactComponent: string | NodeJS.ReadableStream;
}
