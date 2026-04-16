import { icons } from '../assets/svgPaths';
import imgUserAvatar from "../assets/pfp.png";

function AppLogo() {
    return (
        <div className="h-[24.379px] relative shrink-0 w-[47.133px]">
            <div className="absolute inset-[-3.59%_0_-3.08%_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.1333 26.0033">
                    <g id="AppLogo">
                        <path d={icons.logop4} stroke="var(--stroke-0, #4A6767)" strokeWidth="1.5" />
                        <path d={icons.logop2} stroke="var(--stroke-0, #4A6767)" strokeWidth="1.5" />
                        <path d={icons.logop3} stroke="var(--stroke-0, #4A6767)" strokeWidth="1.5" />
                        <path d={icons.logop1} stroke="var(--stroke-0, #4A6767)" strokeWidth="1.5" />
                    </g>
                </svg>
            </div>
        </div>
    );
}

export function NavTopAppBar() {
    return (
        <div className="bg-white content-stretch flex flex-col h-[63px] items-center justify-end relative shadow-[0px_-8px_24px_0px_rgba(0,0,0,0.04)] shrink-0 w-full">
            <div className="h-[63px] max-w-[1280px] relative shrink-0 w-full">
                <div className="flex flex-row items-center max-w-[inherit] size-full">
                    <div className="content-stretch flex items-center justify-between max-w-[inherit] px-[24px] py-[16px] relative size-full">
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                            <div className="content-stretch flex flex-col items-start relative shrink-0">
                                <AppLogo />
                            </div>
                            <div className="content-stretch flex flex-col h-[28px] items-center justify-center relative shrink-0 w-[185px]">
                                <div className="flex flex-col font-['Newsreader',sans-serif] font-normal italic justify-center leading-[0] relative shrink-0 text-[#4a6767] text-[24px] w-full">
                                    <p className="leading-[32px]">TextFlow</p>
                                </div>
                            </div>
                        </div>
                        <div className="content-stretch flex items-center relative shrink-0">
                            <div className="bg-[#f8faf8] content-stretch flex flex-col items-start overflow-clip relative rounded-[9999px] shrink-0 size-[32px]">
                                <div className="max-w-[32px] relative shrink-0 size-[32px]">
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUserAvatar} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface BottomNavBarProps {
    currentScreen: 'search' | 'insights' | 'library';
    onNavigate: (screen: 'search' | 'insights' | 'library') => void;
}

export function BottomNavBar({ currentScreen, onNavigate }: BottomNavBarProps) {
    return (
        <div
            className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.8)] flex items-center h-[86px] pb-[24px] pt-[8px] relative rounded-tl-[16px] rounded-tr-[16px] shadow-[0px_-4px_12px_0px_rgba(45,52,50,0.04)] w-full max-w-[390px] mx-auto"
            data-name="BottomNavBar"
        >
            {/* Library Button */}
            <button
                onClick={() => onNavigate('library')}
                className="flex flex-1 flex-col items-center justify-center h-full"
            >
                <div className={`flex flex-col items-center px-[16px] py-[4px] rounded-[12px] transition-colors ${
                    currentScreen === 'library' ? 'bg-[rgba(74,103,103,0.1)]' : ''
                }`}>
                    <div className="h-[16.5px] w-[22.5px] mb-[4px]">
                        <svg className="block size-full" fill="none" viewBox="0 0 22.5 16.5">
                            <path d={icons.libraryp1} stroke={currentScreen === 'library' ? '#4A6767' : '#A8A29E'} strokeWidth="2" />
                            <path d={icons.libraryp2} stroke={currentScreen === 'library' ? '#4A6767' : '#A8A29E'} strokeWidth="2" />
                            <path d={icons.libraryp3} stroke={currentScreen === 'library' ? '#4A6767' : '#A8A29E'} strokeWidth="2" />
                            <path d={icons.libraryp4} stroke={currentScreen === 'library' ? '#4A6767' : '#A8A29E'} strokeWidth="2" />
                            <path d={icons.libraryp5} stroke={currentScreen === 'library' ? '#4A6767' : '#A8A29E'} strokeWidth="2" />
                            <path d={icons.libraryp6} stroke={currentScreen === 'library' ? '#4A6767' : '#A8A29E'} strokeWidth="2" />
                        </svg>
                    </div>
                    <span className={`font-['Manrope',sans-serif] font-semibold text-[10px] tracking-[0.5px] uppercase ${
                        currentScreen === 'library' ? 'text-[#4a6767]' : 'text-[#a8a29e]'
                    }`}>
                        Library
                    </span>
                </div>
            </button>

            {/* Insights Button */}
            <button
                onClick={() => onNavigate('insights')}
                className="flex flex-1 flex-col items-center justify-center h-full"
            >
                <div className={`flex flex-col items-center px-[16px] py-[4px] rounded-[12px] transition-colors ${
                    currentScreen === 'insights' ? 'bg-[rgba(74,103,103,0.1)]' : ''
                }`}>
                    <div className="h-[25px] w-[20px] mb-[4px]">
                        <svg className="block size-full" fill="none" viewBox="0 0 20 25">
                            <path d={icons.insightLogoi} fill={currentScreen === 'insights' ? '#4A6767' : '#A8A29E'} />
                        </svg>
                    </div>
                    <span className={`font-['Manrope',sans-serif] font-semibold text-[10px] tracking-[0.5px] uppercase ${
                        currentScreen === 'insights' ? 'text-[#4a6767]' : 'text-[#a8a29e]'
                    }`}>
                        Insights
                    </span>
                </div>
            </button>

            {/* Search Button */}
            <button
                onClick={() => onNavigate('search')}
                className="flex flex-1 flex-col items-center justify-center h-full"
            >
                <div className={`flex flex-col items-center px-[16px] py-[4px] rounded-[12px] transition-colors ${
                    currentScreen === 'search' ? 'bg-[rgba(74,103,103,0.1)]' : ''
                }`}>
                    <div className="h-[22px] w-[18px] mb-[4px]">
                        <svg className="block size-full" fill="none" viewBox="0 0 18 22">
                            <path d={icons.searchIcon} fill={currentScreen === 'search' ? '#4A6767' : '#A8A29E'} />
                        </svg>
                    </div>
                    <span className={`font-['Manrope',sans-serif] font-semibold text-[10px] tracking-[0.5px] uppercase ${
                        currentScreen === 'search' ? 'text-[#4a6767]' : 'text-[#a8a29e]'
                    }`}>
                        Search
                    </span>
                </div>
            </button>
        </div>
    );
}