import PropTypes from 'prop-types';

const Student = ({ name, studentId, grades }) => {
  return (
    <div className="student-card">
      <h3>{name} (学号: {studentId})</h3>
      <div className="grades-section">
        {grades && grades.length > 0 ? (
          <>
            <p>成绩单：</p>
            <ul>
              {grades.map((grade, index) => (
                <li key={index}>{grade.subject}: {grade.score}</li>
              ))}
            </ul>
          </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

// PropTypes类型校验
Student.propTypes = {
  name: PropTypes.string.isRequired,
  studentId: PropTypes.number.isRequired,
  grades: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string,
      score: PropTypes.number
    })
  )
};

export default Student;
