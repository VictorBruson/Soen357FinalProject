import type { Book } from '../../types/book.ts';

interface BookListProps {
    books: Book[];
    viewMode: 'grid' | 'list';
    onBookClick: (book: Book) => void;
}

export function BookList({ books, viewMode, onBookClick }: BookListProps) {
    const getAuthorString = (book: Book) => book.authors?.join(', ') || '';

    if (viewMode === 'grid') {
        return (
            <div className="grid grid-cols-2 gap-x-[16px] gap-y-[24px]">
                {books.map((book) => (
                    <div
                        key={book.isbn}
                        onClick={() => onBookClick(book)}
                        className="flex flex-col cursor-pointer group"
                    >
                        <div className="bg-[#eaefec] rounded-[8px] shadow-sm overflow-hidden aspect-[3/4] relative mb-[12px]">
                            {book.coverImage ? (
                                <img
                                    alt={book.title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    src={book.coverImage}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-[#acb3b1] text-[12px]">No Cover</div>
                            )}
                            {book.required && (
                                <div className="absolute top-2 left-2 bg-[#4A6767] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    REQUIRED
                                </div>
                            )}
                        </div>
                        <h4 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[14px] leading-[1.3] mb-[4px] line-clamp-2">
                            {book.title}
                        </h4>
                        <p className="font-['Newsreader',sans-serif] italic text-[#59615f] text-[12px] leading-[16px] truncate">
                            {getAuthorString(book)}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-[16px]">
            {books.map((book) => (
                <div
                    key={book.isbn}
                    onClick={() => onBookClick(book)}
                    className="flex gap-[16px] cursor-pointer hover:bg-[#f8faf8] p-[8px] rounded-[8px] -m-[8px] transition-colors"
                >
                    <div className="bg-[#eaefec] rounded-[8px] shadow-sm overflow-hidden w-[64px] h-[96px] flex-shrink-0 relative">
                        <img
                            alt={book.title}
                            className="h-full w-full object-cover"
                            src={book.coverImage || '/placeholder-cover.jpg'}
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-start justify-between gap-2">
                            <h4 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[16px] leading-[20px] mb-[2px]">
                                {book.title}
                            </h4>
                            {book.required && (
                                <span className="text-[10px] font-bold text-[#4A6767] whitespace-nowrap mt-1">REQUIRED</span>
                            )}
                        </div>
                        <p className="font-['Newsreader',sans-serif] italic text-[#59615f] text-[14px] leading-[18px] mb-[4px]">
                            {getAuthorString(book)}
                        </p>
                        <div className="flex items-center gap-2 text-[#acb3b1] text-[12px]">
                            <span>ISBN: {book.isbn}</span>
                            {book.courseCode && <span>• {book.courseCode}</span>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}