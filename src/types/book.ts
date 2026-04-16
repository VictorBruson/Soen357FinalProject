import Fuse from 'fuse.js';

export type ContentType = 'heading' | 'paragraph' | 'code' | 'quote' | 'list' | 'image' | 'separator';

export interface ContentBlock {
    id?: string;
    type: ContentType;
    // human text (for heading/paragraph/quote)
    text?: string;
    // for lists
    items?: string[];
    // for code blocks
    language?: string;
    code?: string;
    // for images
    src?: string;
    caption?: string;
    // heading level when type === 'heading'
    level?: number;
}

export interface Chapter {
    id: string | number;
    number?: number;
    title: string;
    summary?: string;
    content: ContentBlock[];
    length?: string; // e.g. "23 min read"
    metadata?: Record<string, unknown>;
}

export interface Book {
    isbn: string | number;
    title: string;
    authors?: string[]; // prefer array for consistency
    courseCode?: string;
    required?: boolean;
    categories?: string[];
    coverImage?: string;
    description?: string;
    chapters: Chapter[];
    length?: string;
    metadata?: Record<string, unknown>;
    trendingRank?: number;
}


export interface ReadingProgress {
    isbn: string | number;
    progressPercent: number; // 0-100
    currentChapterId?: string | number;
    lastReadAt?: string; // ISO date
}

export const searchBooksFuzzy = (books: Book[], query: string): Book[] => {
    const options = {
        threshold: 0.3,
        keys: [
            'title',
            'authors',
            'isbn',
            'categories',
            'courseCode'
        ]
    };

    const fuse = new Fuse(books, options);
    const results = fuse.search(query);

    return results.map(result => result.item);
};

export const getBooksByIsbn = (books: Book[], isbnsToMatch: (string | number)[]): Book[] => {
    const isbnSet = new Set(isbnsToMatch);

    return books.filter((book) => isbnSet.has(book.isbn));
};

export const extractIsbns = (
    progressList: ReadingProgress[],
    uniqueOnly: boolean = false
): (string | number)[] => {
    const isbns = progressList.map(item => item.isbn);

    return uniqueOnly ? Array.from(new Set(isbns)) : isbns;
}


