import React, { useMemo } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from 'react-table';
import { Checkbox } from './CheckBox';
import GlobalFilter from './GlobalFilter';

const RTable = ({ users, COLUMNS }) => {
  const data = useMemo(() => users, [users]);
  const columns = useMemo(() => COLUMNS, [COLUMNS]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      data: data,
      columns: columns,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
  // console.log({
  //   selectedFlatRows: selectedFlatRows.map((row) => row.original),
  // });

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Table
        {...getTableProps()}
        striped
        bordered
        hover
        responsive
        className='table-sm'
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? '  ▼'
                        : '  ▲'
                      : ''}
                  </span>
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* <pre>
          <code>
            {JSON.stringify({
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            })}
          </code>
        </pre> */}
      </Table>
      <Row className='justify-content-md-center'>
        <Col>
          <Button
            variant=''
            className='btn-sm'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </Button>
          <Button
            variant=''
            className='btn-sm'
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {' '}
            Previous
            {/* <i className='fas fa-trash'></i> */}
          </Button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type='number'
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: '50px' }}
              min={1}
            />
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[2, 5, 10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

          <Button
            variant=''
            className='btn-sm'
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {' '}
            Next
            {/* <i className='fas fa-trash'></i> */}
          </Button>
          <Button
            variant=''
            className='btn-sm'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default RTable;
