import React from 'react';
import { icons } from '../assets/svgPaths';
import { BookPopup } from './BookPopup';
import type { Book } from '../types/book';
import {useBooks} from "../context/BookContext.tsx";

export interface BooksData {
    featured?: Book;
    recommended: Book[];
    trending: (Book & { trendingRank?: number })[];
    recentlyAdded: (Book & { displayAddedTime?: string })[];
}

interface SearchContentProps {
    booksData: BooksData;
    onSearch: (term: string) => void;
    onOpenReader?: (book: Book) => void;
}

export function SearchContent({ booksData, onSearch, onOpenReader }: SearchContentProps) {
    const [searchInput, setSearchInput] = React.useState('');
    const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
    const { getProgressForBook, addToLibrary } = useBooks();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            onSearch(searchInput.trim());
        }
    };

    const handleOpenBook = (book: Book) => {
        if (onOpenReader) onOpenReader(book);
        setSelectedBook(null);
    };

    return (
        <div className="flex-1 relative w-full overflow-hidden">
            <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                <div className="px-[24px] py-[32px] space-y-[24px]">

                    {/* Search Header Section */}
                    <div className="w-[342px]">
                        <div className="relative mb-[24px]">
                            <form onSubmit={handleSubmit} className="bg-[#f1f4f2] relative rounded-[12px] w-full">
                                <div className="flex items-center pl-[56px] pr-[24px] py-[16px]">
                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        // onFocus={() => setIsSearchFocused(true)}
                                        // onBlur={() => setIsSearchFocused(false)}
                                        placeholder="Search books, authors, ISBNs..."
                                        className="flex-1 bg-transparent outline-none font-['Manrope',sans-serif] text-[#2d3432] text-[18px] placeholder:text-[#acb3b1]"
                                    />
                                </div>
                                <button type="submit" className="absolute left-[20px] top-1/2 -translate-y-1/2">
                                    <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                                        <path d={icons.searchIcon} fill="#757C7A" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Recommended Section */}
                    <div className="w-[342px]">
                        <div className="mb-[32px]">
                            <h2 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[24px] leading-[32px]">
                                Recommended for<br />Your Courses
                            </h2>
                        </div>

                        <div className="space-y-[24px]">
                            {booksData.recommended.length > 0 && booksData.recommended[0] && (
                                <div
                                    onClick={() => setSelectedBook(booksData.recommended[0])}
                                    className="bg-[#f1f4f2] rounded-[12px] p-[25px] border border-[rgba(172,179,177,0.05)] cursor-pointer"
                                >
                                    <div className="mb-[24px]">
                                        <div className="bg-white rounded-[8px] shadow-sm overflow-hidden h-[389.33px] relative">
                                            <img alt={booksData.recommended[0].title} className="absolute h-full w-[133.33%] object-cover" src={booksData.recommended[0].coverImage} />
                                        </div>
                                    </div>
                                    <p className="font-['Manrope',sans-serif] font-bold text-[#466464] text-[10px] tracking-[1px] uppercase leading-[15px] mb-[4px]">
                                        {booksData.recommended[0].categories?.[0] || 'General'}
                                    </p>
                                    <h3 className="font-['Newsreader',sans-serif] text-[#2d3432] text-[20px] leading-[28px] mb-[4px]">{booksData.recommended[0].title}</h3>
                                    <p className="font-['Manrope',sans-serif] text-[#59615f] text-[12px] leading-[16px]">{booksData.recommended[0].courseCode}</p>
                                </div>
                            )}

                            {/* Large Feature Card */}
                            {booksData.featured && (
                                <div
                                    className="bg-white rounded-[12px] border border-[rgba(172,179,177,0.1)] shadow-[0px_4px_24px_0px_rgba(45,52,50,0.04)] overflow-hidden cursor-pointer"
                                >
                                    <div className="p-[32px]" onClick={() => setSelectedBook(booksData.featured!)}>
                                        {booksData.featured.required && (
                                            <div className="flex items-center gap-[8px] mb-[30px]">
                                                <div className="bg-[#a83836] rounded-full size-[8px]" />
                                                <p className="font-['Manrope',sans-serif] font-extrabold text-[#a83836] text-[10px] tracking-[1px] uppercase">Required for {booksData.featured.courseCode}</p>
                                            </div>
                                        )}
                                        <h3 className="font-['Newsreader',sans-serif] text-[#2d3432] text-[30px] leading-[37.5px] mb-[8.5px]">
                                            {booksData.featured.title}
                                        </h3>
                                        <p className="font-['Newsreader',sans-serif] italic text-[#59615f] text-[14px] leading-[20px] mb-[24px]">
                                            {booksData.featured.authors?.join(', ')}
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenBook(booksData.featured!);
                                            }}
                                            className="bg-[#466464] px-[32px] py-[12px] rounded-[8px] flex items-center gap-[8px] hover:bg-[#395757] transition-colors"
                                        >
                                            <svg className="w-[12.833px] h-[9.333px]" fill="none" viewBox="0 0 12.8333 9.33333">
                                                <path d={icons.bookIcon} fill="#E0FFFE" />
                                            </svg>
                                            <span className="font-['Manrope',sans-serif] font-bold text-[#e0fffe] text-[14px] leading-[20px]">Start Reading</span>
                                        </button>
                                    </div>
                                    <div className="h-[256px] relative overflow-hidden" onClick={() => setSelectedBook(booksData.featured!)}>
                                        <img alt={booksData.featured.title} className="absolute h-[132.81%] left-0 top-[-16.41%] w-full object-cover" src={booksData.featured.coverImage} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Trending Section */}
                    {booksData.trending.length > 0 && (
                        <div className="w-[342px] pt-[16px]">
                            <div className="mb-[32px]">
                                <h2 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[24px] leading-[32px] mb-0">Trending in Your Major</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-[32px]">
                                {booksData.trending.map((book) => (
                                    <div key={book.isbn} onClick={() => setSelectedBook(book)} className="cursor-pointer">
                                        <div className="bg-[#eaefec] rounded-[8px] shadow-sm overflow-hidden h-[232.5px] relative mb-[12px]">
                                            <img alt={book.title} className="absolute h-full w-[150%] object-cover" src={book.coverImage} />
                                            {book.trendingRank && (
                                                <div className="absolute bottom-[8px] right-[8px] backdrop-blur-sm bg-white/90 px-[8px] py-[4px] rounded-[4px]">
                                                    <p className="font-['Manrope',sans-serif] font-bold text-[#466464] text-[10px]">#{book.trendingRank} TRENDING</p>
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[14px] leading-[17.5px] mb-[4px]">{book.title}</h4>
                                        <p className="font-['Newsreader',sans-serif] italic text-[#59615f] text-[12px]">{book.authors?.[0]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recently Added */}
                    {booksData.recentlyAdded.length > 0 && (
                        <div className="w-[342px] pt-[16px] space-y-[48px]">
                            <div>
                                <h3 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[20px] leading-[28px] mb-[24px]">Recently Added</h3>
                                <div className="space-y-[16px]">
                                    {booksData.recentlyAdded.map((book) => (
                                        <div key={book.isbn} onClick={() => setSelectedBook(book)} className="rounded-[12px] flex items-center gap-[16px] p-[16px] cursor-pointer hover:bg-[#f8faf8]">
                                            <div className="bg-[#eaefec] rounded-[4px] overflow-hidden w-[48px] h-[64px] flex-shrink-0">
                                                <img alt={book.title} className="h-full w-[133.33%] object-cover" src={book.coverImage} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[14px]">{book.title}</h4>
                                                <p className="font-['Newsreader',sans-serif] text-[#59615f] text-[12px]">Added {book.displayAddedTime}</p>
                                            </div>
                                            <svg className="w-[7.4px] h-[12px] flex-shrink-0" fill="none" viewBox="0 0 7.4 12">
                                                <path d={icons.rightArrow} fill="#ACB3B1" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
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