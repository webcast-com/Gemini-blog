/**
 * Verifies a GitHub Personal Access Token by fetching user information.
 * @param token The GitHub PAT.
 * @returns A GitHub user object if the token is valid, otherwise null.
 */
export const verifyGitHubToken = async (
  token: string
): Promise<{ login: string; id: number } | null> => {
  if (!token) {
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      console.error(
        `GitHub API Error: ${response.status} ${response.statusText}`
      );
      return null;
    }
  } catch (error) {
    console.error("Failed to communicate with GitHub API:", error);
    return null;
  }
};
