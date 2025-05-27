export interface Image {
  '#text': string;
  size: string;
}

export interface Artist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Image[];
  tags?: string[];
}

export interface Album {
  name: string;
  artist: string;
  url: string;
  image: Image[];
  mbid: string;
}

export interface Track {
  name: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  url: string;
  streamable: {
    '#text': string;
    fulltrack: string;
  };
  listeners: string;
  mbid: string;
  image: Image[];
  duration: string;
  tags?: string[];
}