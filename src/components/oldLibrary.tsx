// import { useState } from 'react';
// import { BookPopup } from './BookPopup';
// import { useBooks } from '../context/BookContext.tsx';
// import type { Book } from '../types/book.ts';
//
//
// interface LibraryProps {
//   onOpenReader?: (book: Book) => void;
//   onNavigateToReader?: () => void;
// }
//
// type ViewMode = 'grid' | 'list';
//
// export function Library({ onOpenReader, onNavigateToReader }: LibraryProps) {
//   const [selectedBook, setSelectedBook] = useState<any>(null);
//   const [viewMode, setViewMode] = useState<ViewMode>('grid');
//
//
//   return (
//     <div className="flex-1 relative w-full overflow-hidden">
//       <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
//         <div className="space-y-[48px] px-[24px] pt-[48px] pb-[128px]">
//           {/* Header */}
//           <div className="space-y-[8px]">
//             <h1 className="font-['Newsreader',sans-serif] text-[#2d3432] text-[36px] leading-[40px]">
//               Your Curated Shelf
//             </h1>
//           </div>
//
//           {/* Active Study Section */}
//           <div className="space-y-[12px]">
//
//
//             {/* Manage Schedule Button */}
//             <button
//               className="bg-white border border-[#dde4e1] hover:bg-[#f8faf8] transition-colors rounded-[12px] p-[24px] w-full text-left"
//             >
//               <div className="flex items-center justify-between">
//                 <span className="font-['Manrope',sans-serif] font-bold text-[#466464] text-[14px] tracking-[-0.35px] leading-[20px]">
//                   Manage Curriculum
//                 </span>
//                 <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
//                   <path d="M6 12L10 8L6 4" stroke="#466464" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>
//             </button>
//
//             {/* Open Reader Button */}
//             <button
//               onClick={() => onNavigateToReader && onNavigateToReader()}
//               className="bg-white border border-[#dde4e1] hover:bg-[#f8faf8] transition-colors rounded-[12px] px-[24px] py-[12px] w-full text-left"
//             >
//               <div className="flex items-center justify-between">
//                 <span className="font-['Manrope',sans-serif] font-bold text-[#466464] text-[14px] tracking-[-0.35px] leading-[20px]">
//                   Up Next (Reader)
//                 </span>
//                 <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
//                   <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>
//             </button>
//           </div>
//
//
//
//           {/* My Curriculum */}
//           <div className="pt-[16px] space-y-[32px]">
//             <div className="flex items-center justify-between">
//               <h2 className="font-['Newsreader',sans-serif] text-[#2d3432] text-[24px] leading-[32px]">
//                 My Curriculum
//               </h2>
//               <div className="flex items-center gap-[12px]">
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className="w-[24px] h-[24px] flex items-center justify-center"
//                 >
//                   <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
//                     <rect width="18" height="4" fill={viewMode === 'list' ? '#4A6767' : '#ACB3B1'} rx="1" />
//                     <rect width="18" height="4" y="7" fill={viewMode === 'list' ? '#4A6767' : '#ACB3B1'} rx="1" />
//                     <rect width="18" height="4" y="14" fill={viewMode === 'list' ? '#4A6767' : '#ACB3B1'} rx="1" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className="w-[24px] h-[24px] flex items-center justify-center"
//                 >
//                   <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
//                     <rect width="7" height="7" fill={viewMode === 'grid' ? '#4A6767' : '#ACB3B1'} rx="1" />
//                     <rect width="7" height="7" x="11" fill={viewMode === 'grid' ? '#4A6767' : '#ACB3B1'} rx="1" />
//                     <rect width="7" height="7" y="11" fill={viewMode === 'grid' ? '#4A6767' : '#ACB3B1'} rx="1" />
//                     <rect width="7" height="7" x="11" y="11" fill={viewMode === 'grid' ? '#4A6767' : '#ACB3B1'} rx="1" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//
//             {viewMode === 'grid' ? (
//               <div className="grid grid-cols-2 gap-[24px]">
//                 {LIBRARY_DATA.curriculum.map((book) => (
//                   <button
//                     key={book.id}
//                     onClick={() => setSelectedBook(book)}
//                     className="relative text-left"
//                   >
//                     <div className="aspect-[3/4] bg-[#e4e9e7] rounded-[8px] shadow-sm overflow-hidden relative">
//                       <img
//                         alt={book.title}
//                         className="h-full w-[133.33%] object-cover"
//                         src={book.coverImage}
//                       />
//                       <div className="absolute top-[8px] left-[8px] backdrop-blur-sm bg-white/90 px-[6px] py-[2px] rounded-[4px] shadow-sm">
//                         <p className="font-['Manrope',sans-serif] font-bold text-[#466464] text-[9px] leading-[13.5px]">
//                           {book.courseCode}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="font-['Manrope',sans-serif] font-bold text-[#59615f] text-[9px] tracking-[0.9px] uppercase leading-[13.5px] mt-[16px]">
//                       {book.category}
//                     </p>
//                     <h3 className="font-['Newsreader',sans-serif] text-[#2d3432] text-[18px] leading-[22.5px] mt-[4px]">
//                       {book.title.includes('Vol.') ? (
//                         <>
//                           {book.title.split('Vol.')[0]}<br />Vol.{book.title.split('Vol.')[1]}
//                         </>
//                       ) : book.title.includes('of') ? (
//                         <>
//                           {book.title.split(' of ')[0]} of<br />{book.title.split(' of ')[1]}
//                         </>
//                       ) : (
//                         book.title
//                       )}
//                     </h3>
//                     <p className="font-['Manrope',sans-serif] text-[#59615f] text-[11px] tracking-[1.1px] uppercase leading-[16.5px] opacity-70 mt-[3px]">
//                       {book.author}
//                     </p>
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-[16px]">
//                 {LIBRARY_DATA.curriculum.map((book) => (
//                   <button
//                     key={book.id}
//                     onClick={() => setSelectedBook(book)}
//                     className="flex gap-[16px] p-[12px] rounded-[8px] hover:bg-[#f8faf8] w-full text-left"
//                   >
//                     <div className="bg-[#e4e9e7] rounded-[6px] shadow-sm overflow-hidden w-[48px] h-[72px] flex-shrink-0">
//                       <img
//                         alt={book.title}
//                         className="h-full w-[150%] object-cover"
//                         src={book.coverImage}
//                       />
//                     </div>
//                     <div className="flex-1 flex flex-col justify-center">
//                       <p className="font-['Manrope',sans-serif] font-bold text-[#59615f] text-[9px] tracking-[0.9px] uppercase leading-[13.5px] mb-[4px]">
//                         {book.category}
//                       </p>
//                       <h4 className="font-['Newsreader',sans-serif] text-[#2d3432] text-[16px] leading-[20px] mb-[2px]">
//                         {book.title}
//                       </h4>
//                       <p className="font-['Manrope',sans-serif] text-[#59615f] text-[11px] tracking-[1.1px] uppercase leading-[16.5px] opacity-70">
//                         {book.author}
//                       </p>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//
//       <BookPopup
//         book={selectedBook}
//         onClose={() => setSelectedBook(null)}
//         onOpenReader={() => {
//           if (onOpenReader && selectedBook) {
//             onOpenReader(selectedBook);
//           }
//           setSelectedBook(null);
//         }}
//         onViewNotes={() => {
//           console.log('View notes:', selectedBook?.title);
//           setSelectedBook(null);
//         }}
//
//       />
//
//
//     </div>
//   );
// }
