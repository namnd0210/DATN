import default_img from 'assets/imgs/default-image.jpg';

const HandledImage = ({
  src,
  defaultSrc = default_img,
  width,
  height,
}: {
  src: string;
  defaultSrc?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <img
      src={src}
      onError={(e: any) => {
        e.target.onError = null;
        e.target.src = defaultSrc;
      }}
      alt="avatar"
      width={width}
      height={height}
    />
  );
};

export default HandledImage;
