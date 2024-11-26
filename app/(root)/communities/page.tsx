import CommunityCard from "@/components/cards/CommunityCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchCommunities } from "@/lib/actions/comunity.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function page({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    page?: number;
  }>;
}) {
  const searchParam = await searchParams;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParam?.q,
    pageNumber: searchParam?.page ? +searchParam.page : 1,
    pageSize: 25,
  });
  return (
    <>
      <h1 className="head-text">Communities</h1>

      <div className="mt-5">
        <Searchbar routeType="communities" />
      </div>

      <section className="mt-9 flex flex-wrap gap-4">
        {result.communities.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      {/* <Pagination
    path='communities'
    pageNumber={searchParams?.page ? +searchParams.page : 1}
    isNext={result.isNext}
  /> */}
    </>
  );
}
export default page;
