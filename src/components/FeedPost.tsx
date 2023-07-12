import React from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";
import styles from "../styles/FeedPost.module.css";
import { MediaRenderer } from "@thirdweb-dev/react";

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
          src={publication?.profile?.picture?.original?.url || ""}
          alt={publication?.profile?.name || ""}
          className={styles.feedPostHeaderAvatar}
        />
        <p className={styles.feedPostHeaderName}>
          {publication?.profile?.name || publication?.profile?.handle}
        </p>
      </div>
      <div className={styles.feedPostContent}>
        <p className={styles.feedPostContentDesc}>
          {publication?.metadata?.content}
        </p>
        {publication?.metadata?.media.length > 0 && (
          <MediaRenderer
            src={publication?.metadata?.media[0]?.original?.url}
            alt={publication?.metadata?.content}
            className={styles.feedPostContentMedia}
          />
        )}
      </div>
    </div>
  );
};

export default FeedPost;
