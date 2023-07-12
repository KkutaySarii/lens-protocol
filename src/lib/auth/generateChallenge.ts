import { fetcher } from "@/src/graphql/auth-fetcher";
import {
  ChallengeDocument,
  ChallengeQuery,
  ChallengeQueryVariables,
} from "@/src/graphql/generated";

export default async function generateChallenge(address: string) {
  return await fetcher<ChallengeQuery, ChallengeQueryVariables>(
    ChallengeDocument,
    {
      request: {
        address,
      },
    }
  )();
}
