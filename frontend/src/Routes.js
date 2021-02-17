import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PaymentScreen from './screens/PaymentScreen/PaymentScreen';
import DonateScreen from './screens/DonateScreen/DonateScreen';
import TrainingScreen from './screens/TrainingScreen/TrainingScreen';
import CommittieesScreen from './screens/CommitteesScreen/CommitteesScreen';

const Routes = () => {
  return (
    <Switch>
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/donate' component={DonateScreen} />
      <Route path='/training' component={TrainingScreen} />
      <Route path='/committiees' component={CommittieesScreen} />
    </Switch>
  );
};

export default Routes;
