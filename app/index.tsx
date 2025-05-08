import { Redirect } from 'expo-router';

const IndexRedirect = () => {
  const isAuthenticated = false;

  return isAuthenticated ? <Redirect href="/(home)" /> : <Redirect href="/(auth)" />;
};

export default IndexRedirect;
