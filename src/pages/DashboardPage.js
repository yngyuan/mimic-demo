import {React}  from 'react';
import { Spin, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Icon } from '@ant-design/compatible';
import { GET_DASHBOARD_ITEMS } from '../graphql/queries';
import ChartRenderer from '../components/ChartRenderer';
import Dashboard from '../components/Dashboard';
import DashboardItem from '../components/DashboardItem';

// const subjectID = [10006,10011,10013,10017,10019,10026,10027,10029,10032,10033,10035,10036,10038,10040,10042,10043,10044,10045,10046,10056,10059,10061,10064,10065,10067,10069,10074,10076,10083,10088,10089,10090,10093,10094,10098,10101,10102,10104,10106,10111,10112,10114,10117,10119,10120,10124,10126,10127,10130,10132,40124,40177,40204,40277,40286,40304,40310,40456,40503,40595,40601,40612,40655,40687,41795,41914,41976,41983,42033,42066,42075,42135,42199,42231,42275,42281,42292,42302,42321,42346,42367,42412,42430,42458,43735,43746,43748,43779,43798,43827,43870,43879,43881,43909,43927,44083,44154,44212,44222,44228];
const deserializeItem = i => ({ ...i,
  layout: JSON.parse(i.layout) || {},
  vizState: JSON.parse(i.vizState)
});

const defaultLayout = i => ({
  x: i.layout.x || 0,
  y: i.layout.y || 0,
  w: i.layout.w || 4,
  h: i.layout.h || 8,
  minW: 4,
  minH: 8
});

// Adding filter to dashboard
// const dashboardItemsWithFilter = (dashboardItems, statusFilter) => {
//   if (statusFilter === "all") {
//     return dashboardItems;
//   }
//
//   const statusFilterObj = {
//     member: "Orders.status",
//     operator: "equals",
//     values: [statusFilter]
//   };
//
//   return dashboardItems.map(({ vizState, ...dashboardItem }) => (
//       {
//         ...dashboardItem,
//         vizState: {
//           ...vizState,
//           query: {
//             ...vizState.query,
//             filters: (vizState.query.filters || []).concat(statusFilterObj),
//           },
//         }
//       }
//   ))
// };

// Adding drill down feature
// const [drillDownQuery, setDrillDownQuery] = useState();
// const handleBarClick = (event, yValues) => {
//     if (event.xValues != null) {
//         setDrillDownQuery(
//             resultSet.drillDown(
//                 {
//                     xValues: event.xValues,
//                     yValues
//                 }
//             )
//         );
//     }
// };
//
// const drillDownResponse = useCubeQuery(
//     drillDownQuery,
//     {
//         skip: !drillDownQuery
//     }
// );

const DashboardPage = () => {
  const {
    loading,
    error,
    data
  } = useQuery(GET_DASHBOARD_ITEMS);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error occured while loading your query" description={error.toString()} type="error" />;
  }
  // filter by user ID
  // const menu = (
  //     <Menu style={{fontSize: "40px"}}>
  //       <Menu.Item key="0">
  //         <a>
  //           10006
  //         </a>
  //       </Menu.Item>
  //       <Menu.Item key="1">
  //         <a>
  //           10011
  //         </a>
  //       </Menu.Item>
  //       <Menu.Divider />
  //       <Menu.Item key="3" disabled>
  //         10013
  //       </Menu.Item>
  //     </Menu>
  // );

  const dashboardItem = item => <div key={item.id} data-grid={defaultLayout(item)}>
      <DashboardItem key={item.id} itemId={item.id} title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </div>;

  const Empty = () => <div style={{
    textAlign: 'center',
    padding: 12
  }}>
      <h2>There are no charts on this dashboard</h2>
      <Link to="/explore">
        <Button type="primary" size="large" icon={<Icon type="plus" />}>
          Add chart
        </Button>
      </Link>
    </div>;


  // return !data || data.dashboardItems.length ? (
      // // [
      // //  Dropdown menu
      // <Dropdown overlay={menu} >
      //     <a className="ant-dropdown-link" style={{fontSize:"18px",
      //       marginTop: "40px",
      //       marginLeft: "12px",
      //       fontColor: "black",
      //       padding: "3px",
      //       backgroundColor: "white"}}
      //        onClick={e => e.preventDefault()}>
      //       Subject ID <DownOutlined />
      //     </a>
      // </Dropdown>,

      // dashboard items
      // {/*<Dashboard dashboardItems={data && data.dashboardItems}>*/}
      // {data && data.dashboardItems.map(deserializeItem).map(dashboardItem)}
      // </Dashboard>
      // ]
      // )
      // : <Empty /> ;
    return !data || data.listDashboardItems.items.length ? (
        <Dashboard dashboardItems={data && data.listDashboardItems.items}>
            {data && data.listDashboardItems.items.map(deserializeItem).map(dashboardItem)}
        </Dashboard>
    ) : <Empty />;

};

export default DashboardPage;