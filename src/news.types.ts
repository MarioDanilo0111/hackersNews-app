export type NewsType = {
  hits: {
    created_at: string;
    title: string;
    url: string;
    author: string;
    points: number;
    story_url: string | null;
  }[];
};
