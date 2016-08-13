import StudentTable from './student-table.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <StudentTable />,
  document.getElementById("content")
);

// Notice!!!
// Following is required to make reloading happen
if (module.hot) {
  module.hot.accept();
}
