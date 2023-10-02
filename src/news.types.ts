export type NewsType = {
  hits: {
    created_at: string;
    title: string;
    url: string;
    author: string;
    points: number;
    story_text: string | null;
    comment_text: string | null;
    num_comments: number;
    story_id: string | null;
    story_title: string | null;
    story_url: string | null;
    parent_id: string | null;
    created_at_i: number;
    _tags: string[];
    objectID: string;
    _highlightResult: {
      title: {
        value: string;
        matchLevel: string;
        matchedWords: string[];
      };
      url: {
        value: string;
        matchLevel: string;
        matchedWords: string[];
      };
      author: {
        value: string;
        matchLevel: string;
        matchedWords: string[];
      };
    };
  }[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: {
    nbHits: boolean;
    typo: boolean;
  };
  query: string;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: {
    _request: {
      roundTrip: number;
    };
  };
};
