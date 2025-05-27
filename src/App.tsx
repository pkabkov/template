import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

/**
 * Основной компонент приложения, который настраивает маршрутизацию.
 *
 * @component
 * @returns {React.FC} Корневой компонент приложения с настроенной маршрутизацией.
 */
const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
};

export default App;