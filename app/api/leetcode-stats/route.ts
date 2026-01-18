export async function GET() {
  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                ranking
                userAvatar
              }
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
                totalSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: {
          username: "patrajagankumar",
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status}`)
    }

    const result = await response.json()
    const user = result.data?.matchedUser

    if (!user) {
      throw new Error("User not found")
    }

    const acStats = user.submitStats?.acSubmissionNum || []
    const allStats = acStats.find((s: any) => s.difficulty === "All")
    const totalSolved = allStats?.count || 0
    const easySolved = acStats.find((s: any) => s.difficulty === "Easy")?.count || 0
    const mediumSolved = acStats.find((s: any) => s.difficulty === "Medium")?.count || 0
    const hardSolved = acStats.find((s: any) => s.difficulty === "Hard")?.count || 0

    console.log("LeetCode API Response:", {
      user: user.username,
      acStats,
      totalSolved: `${totalSolved} (from difficulty: 'All')`,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking: user.profile?.ranking,
    })

    return Response.json({
      status: "success",
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking: user.profile?.ranking || 0,
      acceptanceRate: 65,
      contestRating: 1520,
      topPercentage: 48.07,
    })
  } catch (error) {
    console.error("LeetCode fetch error:", error)
    return Response.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch stats",
      },
      { status: 500 }
    )
  }
}
