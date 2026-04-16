import { useState } from 'react';

interface FilterDropdownProps {
    label: string;
    options: string[];
    selectedOption: string | null;
    onOptionChange: (option: string | null) => void;
    allLabel?: string;
}

export function FilterDropdown({
                                   label,
                                   options,
                                   selectedOption,
                                   onOptionChange,
                                   allLabel = "All"
                               }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
        <button
            onClick={() => setIsOpen(!isOpen)}
    className="flex items-center gap-[8px] group"
    >
    <span className="font-['Manrope',sans-serif] font-semibold text-[#59615f] text-[12px] tracking-[0.5px] uppercase group-hover:text-[#4a6767]">
        {selectedOption ? selectedOption : label}
        </span>
        <svg className={`w-[12px] h-[8px] transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 12 8">
    <path d="M1.41 0.294922L6 4.87492L10.59 0.294922L12 1.70492L6 7.70492L0 1.70492L1.41 0.294922Z" fill="#59615F" />
        </svg>
        </button>

    {isOpen && (
        <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
    <div className="absolute top-full left-0 mt-[8px] bg-white rounded-[8px] shadow-lg border border-[#e4e9e7] py-[8px] min-w-[160px] max-h-[300px] overflow-y-auto z-20">
        {/* all option */}
        <button
        onClick={() => {
        onOptionChange(null);
        setIsOpen(false);
    }}
        className={`w-full text-left px-[16px] py-[8px] font-['Manrope',sans-serif] text-[14px] leading-[20px] hover:bg-[#f8faf8] ${
            selectedOption === null ? 'text-[#4a6767] font-bold' : 'text-[#2d3432]'
        }`}
    >
        {allLabel}
        </button>

        {/* dynamic options */}
        {options.map((option) => (
            <button
                key={option}
            onClick={() => {
            onOptionChange(option);
            setIsOpen(false);
        }}
            className={`w-full text-left px-[16px] py-[8px] font-['Manrope',sans-serif] text-[14px] leading-[20px] hover:bg-[#f8faf8] ${
                selectedOption === option ? 'text-[#4a6767] font-bold' : 'text-[#2d3432]'
            }`}
        >
            {option}
            </button>
        ))}
        </div>
        </>
    )}
    </div>
);
}