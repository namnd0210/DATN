import '../../assets/styles/home.scss';

import { Button, Col, Row, Spin } from 'antd';
import assignment from 'assets/imgs/book-open.svg';
import { sliderSettings } from 'constants/slider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getAllClassesByUserId } from 'redux/auth/actions';
import { useSelector } from 'redux/reducer';
import { ClassProps, ExamProps } from 'types/redux';

import course_1 from '../../assets/imgs/course-1.png';
import course_2 from '../../assets/imgs/course-2.png';
import course_3 from '../../assets/imgs/course-3.png';
import course_4 from '../../assets/imgs/course-4.png';
import heart from '../../assets/imgs/heart.png';
import pig_1 from '../../assets/imgs/if-home1.svg';
import pig_2 from '../../assets/imgs/if-home2.svg';
import pig_3 from '../../assets/imgs/if-home3.svg';
import pig_4 from '../../assets/imgs/if-home4.svg';
import users from '../../assets/imgs/users.svg';

const course_imgs = [course_1, course_2, course_3, course_4];

const items = [
  {
    title: 'Course',
    src: pig_1,
    number: '100+',
  },
  {
    title: 'Students',
    src: pig_2,
    number: '10.000+',
  },
  {
    title: 'Session',
    src: pig_3,
    number: '100+',
  },
  {
    title: 'examinations',
    src: pig_4,
    number: '456+',
  },
];

export const Home = () => {
  const dispatch = useDispatch();
  const {
    user: { classes, id: userUid, role },
  } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.class);
  const exams: ExamProps[] = useSelector((state) => state.class.classes.map((e: ClassProps) => e.exam));

  useEffect(() => {
    dispatch(getAllClassesByUserId({ userUid, role }));
  }, [dispatch, userUid, role]);

  return (
    <div>
      <div className="about-home">
        <div className="row">
          {items.map((e, i) => (
            <div className="item" key={i}>
              <img src={e.src} alt="" />
              <p>{e.title}</p>
              <span>
                <b>{e.number}</b>
              </span>
            </div>
          ))}
        </div>
      </div>

      <Row className="card-list" gutter={[0, 5]}>
        <Col xs={24}>
          <div className="home-recommendation">
            <h3>Các lớp hiện tại: {classes.length} lớp</h3>
            <div className="slide-wrap">
              <Slider {...sliderSettings} slidesToShow={classes?.length >= 4 ? 4 : classes.length}>
                {classes?.length > 0 &&
                  classes?.map((e: ClassProps, i: number) => (
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
                              <Link to={`my-class/${e._id}`}>Chi tiết</Link>
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

      <div className="home-recomendation">
        <h3>Bài thi đề xuất: {exams.length} bài thi</h3>
        <div className="slide-wrap">
          {loading ? (
            <div className="example">
              <Spin size="large" />
            </div>
          ) : (
            <Slider {...sliderSettings} slidesToShow={exams?.length >= 4 ? 4 : exams.length}>
              {exams.length > 0 &&
                exams.map((e, i) => (
                  <>
                    {e && (
                      <div key={i} className="slide-item">
                        <img src={course_imgs[Math.floor(Math.random() * (3 - 0 + 1)) + 0]} alt="" />
                        <div className="info-course">
                          <div className="title">
                            <p>{e?.title}</p>
                            <img src={heart} alt="" />
                          </div>
                          <div className="des">{e?.description || ''}</div>
                          <div className="route">
                            <div className="react">
                              <img src={heart} alt="" />
                              <span>325</span>
                              <img src={users} alt="" />
                              <span>10</span>
                            </div>
                            <div className="link">
                              <Button type="primary">
                                <Link to={`exam/take/${e?._id}`}>Tham gia</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};
