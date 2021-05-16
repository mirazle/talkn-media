import { talknAssets } from 'utils/Constants';
import { MediaTypeSubdomains, getNetwork } from 'utils/Networks';

const isBuildTalknExt = () => {
  if (!window.TalknExt) {
    return false;
  }
  if (!window.TalknExt.ins) {
    return false;
  }
  if (!window.TalknExt.ins.iframes) {
    return false;
  }
  if (!window.TalknExt.ins.iframes.LiveMedia) {
    return false;
  }
  return true;
};

export const toggleDetail = (): void => {
  if (isBuildTalknExt()) {
    const liveMedia = window.TalknExt.ins.iframes.LiveMedia;
    liveMedia.toggleDetail();
  }
};

export const updateThreadServerMetas = (mediaType: MediaTypeSubdomains, _clientOgImage?: string): void => {
  if (_clientOgImage && isBuildTalknExt()) {
    const network = getNetwork(mediaType);
    const liveMedia = window.TalknExt.ins.iframes.LiveMedia;

    // stateが取れた時点でEventをDispatdhすること
    const serverOgImage = liveMedia.state.thread.serverMetas['og:image'];
    const clientOgImage = `${_clientOgImage}${network.getImageParams}`;
    const updateThumbnail = serverOgImage.indexOf(talknAssets.ogImg) >= 0 ? true : serverOgImage !== clientOgImage;

    if (updateThumbnail) {
      liveMedia.updateThreadServerMetas({ 'og:image': clientOgImage });
    }
  }
};
