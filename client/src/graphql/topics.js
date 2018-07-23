import gql from 'graphql-tag';

export const ProfileTopicsQuery = gql`
  query getProfileTopics($levelId: Int!) {
    getProfileTopics(levelId: $levelId) {
      id
      name
    }
  }
`;

export const getUserQuery = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      username
      location
    }
  }
`;

export const getUserPicsQuery = gql`
  query getUserPics($userId: Int!) {
    getUserPics(userId: $userId) {
      url
    }
  }
`;

export const GetUserTeams = gql`
{
  allUserTeams {
    name
    id
  }
}
`;
