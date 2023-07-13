import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/ProfilePage.module.css";
import { useProfileQuery, usePublicationsQuery } from "@/src/graphql/generated";
import { MediaRenderer } from "@thirdweb-dev/react";
import FeedPost from "@/src/components/FeedPost";

type Props = {};

const ProfilePage = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: profileData,
    error: profileError,
    isLoading: profileLoading,
  } = useProfileQuery(
    {
      request: {
        handle: id,
      },
    },
    {
      enabled: !!id,
    }
  );

  const {
    isLoading: publicationLoading,
    error: publicationError,
    data: publicationData,
  } = usePublicationsQuery(
    {
      request: {
        profileId: profileData?.profile?.id,
      },
    },
    {
      enabled: !!profileData?.profile?.id,
    }
  );
  console.log(profileData, publicationData);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContentContainer}>
        {/* Cover Image */}
        {/* @ts-ignore */}
        {profileData?.profile?.coverPicture?.original?.url && (
          <MediaRenderer
            // @ts-ignore
            src={profileData?.profile?.coverPicture?.original?.url || ""}
            alt={
              profileData?.profile?.name || profileData?.profile?.handle || ""
            }
            className={styles.coverImageContainer}
          />
        )}
        {/* Profile Picture */}
        {/* @ts-ignore */}
        {profileData?.profile?.picture?.original?.url && (
          <MediaRenderer
            // @ts-ignore
            src={profileData.profile.picture.original.url}
            alt={profileData.profile.name || profileData.profile.handle || ""}
            className={styles.profilePictureContainer}
          />
        )}

        {/* Profile Name */}
        <h1 className={styles.profileName}>
          {profileData?.profile?.name || "Anon User"}
        </h1>
        {/* Profile Handle */}
        <p className={styles.profileHandle}>
          @{profileData?.profile?.handle || "anonuser"}
        </p>

        {/* Profile Description */}
        <p className={styles.profileDescription}>{profileData?.profile?.bio}</p>

        <p className={styles.followerCount}>
          {profileData?.profile?.stats.totalFollowers} {" Followers"}
        </p>

        <div className={styles.publicationsContainer}>
          {publicationLoading ? (
            <div>Loading Publications...</div>
          ) : (
            // Iterate over the items in the publications array
            publicationData?.publications.items.map((publication) => (
              <FeedPost publication={publication} key={publication.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
