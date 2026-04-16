import { useState } from 'react';
import { NavTopAppBar, BottomNavBar } from './components/Layout';
import { SearchDiscovery } from './components/Search';
import { Insights } from './components/Insights';
import { Library } from './components/Library';
import { ReadingView } from './components/ReadingView';
import { BookProvider, useBooks } from './context/BookContext';


function AppContent() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('library');

    const { readingBookId, closeReader, allBooks, userLibrary, updateProgress } = useBooks();


    if (readingBookId) {
        const book = allBooks.find((b: any) => b.id == readingBookId || b.isbn == readingBookId);

        if (book && book.chapters && book.chapters.length > 0) {
            const progress = userLibrary.find((p) => p.isbn == readingBookId);

            const currentChapterId = progress?.currentChapterId || book.chapters[0].id;

            const handleNavigate = (chapterId: string | number) => {
                const chapterIndex = book.chapters.findIndex(c => c.id === chapterId);
                const totalChapters = book.chapters.length;

                const newProgressPercent = totalChapters > 1
                    ? Math.round((chapterIndex / (totalChapters - 1)) * 100)
                    : 100;

                updateProgress(readingBookId, newProgressPercent, chapterId);
            };

            return (
                <ReadingView
                    book={book}
                    currentChapterId={currentChapterId}
                    progressPercent={progress?.progressPercent || 0}
                    onNavigate={handleNavigate}
                    onClose={closeReader}
                />
            );
        }

        console.error("Reader opened but book not found for ID:", readingBookId);
        return <div>Error: Book not found.</div>;
    }

    return (
        <>
            <NavTopAppBar />

            <main className="flex-1 overflow-y-auto w-full">
                {currentScreen === 'library' && <Library />}
                {currentScreen === 'insights' && <Insights />}
                {currentScreen === 'search' && <SearchDiscovery />}
            </main>

            <BottomNavBar
                currentScreen={currentScreen}
                onNavigate={setCurrentScreen}
            />
        </>
    );
}

export default function App() {
    return (
        <BookProvider>
            <div className="flex items-center justify-center size-full w-screen h-screen bg-gray-400">
                <div className="relative w-[390px] h-[844px]">
                    <div className="absolute bg-[#f8faf8] content-stretch flex flex-col inset-0 items-center overflow-clip rounded-[44px]">
                        <AppContent />
                    </div>
                    {/* Home Indicator */}
                    <div className="absolute bottom-0 h-[34px] left-0 right-0 pointer-events-none">
                        <div className="mx-auto mt-[21px] bg-[#e4e9e7] h-[5px] rounded-[100px] w-[144px]" />
                    </div>
                </div>
            </div>
        </BookProvider>
    );
}