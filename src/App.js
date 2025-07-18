import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {

  // apiKey = process.env.REACT_APP_NEWS_API;
  const apiKey = "bdf3c370d85f4ff3834b4663716b9d36";
  const [progress, setprogress] = useState(0);
  const [pageSize, setPageSize] = useState(9);
   const setProgress = (progress) => {
     setprogress(progress);
  }
  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar color='#f11946' progress={progress} />
        <Routes>
          <Route exact path="/" element={<News setProgress={setprogress} apiKey={apiKey} key="general" pageSize={pageSize} category="general" country="us" />} />
          <Route exact path="/business" element={<News setProgress={setprogress} apiKey={apiKey} key="business" pageSize={pageSize} category="business" country="us" />} />
          <Route exact path="/entertainment" element={<News setProgress={setprogress} apiKey={apiKey} key="entertainment" pageSize={pageSize} category="entertainment" country="us" />} />
          <Route exact path="/health" element={<News setProgress={setprogress} apiKey={apiKey} key="health" science pageSize={pageSize} category="health" country="us" />} />
          <Route exact path="/science" element={<News setProgress={setprogress} apiKey={apiKey} key="" pageSize={pageSize} category="science" country="us" />} />
          <Route exact path="/sports" element={<News setProgress={setprogress} apiKey={apiKey} key="sports" pageSize={pageSize} category="sports" country="us" />} />
          <Route exact path="/technology" element={<News setProgress={setprogress} apiKey={apiKey} key="technology" pageSize={pageSize} category="technology" country="us" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
