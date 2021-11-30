import React from 'react';

const DocIframe = ({ source }: any) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  const encodedUrl = encodeURIComponent(source);
  return (
    <div>
      <iframe
        src={'https://docs.google.com/viewer?url=' + encodedUrl + '&embedded=true'}
        title="file"
        width="100%"
        height="400px"
      ></iframe>
    </div>
  );
};

export default DocIframe;