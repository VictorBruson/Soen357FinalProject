import { useState } from 'react';

export type SortOption = 'relevance' | 'title-asc' | 'title-desc' | 'author-asc' | 'author-desc';

interface SortDropdownProps {
    currentSort: SortOption;
    onSortChange: (option: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Relevance' },
{ value: 'title-asc', label: 'Title (A-Z)' },
{ value: 'title-desc', label: 'Title (Z-A)' },
{ value: 'author-asc', label: 'Author (A-Z)' },
{ value: 'author-desc', label: 'Author (Z-A)' },
];

export function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
const [isOpen, setIsOpen] = useState(false);

    return (
    <div className="relative">
    <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center gap-[8px] group"
    >
    <span className="font-['Manrope',sans-serif] font-semibold text-[#59615f] text-[12px] tracking-[0.5px] uppercase group-hover:text-[#4a6767]">
    SORT
    </span>
    <svg className={`w-[12px] h-[8px] transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 12 8">
<path d="M1.41 0.294922L6 4.87492L10.59 0.294922L12 1.70492L6 7.70492L0 1.70492L1.41 0.294922Z" fill="#59615F" />
</svg>
</button>

{isOpen && (
<>
<div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
<div className="absolute top-full left-0 mt-[8px] bg-white rounded-[8px] shadow-lg border border-[#e4e9e7] py-[8px] min-w-[160px] z-20">
{sortOptions.map((option) => (
<button
key={option.value}
    onClick={() => {
onSortChange(option.value);
setIsOpen(false);
}}
    className={`w-full text-left px-[16px] py-[8px] font-['Manrope',sans-serif] text-[14px] leading-[20px] hover:bg-[#f8faf8] ${
                                    currentSort === option.value ? 'text-[#4a6767] font-bold' : 'text-[#2d3432]'
                                }`}
>
{option.label}
</button>
))}
</div>
</>
)}
</div>
);
}