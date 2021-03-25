export default class Geolite {
  static getMktType(acceptLang?: string): string {
    let mktType = 'en-US';
    if (acceptLang && acceptLang !== '') {
      if (acceptLang.indexOf('ja') === 0) {
        mktType = 'ja-JP';
      } else if (acceptLang.indexOf('en-IN') === 0) {
        mktType = 'en-IN';
      } else if (acceptLang.indexOf('en-US') === 0) {
        mktType = 'en-US';
      } else if (acceptLang.indexOf('en-GB') === 0) {
        mktType = 'en-GB';
      } else if (acceptLang.indexOf('zh-CN') === 0) {
        mktType = 'zh-CN';
      } else if (acceptLang.indexOf('en-CA') === 0) {
        mktType = 'en-CA';
      } else if (acceptLang.indexOf('en-AU') === 0) {
        mktType = 'en-AU';
      }
    }
    return mktType;
  }
}
