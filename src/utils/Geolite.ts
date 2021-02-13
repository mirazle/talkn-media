import { Request } from 'express';

export default class Geolite {
  static getLanguage(req: Request): string {
    let language = 'en';

    if (req.headers && req.headers['accept-language']) {
      if (req.headers['accept-language'].indexOf('ja') === 0) {
        language = 'ja';
      } else if (req.headers['accept-language'].indexOf('zh-TW') === 0) {
        language = 'zh-TW';
      } else if (req.headers['accept-language'].indexOf('zh') === 0) {
        language = 'zh';
      } else if (req.headers['accept-language'].indexOf('de') === 0) {
        language = 'de';
      } else if (req.headers['accept-language'].indexOf('fr') === 0) {
        language = 'fr';
      } else if (req.headers['accept-language'].indexOf('hi') === 0) {
        language = 'hi';
      } else if (req.headers['accept-language'].indexOf('pt') === 0) {
        language = 'pt';
      } else if (req.headers['accept-language'].indexOf('it') === 0) {
        language = 'it';
      } else if (req.headers['accept-language'].indexOf('ru') === 0) {
        language = 'ru';
      } else if (req.headers['accept-language'].indexOf('ko') === 0) {
        language = 'ko';
      } else if (req.headers['accept-language'].indexOf('es') === 0) {
        language = 'es';
      } else if (req.headers['accept-language'].indexOf('id') === 0) {
        language = 'id';
      } else if (req.headers['accept-language'].indexOf('tr') === 0) {
        language = 'tr';
      } else if (req.headers['accept-language'].indexOf('nl') === 0) {
        language = 'nl';
      } else if (req.headers['accept-language'].indexOf('ar') === 0) {
        language = 'ar';
      } else if (req.headers['accept-language'].indexOf('pl') === 0) {
        language = 'pl';
      } else if (req.headers['accept-language'].indexOf('sv') === 0) {
        language = 'sv';
      } else if (req.headers['accept-language'].indexOf('th') === 0) {
        language = 'th';
      } else if (req.headers['accept-language'].indexOf('fa') === 0) {
        language = 'fa';
      } else if (req.headers['accept-language'].indexOf('nn') === 0) {
        language = 'nn';
      } else if (req.headers['accept-language'].indexOf('ga') === 0) {
        language = 'ga';
      } else if (req.headers['accept-language'].indexOf('he') === 0) {
        language = 'he';
      } else if (req.headers['accept-language'].indexOf('mr') === 0) {
        language = 'mr';
      } else {
        language = 'en';
      }
    }
    return language;
  }
}
