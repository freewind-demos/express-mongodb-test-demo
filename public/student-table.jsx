import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

export default class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
    this.initData = this.initData.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
  }

  componentDidMount() {
    const self = this;
    $.get('/students', function (students) {
      self.setState({
        students: students
      })
    });
  }

  render() {
    const studentRows = this.state.students.map(student =>
      <tr key={student._id}>
        <td>{student.name}</td>
        <td>{student.gender}</td>
        <td>
          <button onClick={this.removeStudent(student._id)}>删除</button>
        </td>
      </tr>
    );
    return <div>
      <div>
        <button onClick={this.initData}>初始化数据</button>
      </div>
      <table>
        <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {studentRows}
        </tbody>
      </table>
    </div>;
  }

  initData() {
    const self = this;
    $.post('/init', function (students) {
      self.setState({
        students: students
      })
    });
  }

  removeStudent(id) {
    return () => {
      const self = this;
      $.ajax({
        url: '/students/' + id,
        type: 'DELETE',
        success: function (result) {
          const remainStudents = _.filter(self.state.students, s => s._id !== id);
          self.setState({
            students: remainStudents
          });
        }
      });
    }
  }
}