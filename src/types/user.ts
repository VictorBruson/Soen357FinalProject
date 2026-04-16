import {
    type Book,
    type ReadingProgress,
    getBooksByIsbn,
    extractIsbns
} from './book';

export interface User {
    id: string | number;
    username: string;
    email: string;
    readingProgress: ReadingProgress[];
}


export const getUserBooks = (user: User, allBooks: Book[]): Book[] => {
    const userIsbns = extractIsbns(user.readingProgress, true);
    return getBooksByIsbn(allBooks, userIsbns);
};

export const getBookProgress = (user: User, bookId: string | number): ReadingProgress | undefined => {
    return user.readingProgress.find(p => p.isbn === bookId);
};