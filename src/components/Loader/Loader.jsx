import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ color }) => {
  return <ThreeDots color={color} height={80} width={80} />;
};

Loader.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Loader;
