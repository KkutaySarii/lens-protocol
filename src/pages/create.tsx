import React from "react";
import styles from "../styles/Create.module.css";
import { Web3Button } from "@thirdweb-dev/react";
import {
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from "../contracts/lens-contract";
import { useCreatePost } from "../lib/useCreatePost";

type Props = {};

export default function Create({}: Props) {
  const [image, setImage] = React.useState<File | null>(null);
  const [content, setContent] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const { mutateAsync: createPost } = useCreatePost();

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Web3Button
          contractAddress={LENS_CONTRACT_ADDRESS}
          contractAbi={LENS_CONTRACT_ABI}
          action={async () => {
            if (!image) return;
            return await createPost({
              image,
              title,
              description: desc,
              content,
            });
          }}
        >
          Create Post
        </Web3Button>
      </div>
    </div>
  );
}
