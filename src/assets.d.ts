declare module "*.asset.json" {
  const content: {
    url: string;
    [key: string]: any;
  };
  export default content;
}
