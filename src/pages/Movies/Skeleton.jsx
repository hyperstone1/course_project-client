import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={416}
    height={427}
    viewBox="0 0 416 427"
    backgroundColor="#e0e0e0"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="300" y="166" rx="3" ry="3" width="107" height="18" />
    <rect x="5" y="165" rx="3" ry="3" width="69" height="20" />
    <rect x="6" y="230" rx="3" ry="3" width="410" height="6" />
    <rect x="480" y="502" rx="3" ry="3" width="178" height="6" />
    <circle cx="584" cy="537" r="67" />
    <rect x="0" y="3" rx="0" ry="0" width="413" height="146" />
    <rect x="5" y="258" rx="3" ry="3" width="410" height="6" />
    <rect x="5" y="281" rx="3" ry="3" width="410" height="6" />
    <rect x="6" y="305" rx="3" ry="3" width="410" height="6" />
    <rect x="5" y="327" rx="3" ry="3" width="410" height="6" />
  </ContentLoader>
);

export default Skeleton;
