import './errorMessage.scss';
import ghost from './Ghost.gif';

const ErrorMessage = () => {
	return (
		<div className="error__wrapper">
			<img src={ghost} alt="Ghost" />
			<div className="error__text">Oops.. Something went wrong...</div>
			<div className="error__text">Please try again later...</div>
		</div>
	);
};

export default ErrorMessage;
