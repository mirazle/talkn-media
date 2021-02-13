module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    ENVIROMENT: process.env.ENVIROMENT,
    DEFAULT_MEDIA_TYPE: process.env.DEFAULT_MEDIA_TYPE,
    DEFAULT_MKT_TYPE: process.env.DEFAULT_MKT_TYPE,
    DEFAULT_CATEGORY: process.env.DEFAULT_CATEGORY,
    KEEP_CONTENTS_SECOND: process.env.KEEP_CONTENTS_SECOND,
    KEEP_CONTENTS_CNT: process.env.KEEP_CONTENTS_CNT,
  },
  webpack: require( './nextjs-config/webpack' )
};
