declare global {
  interface Blob {
    stream(): ReadableStream<any>;
  }

  interface Window {
    kakao: any;
  }
}