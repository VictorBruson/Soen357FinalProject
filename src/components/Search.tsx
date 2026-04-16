import { useState, useMemo } from 'react';
import { SearchContent } from './SearchContent';
import { SearchResults } from './SearchResults';
import { useBooks } from '../context/BookContext';
import { searchBooksFuzzy } from '../types/book';
import type { Book } from '../types/book';

export function SearchDiscovery() {
    const { allBooks, openReader} = useBooks();
    const [activeSearchTerm, setActiveSearchTerm] = useState('');

    const structuredBooksData = useMemo(() => {
        if (!allBooks || allBooks.length === 0) {
            return {
                featured: undefined,
                recommended: [],
                trending: [],
                recentlyAdded: []
            };
        }

        return {
            featured: allBooks[0],
            recommended: allBooks.slice(1, 3),
            trending: allBooks.slice(3, 7).map((b, index) => ({
                ...b,
                trendingRank: index + 1
            })),
            recentlyAdded: allBooks.slice(0, 5).map(b => ({
                ...b,
                displayAddedTime: "2 days ago"
            }))
        };
    }, [allBooks]);

    const filteredBooks = useMemo(() => {
        if (!activeSearchTerm.trim() || !allBooks) return [];
        return searchBooksFuzzy(allBooks, activeSearchTerm);
    }, [activeSearchTerm, allBooks]);

    const handleOpenReader = (book: Book) => {
        if (openReader && book.isbn) {
            openReader(book.isbn);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {activeSearchTerm ? (
                <SearchResults
                    searchTerm={activeSearchTerm}
                    books={filteredBooks}
                    onBack={() => setActiveSearchTerm('')}
                    onOpenReader={handleOpenReader}

                />
            ) : (
                <SearchContent
                    booksData={structuredBooksData}
                    onSearch={(term) => setActiveSearchTerm(term)}
                    onOpenReader={handleOpenReader}
                />
            )}
        </div>
    );
}