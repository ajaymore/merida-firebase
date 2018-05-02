import gql from 'graphql-tag';

export const CREATE_COMPANY_MUTATION = gql`
  mutation createCompany(
    $companyName: String!
    $companyAdminInput: CompanyAdminInput!
  ) {
    createCompany(
      companyName: $companyName
      companyAdminInput: $companyAdminInput
    ) {
      _id
      name
      users {
        _id
        displayName
        uid
        email
        superAdmin
        companyAdmin
        createdAt
        updatedAt
      }
      createdAt
    }
  }
`;

export const ALL_COMPANIES_QUERY = gql`
  query companiesSuperAdmin($forSuperAdmin: Boolean!) {
    companiesSuperAdmin(forSuperAdmin: $forSuperAdmin) {
      _id
      name
      createdAt
      users {
        _id
        displayName
        uid
        email
        superAdmin
        companyAdmin
        createdAt
        updatedAt
      }
    }
  }
`;

export default null;
