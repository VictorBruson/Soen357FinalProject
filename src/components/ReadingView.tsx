import { useMemo } from 'react';
import { icons } from '../assets/svgPaths';
import type { Book, Chapter, ContentBlock } from '../types/book';

interface ReadingViewProps {
    book: Book;
    currentChapterId: string | number;
    onClose: () => void;
    onNavigate: (chapterId: string | number) => void;
    progressPercent?: number;
}

export function ReadingView({
                                book,
                                currentChapterId,
                                onClose,
                                onNavigate,
                                progressPercent = 0
                            }: ReadingViewProps) {

    const { currentChapter, prevChapter, nextChapter } = useMemo(() => {
        const index = book.chapters.findIndex(c => c.id === currentChapterId);
        return {
            currentChapter: book.chapters[index] as Chapter | undefined,
            prevChapter: index > 0 ? book.chapters[index - 1] : null,
            nextChapter: index < book.chapters.length - 1 ? book.chapters[index + 1] : null,
        };
    }, [book.chapters, currentChapterId]);

    if (!currentChapter) return null;


    const renderBlock = (block: ContentBlock, index: number) => {
        switch (block.type) {
            case 'heading':
                if (block.level === 1) {
                    return <h1 key={block.id || index} className="font-['Newsreader',sans-serif] italic text-[#2d3432] text-[48px] leading-[60px] mb-[16px]">{block.text}</h1>;
                }
                if (block.level === 2) {
                    return <h2 key={block.id || index} className="font-['Manrope',sans-serif] font-extrabold text-[#2d3432] text-[24px] tracking-[-0.6px] leading-[32px] mb-[24px] mt-[48px]">{block.text}</h2>;
                }
                return <h3 key={block.id || index} className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[18px] leading-[24px] mb-[16px] mt-[32px]">{block.text}</h3>;

            case 'paragraph':
                return <p key={block.id || index} className="font-['Newsreader',sans-serif] text-[#2d3432] text-[18px] leading-[32.4px] mb-[32px]">{block.text}</p>;

            case 'quote':
                return (
                    <div key={block.id || index} className="bg-[#f1f4f2] border-l-2 border-[#466464] rounded-[8px] p-[32px] my-[32px]">
                        <blockquote className="font-['Newsreader',sans-serif] text-[#2d3432] text-[18px] leading-[32.4px] italic">{block.text}</blockquote>
                    </div>
                );

            case 'list':
                return (
                    <ul key={block.id || index} className="space-y-[24px] my-[32px]">
                        {block.items?.map((item, i) => (
                            <li key={i} className="flex gap-[16px] items-start">
                                <div className="bg-[#c8e9e8] rounded-full size-[32px] flex items-center justify-center flex-shrink-0">
                                    <span className="font-['Manrope',sans-serif] font-bold text-[#395757] text-[12px]">
                                        {(i + 1).toString().padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="flex-1 font-['Manrope',sans-serif] text-[#2d3432] text-[16px] leading-[24px]">
                                    {item}
                                </div>
                            </li>
                        ))}
                    </ul>
                );

            case 'image':
                return (
                    <figure key={block.id || index} className="my-[32px] -mx-[16px]">
                        <div className="bg-[#e4e9e7] rounded-[12px] overflow-hidden">
                            <img src={block.src} alt={block.caption} className="w-full mix-blend-multiply opacity-80" />
                        </div>
                        {block.caption && (
                            <figcaption className="text-center px-[16px] pt-[15.25px]">
                                <p className="font-['Manrope',sans-serif] text-[#59615f] text-[11px] tracking-[0.275px] leading-[16.5px]">
                                    {block.caption}
                                </p>
                            </figcaption>
                        )}
                    </figure>
                );

            case 'code':
                return (
                    <pre key={block.id || index} className="bg-[#2d3432] text-[#f8faf8] p-[24px] rounded-[12px] overflow-x-auto mb-[32px] font-mono text-[14px]">
                        <code>{block.code}</code>
                    </pre>
                );

            default:
                return null;
        }
    };

    return (
        <div className="absolute inset-0 bg-[#f8faf8] z-50 overflow-hidden">
            {/* Navigation Header */}
            <div className="absolute bg-white border-b border-[rgba(221,228,225,0.2)] left-0 right-0 top-0 z-10">
                <div className="flex items-center justify-between px-[24px] py-[16px]">
                    <div className="flex gap-[16px] items-center">
                        <button onClick={onClose} className="flex items-center justify-center rounded-full size-[40px]">
                            <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                                <path d={icons.backArrow} fill="#466464" />
                            </svg>
                        </button>

                        <div className="flex flex-col">
                            <div className="flex gap-[8px] items-center">
                                {book.courseCode && (
                                    <div className="bg-[rgba(70,100,100,0.1)] px-[6px] py-[2px] rounded-[2px]">
                                        <p className="font-['Manrope',sans-serif] font-semibold text-[#466464] text-[9px] tracking-[1.35px] uppercase leading-[13.5px]">
                                            {book.courseCode}
                                        </p>
                                    </div>
                                )}
                                <p className="font-['Manrope:Medium',sans-serif] font-medium text-[#59615f] text-[9px] tracking-[0.9px] uppercase leading-[13.5px]">
                                    Chapter {currentChapter.number?.toString().padStart(2, '0') || '--'}
                                </p>
                            </div>
                            <h1 className="font-['Manrope',sans-serif] font-bold text-[#466464] text-[14px] tracking-[-0.35px] leading-[20px]">
                                {book.title}
                            </h1>
                        </div>

                        <div className="absolute bg-[#eaefec] h-[4px] left-0 bottom-0 right-0">
                            <div
                                className="absolute bg-[#466464] h-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-[8px] items-center">
                        <button className="flex items-center justify-center p-[8px] rounded-full">
                            <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                                <path d={icons.searchIcon} fill="#59615F" />
                            </svg>
                        </button>
                        <button className="flex items-center justify-center p-[8px] rounded-full">
                            <svg className="w-[20.1px] h-[20px]" fill="none" viewBox="0 0 20.1 20">
                                <path d={icons.settingIcon} fill="#59615F" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="absolute inset-0 top-[123px] bottom-[128px] overflow-y-auto scrollbar-hide">
                <div className="px-[24px] pt-[64px] pb-[128px]">
                    <div className="max-w-[652.6px] mx-auto">
                        <div className="reading-content">
                            {currentChapter.content.map((block, index) => renderBlock(block, index))}
                        </div>

                        {/* Footer Navigation */}
                        <div className="border-t border-[#dde4e1] pt-[25px] mt-[64px] flex items-start justify-between">
                            {prevChapter && (
                                <button onClick={() => onNavigate(prevChapter.id)} className="flex gap-[16px] items-center text-left">
                                    <div className="bg-[#eaefec] rounded-full size-[24px] flex items-center justify-center scale-y-[-1]">
                                        <svg className="w-[7.4px] h-[12px]" fill="none" viewBox="0 0 7.4 12">
                                            <path d={icons.leftArrow} fill="#59615F" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-['Manrope',sans-serif] text-[#59615f] text-[10px] tracking-[1px] uppercase leading-[15px]">
                                            Previous Chapter
                                        </p>
                                        <p className="font-['Newsreader',sans-serif] text-[#2d3432] text-[18px] leading-[28px]">
                                            {prevChapter.title}
                                        </p>
                                    </div>
                                </button>
                            )}

                            {nextChapter && (
                                <button onClick={() => onNavigate(nextChapter.id)} className="flex gap-[16px] items-center ml-auto text-right">
                                    <div>
                                        <p className="font-['Manrope',sans-serif] text-[#59615f] text-[10px] tracking-[1px] uppercase leading-[15px]">
                                            Next Chapter
                                        </p>
                                        <p className="font-['Newsreader',sans-serif] text-[#2d3432] text-[18px] leading-[28px]">
                                            {nextChapter.title.length > 20 ? `${nextChapter.title.substring(0, 17)}...` : nextChapter.title}
                                        </p>
                                    </div>
                                    <div className="bg-[#eaefec] rounded-full size-[24px] flex items-center justify-center">
                                        <svg className="w-[7.4px] h-[12px]" fill="none" viewBox="0 0 7.4 12">
                                            <path d={icons.rightArrow} fill="#59615F" />
                                        </svg>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Annotation Toolbar */}
            <div className="absolute bottom-[40.77px] left-0 right-0 flex justify-center">
                <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.8)] border border-[rgba(255,255,255,0.2)] shadow-[0px_-4px_24px_0px_rgba(45,52,50,0.06)] flex gap-[24px] items-center justify-center px-[25px] py-[13px] rounded-full">
                    <ToolbarButton icon="edit_note" label="Annotate" active />
                    <ToolbarButton icon="brush" label="Highlight" />
                    <ToolbarButton icon="translate" label="Define" />
                    <div className="bg-[#dde4e1] h-[24px] w-px" />
                    <ToolbarButton icon="sticky_note_2" label="Notes" />
                </div>
            </div>
        </div>
    );
}

function ToolbarButton({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
    return (
        <button className={`flex flex-col gap-[2.5px] items-center ${active ? 'text-[#466464]' : 'text-[#59615f]'}`}>
            <span className="font-['Material_Symbols_Outlined',sans-serif] text-[24px] leading-[24px]">{icon}</span>
            <span className={`font-['Manrope',sans-serif] ${active ? 'font-bold' : 'font-semibold'} text-[9px] tracking-[-0.45px] uppercase leading-[13.5px]`}>
                {label}
            </span>
        </button>
    );
}