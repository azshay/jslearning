import './promo/promo.scss';
import logo from './promo/coffeeGrain.png';
import promoLogo from './promo/coffeeGrainsPromo.png';

function App() {
	return (
		<div className="App">
			<section className="promo">
				<div className="container">
					<header className="promo__header">
						<div className="promo__logo">
							<img src={logo} alt="Coffee Grain Logotype" />
						</div>

						<ul className="promo__menu">
							<li className="promo__menu-item">Coffee house</li>
							<li className="promo__menu-item">Our coffee</li>
							<li className="promo__menu-item">For your pleasure</li>
						</ul>
					</header>

					<div className="promo__text-header">Everything You Love About Coffee</div>
					<img src={promoLogo} alt="Coffee Grains" className="promo__img" />
					<div className="promo__text-subheader">We makes every day full of energy and taste</div>
					<div className="promo__text-subheader">Want to try our beans?</div>
					<button className="btn promo__btn">More</button>
				</div>
			</section>
		</div>
	);
}

export default App;
