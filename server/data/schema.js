module.exports = `
scalar JSON

type User {
  id: ID!
  email: String!
}

type Project {
  id: ID!
  name: String!
  description: String
  pages: [Page]
}

type Page {
  id: ID!
  title: String!
  path: String!
  items: JSON!
}

input ProjectInput {
  id: String!
  name: String!
  description: String
}

input PageInput {
  id: String
  title: String!
  path: String!
  items: JSON
}

type Query {
  projects: [Project]
  project(id: String!): Project
  page(projectId: String!, id: String!): Page
}

type Mutation {
  createProject(project: ProjectInput!): Project
  createPage(projectId: String!, page: PageInput!): Page
  updatePage(projectId: String!, page: PageInput!): Page
}
`;
