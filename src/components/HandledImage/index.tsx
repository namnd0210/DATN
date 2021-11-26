import default_img from 'assets/imgs/default-image.jpg';

const HandledImage = ({ src, defaultSrc = default_img }: { src: string; defaultSrc?: string }) => {
  console.log('src: ', src);
  return (
    <img
      src={src}
      onError={(e: any) => {
        e.target.onError = null;
        e.target.src = defaultSrc;
      }}
      alt="avatar"
    />
  );
};

export default HandledImage;
