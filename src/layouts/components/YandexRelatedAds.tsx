import { useEffect } from 'react';

const YandexRelatedAds = () => {
	useEffect(() => {
		// const yaContextCb = window.yaContextCb || [];
		yaContextCb.push(() => {
			window.Ya.Context.AdvManager.renderWidget({
				renderTo: 'yandex_rtb_C-A-2592503-2',
				blockId: 'C-A-2592503-2',
			});
		});
	}, []);

	return <div id="yandex_rtb_C-A-2592503-2"></div>;
};

export default YandexRelatedAds;
