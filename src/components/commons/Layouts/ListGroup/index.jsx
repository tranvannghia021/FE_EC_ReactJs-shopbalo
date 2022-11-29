import React from 'react';
import { ListGroup as ListGroupBootstrap } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../../../redux/selectors';
import { useEffect } from 'react';
import { handleGetInformation } from '../../../../api/Admin/Auth';
import { useState } from 'react';
import Skeleton from '../Skeleton';

export default function ListGroup(props) {
  const { data } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleGetUser = async () => {
      const response = await handleGetInformation();
      if (response === 401) {
        setLoading(false);
        return 401;
      } else {
        setLoading(false);
        setUser(response);
      }
    };
    handleGetUser();
  }, [dispatch]);

  return loading ? (
    <Skeleton column={1} />
  ) : (
    <ListGroupBootstrap id="list-group" as="ul">
      {data.map((element) => {
        if (user !== null) {
          return user.role_permissions.map((item) => {
            if (element.role === item.permission_id) {
              return (
                <NavLink
                  to={element.link}
                  key={element.id}
                  className={({ isActive }) => (isActive ? 'app-active-link' : ' app-not-active-link')}
                >
                  <ListGroupBootstrap.Item className="py-3 d-flex align-items-center" as="li">
                    <h5>{element.icon}</h5>
                    <h5 className="font-weight-bold ms-3">{element.name}</h5>
                  </ListGroupBootstrap.Item>
                </NavLink>
              );
            }
          });
        }

        {
          /* if (element.role === 1) { */
        }
        {
          /* return (
          <NavLink
            to={element.link}
            key={element.id}
            className={({ isActive }) => (isActive ? 'app-active-link' : ' app-not-active-link')}
          >
            <ListGroupBootstrap.Item className="py-3 d-flex align-items-center" as="li">
              <h5>{element.icon}</h5>
              <h5 className="font-weight-bold ms-3">{element.name}</h5>
            </ListGroupBootstrap.Item>
          </NavLink>
        ); */
        }
        {
          /* } */
        }
      })}
    </ListGroupBootstrap>
  );
}

ListGroup.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    })
  ),
};
