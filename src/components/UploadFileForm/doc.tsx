import React from 'react';

const DocIframe = ({ source }: any) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  const encodedUrl = encodeURIComponent(source);
  console.log(source);
  return (
    <div>
      <iframe
        src={'https://docs.google.com/viewer?url=' + encodedUrl + '&embedded=true'}
        title="file"
        width="100%"
        height="600"
      ></iframe>
    </div>
  );
};

export default DocIframe;
