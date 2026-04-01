import { NextResponse } from 'next/server';

const CF_HANDLE = 'DeXTer-69';

interface ProcessedCFData {
  rating: number;
  rank: string;
  maxRating: number;
  maxRank: string;
  totalProblemsSolved: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  heatmap: number[]; // 364 cells (52 cols x 7 rows) matching the UI
}

export async function GET() {
  try {
    // 1. Fetch user info
    const userInfoRes = await fetch(
      `https://codeforces.com/api/user.info?handles=${CF_HANDLE}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    const userInfoData = await userInfoRes.json();
    
    // 2. Fetch user status (submissions)
    const userStatusRes = await fetch(
      `https://codeforces.com/api/user.status?handle=${CF_HANDLE}`,
      { next: { revalidate: 3600 } }
    );
    const userStatusData = await userStatusRes.json();

    if (userInfoData.status !== 'OK' || userStatusData.status !== 'OK') {
      return NextResponse.json(
        { error: 'Failed to fetch from Codeforces API' },
        { status: 500 }
      );
    }

    const info = userInfoData.result[0];
    const submissions = userStatusData.result;

    // --- Process Info ---
    const rating = info.rating || 0;
    const rank = info.rank || 'Unrated';
    const maxRating = info.maxRating || 0;
    const maxRank = info.maxRank || 'Unrated';

    // --- Process Submissions ---
    const solvedProblems = new Set<string>();
    const submissionDays = new Set<number>(); // To track active days overall

    const now = new Date();
    // Normalize "now" to midnight UTC to accurately calculate day diffs for streaks
    const currentMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).getTime();
    
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const dailyCountsMap = new Map<number, number>(); // midnight timestamp -> count

    for (const sub of submissions) {
      if (sub.verdict === 'OK') {
        // Unique problem identifier
        const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
        solvedProblems.add(problemId);

        // Date of submission (normalized to midnight UTC)
        const subDate = new Date(sub.creationTimeSeconds * 1000);
        const subMidnight = new Date(Date.UTC(subDate.getUTCFullYear(), subDate.getUTCMonth(), subDate.getUTCDate())).getTime();
        
        submissionDays.add(subMidnight);
        dailyCountsMap.set(subMidnight, (dailyCountsMap.get(subMidnight) || 0) + 1);
      }
    }

    const totalProblemsSolved = solvedProblems.size;
    const activeDays = submissionDays.size;

    // Calculate streaks
    const sortedDays = Array.from(submissionDays).sort((a, b) => b - a); // descending
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let previousDay = -1;

    // Iterate backwards in time for longest streak
    for (let i = 0; i < sortedDays.length; i++) {
      const day = sortedDays[i];
      if (previousDay === -1) {
        tempStreak = 1;
      } else {
        const diffDays = Math.round((previousDay - day) / MS_PER_DAY);
        if (diffDays === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      previousDay = day;
    }

    // Calculate current streak
    let trackDay = currentMidnight;
    if (dailyCountsMap.has(trackDay)) {
      currentStreak++;
      trackDay -= MS_PER_DAY;
      while (dailyCountsMap.has(trackDay)) {
        currentStreak++;
        trackDay -= MS_PER_DAY;
      }
    } else {
      // Maybe user didn't submit *today* but submitted *yesterday*
      trackDay -= MS_PER_DAY;
      if (dailyCountsMap.has(trackDay)) {
        currentStreak++;
        trackDay -= MS_PER_DAY;
        while (dailyCountsMap.has(trackDay)) {
          currentStreak++;
          trackDay -= MS_PER_DAY;
        }
      }
    }

    // --- Heatmap Generation ---
    // The UI displays 52 columns x 7 rows = 364 days.
    // Index 0 represents 363 days ago.
    // Index 363 represents today.
    const heatmap = new Array<number>(364).fill(0);
    
    for (let i = 0; i < 364; i++) {
      // Day offset: 363 - i days ago
      const daysAgo = 363 - i;
      const targetMidnight = currentMidnight - daysAgo * MS_PER_DAY;
      const count = dailyCountsMap.get(targetMidnight) || 0;
      
      let colorIndex = 0;
      if (count > 0) {
        if (count <= 2) colorIndex = 1;
        else if (count <= 4) colorIndex = 2;
        else if (count <= 7) colorIndex = 3;
        else if (count <= 11) colorIndex = 4;
        else colorIndex = 5;
      }
      heatmap[i] = colorIndex;
    }

    const payload: ProcessedCFData = {
      rating,
      rank,
      maxRating,
      maxRank,
      totalProblemsSolved,
      currentStreak,
      longestStreak,
      activeDays,
      heatmap,
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("CF API Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
