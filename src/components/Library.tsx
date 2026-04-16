import {useMemo, useState} from 'react';
import { BookPopup } from './BookPopup';
import { useBooks } from '../context/BookContext';
import type { Book } from '../types/book.ts';
import {BookList} from "./bookView/BookList.tsx";
import { ViewToggle } from "./bookView/ViewToggle.tsx";
import {SortDropdown, type SortOption} from "./bookView/SortDropdown.tsx";
import {FilterDropdown} from "./bookView/FilterDropdown.tsx";
import {BookUtilities} from "../utils/BookUtil.ts";


type ViewMode = 'grid' | 'list';

export function Library() {
    const { allBooks, userLibrary, openReader, getProgressForBook, addToLibrary } = useBooks();
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('relevance'); // New Sort State
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

    const getEnrichedBook = (book: Book) => {
        const progressData = userLibrary.find((p) => p.isbn === book.isbn);
        const chapterIndex = book.chapters.findIndex(c => c.id === progressData?.currentChapterId);

        return {
            ...book,
            progress: progressData?.progressPercent ?? 0,
            chapter: chapterIndex !== -1 ? {
                number: (book.chapters[chapterIndex].number || chapterIndex + 1),
                name: book.chapters[chapterIndex].title
            } : undefined
        };
    };

    const sortedLibrary = [...userLibrary].sort((a, b) => {
        const dateA = new Date(a.lastReadAt || 0).getTime();
        const dateB = new Date(b.lastReadAt || 0).getTime();
        return dateB - dateA;
    });

    const activeProgressBooks = sortedLibrary
        .filter(p => p.progressPercent > 0 && p.progressPercent < 100)
        .map(p => allBooks.find(b => b.isbn === p.isbn))
        .filter((b): b is Book => !!b);

    const currentlyReading = activeProgressBooks.length > 0
        ? [getEnrichedBook(activeProgressBooks[0])]
        : [];

    const upNextCandidate = sortedLibrary
        .filter(p => p.progressPercent < 100 && p.isbn !== currentlyReading[0]?.isbn)
        .map(p => allBooks.find(b => b.isbn === p.isbn))
        .filter((b): b is Book => !!b);

    const upNext = upNextCandidate.length > 0
        ? [getEnrichedBook(upNextCandidate[0])]
        : [];

    const enrichedAllBooks = allBooks
        .filter(book => userLibrary.some(p => p.isbn === book.isbn))
        .map(getEnrichedBook);

    const { categories, authors } = useMemo(() =>
        BookUtilities.getUniqueMetadata(enrichedAllBooks), [enrichedAllBooks]
    );


    const filteredBooks = useMemo(() => {
        const filtered = BookUtilities.filterBooks(
            enrichedAllBooks,
            selectedCategory,
            selectedAuthor
        );

        return BookUtilities.sortBooks(filtered, sortBy);

    }, [enrichedAllBooks, selectedCategory, selectedAuthor, sortBy]);

    return (
        <div className="h-full relative w-full overflow-hidden">
            <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                <div className="px-[24px] py-[32px] space-y-[48px]">

                    {/* Currently Reading */}
                    {currentlyReading.length > 0 && (
                        <div className="space-y-[24px]">
                            <h2 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[20px] leading-[28px]">Continue Reading</h2>
                            <div className="space-y-[16px]">
                                {currentlyReading.map((book) => (
                                    <button
                                        key={`reading-${book.isbn}`}
                                        onClick={() => setSelectedBook(book)}
                                        className="bg-white rounded-[12px] border border-[rgba(172,179,177,0.1)] shadow-[0px_4px_24px_0px_rgba(45,52,50,0.04)] p-[24px] w-full text-left"
                                    >
                                        <div className="flex gap-[16px]">
                                            <div className="bg-[#eaefec] rounded-[8px] overflow-hidden w-[80px] h-[120px] flex-shrink-0 shadow-sm">
                                                <img alt={book.title} className="h-full w-[133.33%] object-cover" src={book.coverImage} />
                                            </div>
                                            <div className="flex-1 space-y-[12px]">
                                                <div>
                                                    {book.courseCode && (
                                                        <div className="bg-[#c8e9e8] px-[8px] py-[2px] rounded-[4px] inline-block mb-[8px]">
                                                            <p className="font-['Manrope',sans-serif] font-bold text-[#395757] text-[10px] tracking-[1px] uppercase leading-[15px]">{book.courseCode}</p>
                                                        </div>
                                                    )}
                                                    <h3 className="font-['Newsreader',sans-serif] text-[#2d3432] text-[20px] leading-[28px] mb-[4px]">{book.title}</h3>
                                                    <p className="font-['Manrope',sans-serif] text-[#59615f] text-[14px] leading-[20px]">{Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</p>
                                                </div>
                                                {book.chapter && (
                                                    <div className="space-y-[8px]">
                                                        <div className="flex items-center justify-between text-[12px]">
                                                            <p className="font-['Manrope',sans-serif] text-[#59615f] leading-[16px]">Ch. {book.chapter.number}: {book.chapter.name}</p>
                                                            <p className="font-['Manrope',sans-serif] text-[#59615f] leading-[16px]">{book.progress}%</p>
                                                        </div>
                                                        <div className="bg-[#eaefec] h-[4px] rounded-full overflow-hidden">
                                                            <div className="bg-[#466464] h-full transition-all duration-300" style={{ width: `${book.progress}%` }} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Up Next Section */}
                    {upNext.length > 0 && (
                        <div className="space-y-[24px]">
                            <h2 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[20px] leading-[28px]">Up Next</h2>
                            <div className="space-y-[16px]">
                                {upNext.map((book) => (
                                    <button key={`upnext-${book.isbn}`} onClick={() => setSelectedBook(book)} className="bg-[#f1f4f2] rounded-[12px] p-[20px] flex gap-[16px] w-full text-left">
                                        {/* ... Content of Up Next card ... */}
                                        <div className="flex-1">
                                            <h3 className="font-['Newsreader',sans-serif] text-[#2d3432] text-[18px]">{book.title}</h3>
                                            <p className="text-[12px] text-[#59615f]">{book.progress}% Complete</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Current Curriculum Section */}
                    <div className="space-y-[24px]">
                        <div className="flex flex-col gap-[12px]">
                            <h2 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[20px] leading-[28px]">
                                Current Curriculum
                            </h2>

                            <div className="flex items-center justify-between w-full">
                                {/* 5. Add the Filter UI */}
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

                        {/* 6. Use the filtered list */}
                        <BookList
                            books={filteredBooks}
                            viewMode={viewMode}
                            onBookClick={(book) => setSelectedBook(book)}
                        />
                    </div>
                </div>
            </div>

            <BookPopup
                book={selectedBook}
                progress={selectedBook ? getProgressForBook(selectedBook.isbn) : undefined}
                onClose={() => setSelectedBook(null)}
                onOpenReader={() => {
                    if (selectedBook) {
                        openReader(selectedBook.isbn);
                    }
                    setSelectedBook(null);
                }}
                onViewNotes={() => setSelectedBook(null)}
                onAddToLibrary={(isbn) => addToLibrary(isbn)}
            />
        </div>
    );
}

