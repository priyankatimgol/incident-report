import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from 'store/store';
import App from './App';
import './index.css';

function componentDidMount() {
  fetch(`http://localhost:3000/Assest/url.json`)
    .then((res) => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items,
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      },
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Suspense fallback={<div>Loading...</div>}>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </Suspense>
  </>,
);
