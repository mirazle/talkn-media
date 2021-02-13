// To parse this data:
//
//   import { Convert, News } from "./file";
//
//   const news = Convert.toNews(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface News {
    _type:        string;
    webSearchUrl: string;
    value:        Value[];
}

export interface Value {
    name:          string;
    url:           string;
    image?:        ValueImage;
    description:   string;
    about?:        About[];
    mentions?:     Mention[];
    provider:      Provider[];
    datePublished: Date;
    category:      Category;
    ampUrl?:       string;
    video?:        Video;
}

export interface About {
    readLink: string;
    name:     string;
}

export enum Category {
    ScienceAndTechnology = "ScienceAndTechnology",
}

export interface ValueImage {
    thumbnail: PurpleThumbnail;
}

export interface PurpleThumbnail {
    contentUrl: string;
    width:      number;
    height:     number;
}

export interface Mention {
    name: string;
}

export interface Provider {
    _type: Type;
    name:  string;
    image: ProviderImage;
}

export enum Type {
    Organization = "Organization",
}

export interface ProviderImage {
    thumbnail: FluffyThumbnail;
}

export interface FluffyThumbnail {
    contentUrl: string;
}

export interface Video {
    name:               string;
    motionThumbnailUrl: string;
    thumbnail:          VideoThumbnail;
}

export interface VideoThumbnail {
    width:  number;
    height: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toNews(json: string): News {
        return cast(JSON.parse(json), r("News"));
    }

    public static newsToJson(value: News): string {
        return JSON.stringify(uncast(value, r("News")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "News": o([
        { json: "_type", js: "_type", typ: "" },
        { json: "webSearchUrl", js: "webSearchUrl", typ: "" },
        { json: "value", js: "value", typ: a(r("Value")) },
    ], false),
    "Value": o([
        { json: "name", js: "name", typ: "" },
        { json: "url", js: "url", typ: "" },
        { json: "image", js: "image", typ: u(undefined, r("ValueImage")) },
        { json: "description", js: "description", typ: "" },
        { json: "about", js: "about", typ: u(undefined, a(r("About"))) },
        { json: "mentions", js: "mentions", typ: u(undefined, a(r("Mention"))) },
        { json: "provider", js: "provider", typ: a(r("Provider")) },
        { json: "datePublished", js: "datePublished", typ: Date },
        { json: "category", js: "category", typ: r("Category") },
        { json: "ampUrl", js: "ampUrl", typ: u(undefined, "") },
        { json: "video", js: "video", typ: u(undefined, r("Video")) },
    ], false),
    "About": o([
        { json: "readLink", js: "readLink", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "ValueImage": o([
        { json: "thumbnail", js: "thumbnail", typ: r("PurpleThumbnail") },
    ], false),
    "PurpleThumbnail": o([
        { json: "contentUrl", js: "contentUrl", typ: "" },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
    ], false),
    "Mention": o([
        { json: "name", js: "name", typ: "" },
    ], false),
    "Provider": o([
        { json: "_type", js: "_type", typ: r("Type") },
        { json: "name", js: "name", typ: "" },
        { json: "image", js: "image", typ: r("ProviderImage") },
    ], false),
    "ProviderImage": o([
        { json: "thumbnail", js: "thumbnail", typ: r("FluffyThumbnail") },
    ], false),
    "FluffyThumbnail": o([
        { json: "contentUrl", js: "contentUrl", typ: "" },
    ], false),
    "Video": o([
        { json: "name", js: "name", typ: "" },
        { json: "motionThumbnailUrl", js: "motionThumbnailUrl", typ: "" },
        { json: "thumbnail", js: "thumbnail", typ: r("VideoThumbnail") },
    ], false),
    "VideoThumbnail": o([
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
    ], false),
    "Category": [
        "ScienceAndTechnology",
    ],
    "Type": [
        "Organization",
    ],
};
