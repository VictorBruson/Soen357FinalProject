import type { Book, ReadingProgress } from '../types/book';

interface BookPopupProps {
    book: Book | null;
    progress?: ReadingProgress; // If this is undefined, the book isn't in the library
    onClose: () => void;
    onOpenReader: () => void;
    onViewNotes: () => void;
    onAddToLibrary: (id: string | number) => void; // Added this prop
}

export function BookPopup({
                              book,
                              progress,
                              onClose,
                              onOpenReader,
                              onViewNotes,
                              onAddToLibrary
                          }: BookPopupProps) {
    if (!book) return null;

    const currentChapter = book.chapters.find(c => c.id === progress?.currentChapterId) || book.chapters[0];
    const authorsString = book.authors?.join(', ') || 'Unknown Author';

    // Check if the book is already in the library
    const isInLibrary = !!progress;

    return (
        <>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 z-40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Popup */}
            <div className="absolute inset-x-0 bottom-0 z-50 animate-slide-up">
                <div className="bg-white rounded-t-[24px] shadow-[0px_-4px_24px_0px_rgba(45,52,50,0.12)] max-h-[80vh] overflow-hidden">
                    {/* Handle bar */}
                    <div className="flex justify-center pt-[12px] pb-[8px]">
                        <div className="bg-[#dde4e1] h-[4px] w-[40px] rounded-full" />
                    </div>

                    <div className="px-[24px] pb-[32px] pt-[16px] space-y-[24px] overflow-y-auto max-h-[calc(80vh-44px)]">
                        {/* Book Info Section */}
                        <div className="flex gap-[20px] relative">
                            <div className="bg-[#eaefec] rounded-[8px] overflow-hidden w-[100px] h-[150px] flex-shrink-0 shadow-md">
                                <img
                                    alt={book.title}
                                    className="h-full w-full object-cover"
                                    src={book.coverImage || '/placeholder-book.png'}
                                />
                            </div>
                            <div className="flex-1 space-y-[12px]">
                                {book.courseCode && (
                                    <div className="bg-[#c8e9e8] px-[10px] py-[4px] rounded-[6px] inline-block">
                                        <p className="font-['Manrope',sans-serif] font-bold text-[#395757] text-[11px] tracking-[1px] uppercase leading-[15px]">
                                            {book.courseCode}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <h2 className="font-['Newsreader',sans-serif] text-[#2d3432] text-[24px] leading-[30px] mb-[6px]">
                                        {book.title}
                                    </h2>
                                    <p className="font-['Manrope',sans-serif] text-[#59615f] text-[14px] leading-[20px]">
                                        {authorsString}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Progress Section - Only show if in library */}
                        {isInLibrary ? (
                            <div className="bg-[#f1f4f2] rounded-[12px] p-[20px] space-y-[12px]">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[14px] leading-[20px]">
                                        Reading Progress
                                    </h3>
                                    <p className="font-['Manrope',sans-serif] font-bold text-[#466464] text-[16px] leading-[20px]">
                                        {Math.round(progress.progressPercent)}%
                                    </p>
                                </div>
                                <div className="bg-[#dde4e1] h-[6px] rounded-full overflow-hidden">
                                    <div
                                        className="bg-[#466464] h-full transition-all duration-300"
                                        style={{ width: `${progress.progressPercent}%` }}
                                    />
                                </div>
                                {currentChapter && (
                                    <p className="font-['Manrope',sans-serif] text-[#59615f] text-[13px] leading-[18px] mt-[8px]">
                                        Chapter {currentChapter.number || ''}: {currentChapter.title}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="bg-[#f8faf8] rounded-[12px] p-[20px] border border-dashed border-[#dde4e1]">
                                <p className="font-['Manrope',sans-serif] text-[#59615f] text-[14px] text-center">
                                    This book is not in your library yet.
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-[12px] pt-[8px]">
                            {isInLibrary ? (
                                <>
                                    <button
                                        onClick={onOpenReader}
                                        className="bg-[#466464] w-full py-[14px] rounded-[10px] shadow-[0px_4px_12px_0px_rgba(70,100,100,0.2)] active:scale-[0.98] transition-transform"
                                    >
                                        <span className="font-['Manrope',sans-serif] font-bold text-[#e0fffe] text-[15px] tracking-[0.3px] leading-[20px]">
                                            Continue Reading
                                        </span>
                                    </button>
                                    <button
                                        onClick={onViewNotes}
                                        className="bg-white border-2 border-[#466464] w-full py-[14px] rounded-[10px] active:scale-[0.98] transition-transform"
                                    >
                                        <span className="font-['Manrope',sans-serif] font-bold text-[#466464] text-[15px] tracking-[0.3px] leading-[20px]">
                                            View Notes & Annotations
                                        </span>
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => onAddToLibrary(book.isbn)}
                                    className="bg-[#466464] w-full py-[14px] rounded-[10px] shadow-[0px_4px_12px_0px_rgba(70,100,100,0.2)] active:scale-[0.98] transition-transform"
                                >
                                    <span className="font-['Manrope',sans-serif] font-bold text-[#e0fffe] text-[15px] tracking-[0.3px] leading-[20px]">
                                        Download to My Library
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}