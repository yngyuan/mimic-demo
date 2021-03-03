// import gql from 'graphql-tag';
// export const GET_DASHBOARD_ITEMS = gql`
//   query GetDashboardItems {
//     dashboardItems {
//       id
//       layout
//       vizState
//       name
//     }
//   }
// `;
// export const GET_DASHBOARD_ITEM = gql`
//   query GetDashboardItem($id: String!) {
//     dashboardItem(id: $id) {
//       id
//       layout
//       vizState
//       name
//     }
//   }
// `;

import gql from "graphql-tag";

export const GET_DASHBOARD_ITEMS = gql`query ListDashboardItems {
    listDashboardItems {
      items {
        id
        layout
        vizState
        name
      }
    }
  }
`

export const GET_DASHBOARD_ITEM = gql`query GetDashboardItem($id: ID!) {
    dashboardItem: getDashboardItem(id: $id) {
      id
      layout
      vizState
      name
    }
  }
`;
