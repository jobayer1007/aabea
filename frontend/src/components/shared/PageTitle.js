import React from 'react';

const PageTitle = ({ text }) => {
  return (
    <section className='section-title'>
      <div className='pt-5 pb-4'>
        <h1>{text}</h1>
      </div>
    </section>
  );
};

export default PageTitle;
