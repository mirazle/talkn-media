import {
  AboutType,
  ContentsValueType,
  FluffyThumbnailType,
  ImageType,
  MentionType,
  ProviderImageType,
  ProviderType,
  ProvidersType,
  VideoType,
} from 'schema';

enum Type {
  Organization = 'Organization',
}

class FluffyThumbnailModel {
  public contentUrl: string;
  constructor(value?: FluffyThumbnailType) {
    this.contentUrl = value && value.contentUrl ? value.contentUrl : '';
  }
}

class ProviderImageModel {
  public thumbnail: FluffyThumbnailType;
  constructor(value?: ProviderImageType) {
    this.thumbnail = value && value.thumbnail ? value.thumbnail : new FluffyThumbnailModel();
  }
}

class ProviderModel {
  public _type: ProvidersType;
  public name: string;
  public image: ProviderImageType;
  constructor(value?: ProviderType) {
    this._type = Type.Organization;
    this.name = value && value.name ? value.name : '';
    this.image = value && value.image ? value.image : new ProviderImageModel();
  }
}

export class ContentValueModel {
  public name: string;
  public url: string;
  public image?: ImageType;
  public description: string;
  public about?: AboutType[];
  public mentions?: MentionType[];
  public provider: ProviderType[];
  public datePublished: Date;
  public category: string;
  public ampUrl?: string;
  public video?: VideoType;
  constructor(value?: ContentsValueType) {
    this.name = value && value.name ? value.name : '';
    this.url = value && value.url ? value.url : '';
    this.image = value && value.image && value.image;
    this.description = value && value.description ? value.description : '';
    this.about = value && value.about && value.about;
    this.mentions = value && value.mentions && value.mentions;
    this.provider = value && value.provider ? value.provider : [new ProviderModel()];
    this.datePublished = value && value.datePublished ? value.datePublished : new Date(0);
    this.category = value && value.category ? value.category : '';
    this.ampUrl = value && value.ampUrl && value.ampUrl;
    this.video = value && value.video && value.video;
  }
}
