import FeedPost from "../components/FeedPost";
import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "../graphql/generated";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data, isLoading, isError } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: PublicationSortCriteria.TopCollected,
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  if (isError) {
    return <div className={styles.container}>Error</div>;
  }

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.feedPostContainer}>
        {data?.explorePublications.items.map((publication) => (
          <FeedPost publication={publication} key={publication.id} />
        ))}
      </div>
    </div>
  );
}
