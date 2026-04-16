/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import { BOOKS_DATA } from '../data/books'; // Assuming these paths
import { USERS_DATA } from '../data/users';
import type {Book, ReadingProgress} from "../types/book.ts";
import {getBookProgress, type User} from "../types/user.ts";

interface BookContextValue {
    // Data
    allBooks: Book[];
    userLibrary: ReadingProgress[];
    currentUser: User | null;

    // Actions
    addToLibrary: (bookId: number | string) => void;
    updateProgress: (bookId: number | string, percent: number, chapterId?: string | number) => void;
    getProgressForBook: (bookId: string | number) => ReadingProgress | undefined;

    // UI State
    readingBookId: number | string | null;
    openReader: (bookId: number | string) => void;
    closeReader: () => void;
}

const BookContext = createContext<BookContextValue | null>(null);

export function BookProvider({ children }: { children: React.ReactNode }) {
    const initialUser = USERS_DATA && USERS_DATA.length > 0 ? USERS_DATA[0] : null;

    const [currentUser] = useState<User | null>(initialUser);
    const [userLibrary, setUserLibrary] = useState<ReadingProgress[]>(
        initialUser?.readingProgress || []
    );

    const [allBooks] = useState(BOOKS_DATA || []);
    const [readingBookId, setReadingBookId] = useState<number | string | null>(null);

    const addToLibrary = (isbn: number | string) => {
        setUserLibrary((prev) => {
            const alreadyOwned = prev.find((p) => p.isbn === isbn);
            if (alreadyOwned) return prev;

            const newEntry: ReadingProgress = {
                isbn,
                progressPercent: 0,
                lastReadAt: new Date().toISOString(),
            };
            return [...prev, newEntry];
        });
    };

    const getProgressForBook = (bookId: string | number) => {
        return userLibrary.find(p => p.isbn === bookId);
    };

    const updateProgress = (isbn: string | number, percent: number, chapterId?: string | number) => {
        setUserLibrary((prev) =>
            prev.map((p) =>
                p.isbn === isbn
                    ? {
                        ...p,
                        progressPercent: percent,
                        currentChapterId: chapterId ?? p.currentChapterId,
                        lastReadAt: new Date().toISOString()
                    }
                    : p
            )
        );
    };

    const value = useMemo(() => ({
        allBooks,
        userLibrary,
        currentUser,
        addToLibrary,
        updateProgress,
        readingBookId,
        openReader: (id: number | string) => setReadingBookId(id),
        closeReader: () => setReadingBookId(null),
        getProgressForBook,
    }), [userLibrary, readingBookId, allBooks, currentUser, getProgressForBook]);

    if (!initialUser) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                    <h1 className="text-xl font-bold text-red-600">Configuration Error</h1>
                    <p className="text-gray-600">User data could not be loaded.</p>
                </div>
            </div>
        );
    }

    return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBooks() {
    const ctx = useContext(BookContext);
    if (!ctx) throw new Error('useBooks must be used inside BookProvider');
    return ctx;
}