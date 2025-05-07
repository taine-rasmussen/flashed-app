import { Redirect } from 'expo-router';

const IndexRedirect = () => {
  const isAuthenticated = true;
  const isLoading = false;

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Redirect href="/(home)" /> : <Redirect href="/(auth)" />;
};

export default IndexRedirect;
