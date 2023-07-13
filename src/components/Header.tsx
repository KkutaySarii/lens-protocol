import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";
import SignInButton from "./SignInButton";
import Image from "next/image";
import useLensUser from "../lib/auth/useLensUser";

export default function Header() {
  const { profileQuery } = useLensUser();
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.left}>
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="logo"
              width={48}
              height={48}
              objectFit="contain"
            />
          </Link>
          <Link href={"/create"}>Create</Link>
        </div>

        <div className={styles.right}>
          {profileQuery?.data?.defaultProfile?.handle ? (
            <Link
              href={`/profile/${profileQuery?.data?.defaultProfile?.handle}`}
              className={styles.feedPostHeaderName}
            >
              {profileQuery?.data?.defaultProfile?.handle}
            </Link>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
      <div style={{ height: 64 }} />
    </>
  );
}
