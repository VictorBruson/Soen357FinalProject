import { useState, useEffect } from 'react';
import { icons } from '../assets/svgPaths';


const weeklyActivity = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 4.1 },
  { day: 'Thu', hours: 2.8 },
  { day: 'Fri', hours: 3.5 },
  { day: 'Sat', hours: 1.9 },
  { day: 'Sun', hours: 3.0 }
];


export function Insights() {
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [barHeights, setBarHeights] = useState(weeklyActivity.map(() => 0));
  const [viewPeriod, setViewPeriod] = useState<'week' | 'month'>('week');

  useEffect(() => {
    // Animate weekly progress bar
    const timer = setTimeout(() => {
      setWeeklyProgress(84);
    }, 300);

    // Animate activity bars
    const barTimers = weeklyActivity.map((_, index) =>
      setTimeout(() => {
        setBarHeights(prev => {
          const newHeights = [...prev];
          newHeights[index] = weeklyActivity[index].hours;
          return newHeights;
        });
      }, 500 + index * 100)
    );

    return () => {
      clearTimeout(timer);
      barTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

    return (
        <div className="h-full w-full overflow-y-auto scrollbar-hide">
            <div className="space-y-[48px] px-[24px] pt-[48px] pb-[128px]">
                {/* Header */}
                <div className="space-y-[8px]">
            <h1 className="text-[#2d3432] text-[36px] leading-[40px] tracking-[-0.9px] font-[Newsreader] font-normal">
              Study Insights
            </h1>
            <p className="font-['Newsreader',sans-serif] text-[#59615f] leading-[28px] font-[Manrope] text-[15px]">Your intellectual progress and reading patterns<br />over the last 7 days.</p>
          </div>

          {/* Summary Grid */}
          <div className="space-y-[24px]">
            {/* Streak Card */}
            <div className="bg-white rounded-[12px] shadow-[0px_4px_24px_0px_rgba(45,52,50,0.04)] px-[32px] py-[24px] min-h-[144px] flex flex-col justify-between relative overflow-hidden">
              <div>
                <p className="font-['Manrope',sans-serif] font-bold text-[#59615f] text-[10px] tracking-[1px] uppercase leading-[15px] mb-[4px]">Current Momentum</p>
                <h3 className="font-['Manrope',sans-serif] font-extrabold text-[#466464] text-[30px] leading-[36px]">
                  12 Day Streak
                </h3>
              </div>
              <div className="flex items-end justify-between">
                <p className="font-['Newsreader',sans-serif] italic text-[#59615f] text-[16px] leading-[24px]">
                  You're in the top 5% of readers this<br />month.
                </p>
              </div>
              <svg className="absolute top-0 right-0 w-[104px] h-[112px] opacity-10" fill="none" viewBox="0 0 104 112">
                <path d={icons.calendarIcon} fill="#2D3432" />
              </svg>
            </div>

            {/* Time Spent Card */}
            <div className="bg-transparent px-[32px] py-[16px] min-h-[112px] flex flex-col justify-between relative overflow-hidden">
              <div>
                <p className="font-['Manrope',sans-serif] font-bold text-[#59615f] text-[10px] tracking-[1px] uppercase leading-[15px] mb-[4px]">
                  Time Invested Today
                </p>
                <h3 className="font-['Manrope',sans-serif] font-extrabold text-[#2d3432] text-[30px] leading-[36px]">
                  3h 42m
                </h3>
              </div>
              <div className="flex items-end justify-between">
                <p className="font-['Newsreader',sans-serif] italic text-[#59615f] text-[16px] leading-[24px]">
                  Target: 4h daily average.
                </p>

              </div>
            </div>

            {/* Weekly Goal Card */}
            <div className="bg-transparent px-[32px] py-[16px] min-h-[112px] flex flex-col justify-between">
              <div>
                <p className="font-['Manrope',sans-serif] font-bold text-[#59615f] text-[10px] tracking-[1px] uppercase leading-[15px] mb-[4px]">
                  Weekly Goal
                </p>
                <div className="flex items-baseline gap-[8px]">
                  <h3 className="font-['Manrope',sans-serif] font-extrabold text-[#2d3432] text-[30px] leading-[36px]">
                    84%
                  </h3>
                  <p className="font-['Newsreader',sans-serif] italic text-[#59615f] text-[16px] leading-[24px]">
                    of 25 hours
                  </p>
                </div>
              </div>
              <div className="bg-[#dde4e1] h-[8px] rounded-full overflow-hidden">
                <div
                  className="bg-[#466464] h-full transition-all duration-1000 ease-out"
                  style={{ width: `${weeklyProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-[#f1f4f2] rounded-[12px] p-[32px] space-y-[40px]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Manrope',sans-serif] font-bold text-[#2d3432] text-[20px] leading-[28px]">
                Activity
              </h3>
              <div className="flex gap-[8px]">
                <button
                  onClick={() => setViewPeriod('week')}
                  className={`px-[12px] py-[4px] rounded-full font-['Manrope',sans-serif] font-bold text-[12px] tracking-[-0.6px] uppercase leading-[16px] ${
                    viewPeriod === 'week'
                      ? 'bg-[#dde4e1] text-[#2d3432]'
                      : 'text-[#59615f]'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewPeriod('month')}
                  className={`px-[12px] py-[4px] rounded-full font-['Manrope',sans-serif] font-bold text-[12px] tracking-[-0.6px] uppercase leading-[16px] ${
                    viewPeriod === 'month'
                      ? 'bg-[#dde4e1] text-[#2d3432]'
                      : 'text-[#59615f]'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-[192px] relative">
              <div className="flex items-end justify-between h-full px-[8px]">
                {weeklyActivity.map((data, index) => (
                  <div key={data.day} className="flex-1 flex flex-col items-center pt-[12px] h-full justify-end">
                    <div className="flex-1 flex items-end w-full px-[4px]">
                      <div
                        className="w-full bg-[#466464] rounded-t-[4px] transition-all duration-500 ease-out"
                        style={{
                          height: `${(barHeights[index] / maxHours) * 100}%`
                        }}
                      />
                    </div>
                    <p className="font-['Manrope',sans-serif] font-bold text-[#59615f] text-[10px] uppercase leading-[15px] mt-[12px]">
                      {data.day}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
