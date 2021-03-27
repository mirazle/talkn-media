declare module '*/mediaTypes.json' {
  interface Datas {
    endpointHost: string;
    endpointSearchHost: string;
    endpointKey: string;
  }
  interface MediaTypes {
    [key: string]: Datas;
  }
  const value: MediaTypes;
  export = value;
}
