import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Message from '../Message';
import { getChapterPayments } from '../../actions/chapterActions';
import RTable from '../Table/RTable';
import ColumnFilter from '../Table/ColumnFilter';
import { Card } from 'react-bootstrap';

const Payments = () => {
  const dispatch = useDispatch();
  const [columnsAllPayments, setColumnsAllPayments] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterPaymentAll = useSelector((state) => state.chapterPaymentAll);
  const {
    loading: chapterPaymentAllLoading,
    error: chapterPaymentAllError,
    success,
    allPayments,
  } = chapterPaymentAll;

  const checkChapter = window.location.host;

  useEffect(() => {
    if (
      (userInfo && userInfo.userRole === 'admin') ||
      userInfo.userRole === 'systemAdmin'
    ) {
      dispatch(getChapterPayments(checkChapter));

      setColumnsAllPayments([
        {
          Header: 'Payment Type',
          accessor: 'paymentType',
          Filter: ColumnFilter,
        },
        {
          Header: 'Payment Year(for)',
          accessor: 'year',
          Filter: ColumnFilter,
        },
        {
          Header: 'Amount',
          accessor: 'amount',
          Filter: ColumnFilter,
        },
        {
          Header: 'Date',
          accessor: 'paymentDate',
          Filter: ColumnFilter,
        },

        {
          Header: 'Member Id',
          accessor: 'memberId',
          Filter: ColumnFilter,
        },

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
          Header: 'Email',
          accessor: 'member.primaryEmail',
          Filter: ColumnFilter,
        },
        {
          Header: 'Phone',
          accessor: 'member.primaryPhone',
          Filter: ColumnFilter,
        },
        {
          Header: 'Next Due Year',
          accessor: 'member.nextPaymentDueIn',
          Filter: ColumnFilter,
        },
      ]);
    }
  }, [dispatch, checkChapter]);

  return chapterPaymentAllLoading ? (
    <Loader />
  ) : chapterPaymentAllError ? (
    <Message variant='danger'>{chapterPaymentAllError}</Message>
  ) : (
    <>
      {allPayments && allPayments.length !== 0 && (
        <Card>
          <Card.Header as='h3' className='text-info text-center'>
            Payments
          </Card.Header>
          <RTable users={allPayments} COLUMNS={columnsAllPayments} />
        </Card>
      )}
    </>
  );
};

export default Payments;
