import { Router } from 'next/router'
import '../styles/globals.css'

// the next.js AppProps sucks. Is is a better version of AppProps
interface AppProps<PageProps extends object, LayoutProps extends object> {
  pageProps: PageProps
  Component:
    | React.FC<PageProps>
    | ComponentWithLayout<Omit<PageProps, keyof LayoutProps>, LayoutProps>
  router: Router
}

export type ComponentWithLayout<
  BackendProps extends object,
  LayoutProps extends object
> = React.FC<BackendProps & LayoutProps> & {
  // using render props over HOC
  // https://medium.com/simply/comparison-hocs-vs-render-props-vs-hooks-55f9ffcd5dc6
  layout: React.FC<{
    children: React.FC<BackendProps & LayoutProps>
    backendProps: BackendProps
  }>
}

function MyApp<PageProps extends object, LayoutProps extends object>({
  Component,
  pageProps,
}: AppProps<PageProps, LayoutProps>) {
  if ('layout' in Component) {
    // create JSX.Element this way will not trigger hooks
    // this way I can handle remount myself
    // but be careful sometime this will lead to unwanted behavior
    return Component.layout({ children: Component, backendProps: pageProps })
  }

  return <Component {...pageProps} />
}

export default MyApp
