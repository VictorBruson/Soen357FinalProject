import type { Book } from '../types/book';
import type { SortOption } from '../components/bookView/SortDropdown';

export class BookUtilities {

    static getAuthorString(book: Book): string {
        return book.authors?.join(', ') || '';
    }

    static filterBooks(
        books: Book[],
        category: string | null,
        author: string | null
    ): Book[] {
        return books.filter((book) => {
            const matchesCategory = category
                ? book.categories?.includes(category)
                : true;
            const matchesAuthor = author
                ? book.authors?.includes(author)
                : true;
            return matchesCategory && matchesAuthor;
        });
    }


    static sortBooks(books: Book[], sortBy: SortOption): Book[] {
        return [...books].sort((a, b) => {
            switch (sortBy) {
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                case 'author-asc':
                    return this.getAuthorString(a).localeCompare(this.getAuthorString(b));
                case 'author-desc':
                    return this.getAuthorString(b).localeCompare(this.getAuthorString(a));
                case 'relevance':
                default:
                    return 0;
            }
        });
    }


    static getUniqueMetadata(books: Book[]) {
        const categories = Array.from(new Set(books.flatMap(b => b.categories || []))).sort();
        const authors = Array.from(new Set(books.flatMap(b => b.authors || []))).sort();
        return { categories, authors };
    }
}