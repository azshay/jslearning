import { Fragment } from 'react';

import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';

const ComicsPage = () => {
	return (
		<Fragment>
			<AppBanner />
			<ComicsList />
		</Fragment>
	);
};

export default ComicsPage;
