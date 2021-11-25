import { Button, Col, Empty, Row } from 'antd';
import assignment from 'assets/imgs/book-open.svg';
import course_1 from 'assets/imgs/course-1.png';
import course_2 from 'assets/imgs/course-2.png';
import course_3 from 'assets/imgs/course-3.png';
import course_4 from 'assets/imgs/course-4.png';
import heart from 'assets/imgs/heart.png';
import users from 'assets/imgs/users.svg';
import { sliderSettings } from 'constants/slider';
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useSelector } from 'redux/reducer';
import { AssignmentProps, ClassProps } from 'types/redux';

const course_imgs = [course_1, course_2, course_3, course_4];

const ClassDetail = () => {
  const { classId } = useParams<any>();
  const { url } = useRouteMatch<any>();

  const {
    user: { classes },
  } = useSelector((state) => state.auth);

  const currentClass: ClassProps = classes.find((e: ClassProps) => e._id === classId);

  console.log(currentClass);

  return (
    <div>
      <Row className="card-list" gutter={[0, 5]}>
        <Col xl={24}>
          <div className="home-recommendation">
            <h3>Lớp hiện tại</h3>
            <h3>{currentClass.name}</h3>
            <div>Số lượng sinh viên: {currentClass.students.length}</div>
            <div>Giảng viên: {currentClass.teacher.name}</div>
            <div>Số lượng bài tập: {currentClass.assignments.length}</div>

            <div className="slide-wrap">
              {currentClass.assignments.length === 0 && <Empty />}

              {currentClass.assignments.length > 0 && (
                <Slider
                  {...sliderSettings}
                  slidesToShow={currentClass.assignments.length >= 4 ? 4 : currentClass.assignments.length}
                >
                  {currentClass.assignments.map((e: AssignmentProps, i: number) => (
                    <div key={i} className="slide-item">
                      <img src={course_imgs[Math.floor(Math.random() * (3 - 0 + 1)) + 0]} alt="" />
                      <div className="info-course">
                        <div className="title">
                          <p>{e.title}</p>
                          <img src={heart} alt="" />
                        </div>
                        <div className="des">{e.description}</div>
                        <div className="route">
                          <div className="react">
                            <img src={assignment} alt="" />
                            {/* <span>{e.assignments.length}</span> */}
                            <img src={users} alt="" />
                            {/* <span>{e.students.length}</span> */}
                          </div>
                          <div className="link">
                            <Button type="primary">
                              <Link to={`${url}/assignment/${e._id}`}>Chi tiết</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ClassDetail;
