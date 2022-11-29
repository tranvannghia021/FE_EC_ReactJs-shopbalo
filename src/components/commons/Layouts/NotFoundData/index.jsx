import PropTypes from 'prop-types';
import { Navigate, NavLink } from 'react-router-dom';
import NotFound from '../../../../asset/images/not_found.jpg';
export default function NotFoundData(props) {
  return (
    <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
      <img
        src={NotFound}
        alt="Not Found"
        width={props.widthImage ? props.widthImage : '300px'}
        height="100%"
        className="mb-3"
      />
      <h4 className="font-weight-bold text-danger text-center">Oops ... The system could not find any matching data</h4>
      {props.btnLink && (
        <div>
          <NavLink to="/product" className="font-24px">
            {props.btnLink}
          </NavLink>
        </div>
      )}
    </div>
  );
}

NotFoundData.propTypes = {
  widthImage: PropTypes.string,
};
