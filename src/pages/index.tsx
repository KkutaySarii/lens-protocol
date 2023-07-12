import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "../graphql/generated";

export default function Home() {
  const { data, isLoading, isError } = useExplorePublicationsQuery({
    request: {
      sortCriteria: PublicationSortCriteria.TopCollected,
    },
  });
  console.log(data);
  return <>Hello World</>;
}
