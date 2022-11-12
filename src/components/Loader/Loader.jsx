import { ColorRing } from 'react-loader-spinner';
import { LoaderBox } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderBox>
      <ColorRing
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        height="80"
        width="80"
      />
    </LoaderBox>
  );
};

export default Loader;
