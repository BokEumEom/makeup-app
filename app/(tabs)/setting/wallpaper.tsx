import PexelsWallpapers from '@/components/PexelsWallpapers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyleSheet, View } from 'react-native'

const queryClient = new QueryClient();

const Wallpaper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PexelsWallpapers />
    </QueryClientProvider>
  )
}

export default Wallpaper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  }
})