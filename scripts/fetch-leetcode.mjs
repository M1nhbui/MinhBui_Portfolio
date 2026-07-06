// Fetches live LeetCode stats and writes public/leetcode.json.
// Runs in GitHub Actions before each build (see .github/workflows/deploy.yml).
// If it fails, the build keeps the previously committed fallback file.
import { writeFileSync } from 'node:fs'

const USERNAME = 'M1nhbui'

const QUERY = `
query ($username: String!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $username) {
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { streak totalActiveDays submissionCalendar }
  }
  userContestRanking(username: $username) {
    rating
    attendedContestsCount
    globalRanking
    totalParticipants
    topPercentage
  }
}`

const res = await fetch('https://leetcode.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Referer: 'https://leetcode.com',
    'User-Agent': 'Mozilla/5.0 (portfolio-stats-sync)',
  },
  body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
})

if (!res.ok) throw new Error(`LeetCode responded ${res.status}`)
const { data, errors } = await res.json()
if (errors?.length || !data?.matchedUser) {
  throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`)
}

const totals = Object.fromEntries(data.allQuestionsCount.map((q) => [q.difficulty, q.count]))
const solvedBy = Object.fromEntries(
  data.matchedUser.submitStatsGlobal.acSubmissionNum.map((q) => [q.difficulty, q.count])
)
const cal = data.matchedUser.userCalendar
const calendar = JSON.parse(cal.submissionCalendar || '{}')
const yearAgo = Date.now() / 1000 - 365 * 86400
const submissions = Object.entries(calendar)
  .filter(([ts]) => Number(ts) >= yearAgo)
  .reduce((a, [, n]) => a + n, 0)
const contest = data.userContestRanking

const out = {
  updatedAt: new Date().toISOString(),
  username: USERNAME,
  ranking: data.matchedUser.profile.ranking,
  contest: contest && {
    rating: Math.round(contest.rating),
    attended: contest.attendedContestsCount,
    globalRanking: contest.globalRanking,
    totalParticipants: contest.totalParticipants,
    topPercentage: contest.topPercentage,
  },
  solved: {
    easy: { done: solvedBy.Easy ?? 0, total: totals.Easy ?? 0 },
    medium: { done: solvedBy.Medium ?? 0, total: totals.Medium ?? 0 },
    hard: { done: solvedBy.Hard ?? 0, total: totals.Hard ?? 0 },
  },
  pastYear: {
    submissions,
    activeDays: cal.totalActiveDays,
    maxStreak: cal.streak,
  },
  calendar,
}

writeFileSync(new URL('../public/leetcode.json', import.meta.url), JSON.stringify(out))
console.log(`✓ leetcode.json updated — ${out.solved.easy.done + out.solved.medium.done + out.solved.hard.done} solved, ${submissions} submissions past year`)
