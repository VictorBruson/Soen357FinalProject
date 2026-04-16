import {useMemo, useState} from 'react';
import { BookPopup } from './BookPopup';
import type { Book } from '../types/book';
import {useBooks} from "../context/BookContext.tsx";
import { BookList } from './bookView/BookList.tsx';
import {ViewToggle} from "./bookView/ViewToggle.tsx";
import {SortDropdown} from "./bookView/SortDropdown.tsx";
import {FilterDropdown} from "./bookView/FilterDropdown.tsx";
import {BookUtilities} from "../utils/BookUtil.ts";

interface SearchResultsProps {
    searchTerm: string;
    books: Book[];
    onBack: () => void;
    onOpenReader?: (book: Book) => void;
}


type ViewMode = 'grid' | 'list';
type SortOption = 'relevance' | 'title-asc' | 'title-desc' | 'author-asc' | 'author-desc';


export function SearchResults({ searchTerm, books, onBack, onOpenReader }: SearchResultsProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('relevance');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
    const { getProgressForBook, addToLibrary } = useBooks();


    const { categories, authors } = useMemo(() =>
        BookUtilities.getUniqueMetadata(books), [books]
    );

    const displayedBooks = useMemo(() => {
        const filtered = BookUtilities.filterBooks(books, selectedCategory, selectedAuthor);
        return BookUtilities.sortBooks(filtered, sortBy);
    }, [books, selectedCategory, selectedAuthor, sortBy]);

    return (
        <div className="flex-1 relative w-full overflow-hidden">
            <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                <div className="px-[24px] py-[32px]">
                    <div className="mb-[24px]">
                        {/* Header */}
                        <div className="flex items-center gap-[16px] mb-[16px]">
                            <button onClick={onBack} className="w-[24px] h-[24px] flex items-center justify-center transition-opacity hover:opacity-70">
                                <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 14 14">
                                    <path d="M14 6H3.41L7.7 1.71L6.29 0.29L0.29 6.29C0.105451 6.4773 0.00119094 6.7309 0.00119094 6.995C0.00119094 7.2591 0.105451 7.5127 0.29 7.7L6.29 13.7L7.7 12.29L3.41 8H14V6Z" fill="#757C7A" />
                                </svg>
                            </button>
                            <div className="flex-1">
                                <p className="font-['Manrope',sans-serif] text-[#757c7a] text-[12px] leading-[16px]">SEARCH</p>
                                <h1 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[20px] leading-[28px]">
                                    Results for <span className="font-['Newsreader',sans-serif] italic">{searchTerm}</span>
                                </h1>
                            </div>
                        </div>

                        {/* Filter/Sort Bar */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[24px]">
                                <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />

                                <FilterDropdown
                                    label="Category"
                                    options={categories}
                                    selectedOption={selectedCategory}
                                    onOptionChange={setSelectedCategory}
                                />

                                <FilterDropdown
                                    label="Author"
                                    options={authors}
                                    selectedOption={selectedAuthor}
                                    onOptionChange={setSelectedAuthor}
                                />
                            </div>
                            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
                        </div>
                    </div>

                    <BookList
                        books={displayedBooks}
                        viewMode={viewMode}
                        onBookClick={setSelectedBook}
                    />
                </div>
            </div>

            {selectedBook && (
                <BookPopup
                    book={selectedBook}
                    progress={getProgressForBook(selectedBook.isbn)}
                    onClose={() => setSelectedBook(null)}
                    onOpenReader={() => {
                        if (onOpenReader) onOpenReader(selectedBook);
                        setSelectedBook(null);
                    }}
                    onViewNotes={() => setSelectedBook(null)}
                    onAddToLibrary={(isbn) => addToLibrary(isbn)}
                />
            )}
        </div>
    );
}