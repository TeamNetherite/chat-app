import { gql } from "@apollo/client/core";

export const GET_USER = gql`
query GetUser($id:ID) {
  getUser($id) {
    id
    tagName
    tagDiscriminator
    displayName
    fmtTag
  }
}
`;

export const GET_USER_FRIENDS = gql`
query GetUserFriends($id:ID) {
  getUser($id) {
    id
    friends {
      id
      tagName
      tagDiscriminator
      displayName
      fmtTag
    }
  }
}
`
