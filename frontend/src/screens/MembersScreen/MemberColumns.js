import ColumnFilter from '../../components/Table/ColumnFilter';

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'memberId',
    Filter: ColumnFilter,
  },
  // {
  //   Header: 'Name',
  //   accessor: 'userName',
  // },
  {
    Header: 'First Name',
    accessor: 'member.firstName',
    Filter: ColumnFilter,
  },
  {
    Header: 'Last Name',
    accessor: 'member.lastName',
    Filter: ColumnFilter,
  },
  {
    Header: 'City',
    accessor: 'member.city',
    Filter: ColumnFilter,
  },
  {
    Header: 'State',
    accessor: 'member.state',
    Filter: ColumnFilter,
  },
];
