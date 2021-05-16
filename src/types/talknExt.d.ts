/* for talkn extension */
interface Window {
  TalknExt: {
    ins: {
      iframes: {
        LiveMedia: {
          toggleDetail: () => void;
          updateThreadServerMetas: (state: any /* State */) => void;
          state: State;
        };
      };
    };
  };
}

type State = {
  user?: any;
  app?: any;
  thread: {
    serverMetas: {
      'og:image': string;
    };
  };
};
