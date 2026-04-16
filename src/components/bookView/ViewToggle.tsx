type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
    viewMode: ViewMode;
    onViewChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex items-center gap-[12px]">
            <button
                onClick={() => onViewChange('list')}
                className="p-1 transition-opacity hover:opacity-70"
                aria-label="List View"
            >
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                    <rect width="18" height="4" fill={viewMode === 'list' ? '#4A6767' : '#ACB3B1'} rx="1" />
                    <rect width="18" height="4" y="7" fill={viewMode === 'list' ? '#4A6767' : '#ACB3B1'} rx="1" />
                    <rect width="18" height="4" y="14" fill={viewMode === 'list' ? '#4A6767' : '#ACB3B1'} rx="1" />
                </svg>
            </button>
            <button
                onClick={() => onViewChange('grid')}
                className="p-1 transition-opacity hover:opacity-70"
                aria-label="Grid View"
            >
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                    <rect width="7" height="7" fill={viewMode === 'grid' ? '#4A6767' : '#ACB3B1'} rx="1" />
                    <rect width="7" height="7" x="11" fill={viewMode === 'grid' ? '#4A6767' : '#ACB3B1'} rx="1" />
                    <rect width="7" height="7" y="11" fill={viewMode === 'grid' ? '#4A6767' : '#ACB3B1'} rx="1" />
                    <rect width="7" height="7" x="11" y="11" fill={viewMode === 'grid' ? '#4A6767' : '#ACB3B1'} rx="1" />
                </svg>
            </button>
        </div>
    );
}