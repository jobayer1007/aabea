import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Message from '../Message';
import { getChapterDonations } from '../../actions/chapterActions';
import RTable from '../Table/RTable';
import ColumnFilter from '../Table/ColumnFilter';
import { Card } from 'react-bootstrap';

const Donations = () => {
  const dispatch = useDispatch();
  const [columnsAllDonations, setColumnsAllDonations] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterDonationAll = useSelector((state) => state.chapterDonationAll);
  const {
    loading: chapterDonationAllLoading,
    error: chapterDonationAllError,
    allDonations,
  } = chapterDonationAll;

  const checkChapter = window.location.host;

  useEffect(() => {
    if (
      (userInfo && userInfo.userRole === 'admin') ||
      userInfo.userRole === 'systemAdmin'
    ) {
      dispatch(getChapterDonations(checkChapter));

      setColumnsAllDonations([
        {
          Header: 'Donation Type',
          accessor: 'donationType',
          Filter: ColumnFilter,
        },

        {
          Header: 'Amount',
          accessor: 'amount',
          Filter: ColumnFilter,
        },
        {
          Header: 'Date',
          accessor: 'donationDate',
          Filter: ColumnFilter,
        },

        {
          Header: 'Member Id',
          accessor: 'memberId',
          Filter: ColumnFilter,
        },

        {
          Header: 'First Name',
          accessor: 'firstName',
          Filter: ColumnFilter,
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
          Filter: ColumnFilter,
        },
        {
          Header: 'Email',
          accessor: 'email',
          Filter: ColumnFilter,
        },
      ]);
    }
  }, [dispatch, checkChapter]);

  return chapterDonationAllLoading ? (
    <Loader />
  ) : chapterDonationAllError ? (
    <Message variant='danger'>{chapterDonationAllError}</Message>
  ) : (
    <>
      {allDonations && allDonations.length !== 0 && (
        <Card>
          <Card.Header as='h3' className='text-info text-center'>
            Donations
          </Card.Header>
          <RTable users={allDonations} COLUMNS={columnsAllDonations} />
        </Card>
      )}
    </>
  );
};

export default Donations;
