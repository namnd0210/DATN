import './style.scss';

import { Button, Col, Row } from 'antd';
import assignment from 'assets/imgs/book-open.svg';
import course_1 from 'assets/imgs/course-1.png';
import course_2 from 'assets/imgs/course-2.png';
import course_3 from 'assets/imgs/course-3.png';
import course_4 from 'assets/imgs/course-4.png';
import heart from 'assets/imgs/heart.png';
import users from 'assets/imgs/users.svg';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useSelector } from 'redux/reducer';
import { ClassProps } from 'types/redux';

const course_imgs = [course_1, course_2, course_3, course_4];

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  arrows: false,
  draggable: true,
};

const MyClass = () => {
  const {
    user: { classes },
  } = useSelector((state) => state.auth);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <div className="home-recommendation">
          <h3>Các lớp hiện tại</h3>
          <div className="slide-wrap">
            <Slider {...settings} slidesToShow={classes?.length >= 4 ? 4 : classes.length}>
              {classes.map((e: ClassProps, i: number) => (
                <div key={i} className="slide-item">
                  <img src={course_imgs[Math.floor(Math.random() * (3 - 0 + 1)) + 0]} alt="" />
                  <div className="info-course">
                    <div className="title">
                      <p>{e.name}</p>
                      <img src={heart} alt="" />
                    </div>
                    <div className="des">{e.teacher.name}</div>
                    <div className="route">
                      <div className="react">
                        <img src={assignment} alt="" />
                        <span>{e.assignments.length}</span>
                        <img src={users} alt="" />
                        <span>{e.students.length}</span>
                      </div>
                      <div className="link">
                        <Button type="primary">
                          <Link to={`assignment/${e._id}`}>Chi tiết</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MyClass;
