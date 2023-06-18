export const slugify = (string: string): string =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .split(" ")
    .join("-");

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("fr-EU");
}

export function formatBlogPosts(
  posts: any,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    limit = undefined,
  } = {}
) {
  const filteredPosts = posts.reduce((acc: any[], post: any) => {
    const { date, draft } = post.frontmatter;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post);

    return acc;
  }, []);

  filteredPosts.sort(
    (a: any, b: any) =>
      new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}
