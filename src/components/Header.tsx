import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";
import SignInButton from "./SignInButton";
import Image from "next/image";

export default function Header() {
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
        </div>

        <div className={styles.right}>
          <SignInButton />
        </div>
      </div>
      <div style={{ height: 64 }} />
    </>
  );
}
