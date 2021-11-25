import '../../assets/styles/home.scss';

import { Button, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getAllClasses } from 'redux/class/actions';
import { useSelector } from 'redux/reducer';
// import { getAllClass } from '../../redux/actions/class';
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

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  arrows: false,
  draggable: true,
};

export const Home = () => {
  const dispatch = useDispatch();
  const { isAdmin, isTeacher, user } = useSelector(({ auth }) => auth);
  const { loading } = useSelector((state) => state.class);
  const exams: ExamProps[] = useSelector((state) => state.class.classes.map((e: ClassProps) => e.exam));

  useEffect(() => {
    if (!isAdmin && !isTeacher) {
      dispatch(getAllClasses({ id: user.id }));
    }
    // eslint-disable-next-line
  }, [isAdmin, isTeacher, user]);

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

      <div className="home-recomendation">
        <h3>Bài thi đề xuất</h3>
        <div className="slide-wrap">
          {loading ? (
            <div className="example">
              <Spin size="large" />
            </div>
          ) : (
            <Slider {...settings} slidesToShow={exams?.length >= 4 ? 4 : exams.length}>
              {exams.map((e, i) => (
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
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};
