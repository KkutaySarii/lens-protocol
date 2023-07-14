import React from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";
import styles from "../styles/FeedPost.module.css";
import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};

const FeedPost = ({ publication }: Props) => {
  console.log(publication);
  return (
    <div className={styles.feedPostWrapper}>
      <div className={styles.feedPostHeader}>
        <MediaRenderer
          // @ts-ignore
          src={publication?.profile?.picture?.original?.url}
          alt={publication?.profile?.name || ""}
          className={styles.feedPostHeaderAvatar}
        />
        <Link
          href={`/profile/${publication.profile.handle}`}
          className={styles.feedPostHeaderName}
        >
          {publication?.profile?.name || publication?.profile?.handle}
        </Link>
      </div>
      <div className={styles.feedPostContent}>
        <p className={styles.feedPostContentDesc}>
          {publication?.metadata?.content.length > 100
            ? publication?.metadata?.content.slice(0, 100) + "..."
            : publication?.metadata?.content}
        </p>
        {publication?.metadata?.image ||
        publication?.metadata?.media.length > 0 ? (
          <MediaRenderer
            // @ts-ignore
            src={
              publication?.metadata?.image ||
              publication?.metadata?.media[0]?.original?.url
            }
            alt={publication?.metadata?.content}
            className={styles.feedPostContentMedia}
          />
        ) : null}
      </div>
      <div className={styles.feedPostFooter}>
        <p>{publication.stats.totalAmountOfCollects} Collects</p>
        <p>{publication.stats.totalAmountOfComments} Comments</p>
        <p>{publication.stats.totalAmountOfMirrors} Mirrors</p>
      </div>
    </div>
  );
};

export default FeedPost;
