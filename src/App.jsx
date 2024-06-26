// import RemoteComponent from 'jsRemote/RemoteComponent';
// import AnotherComponent from 'jsRemote/AnotherComponent';
import { WidgetLoader } from "gmd-mf-widget-loader";

const App = () => {
  return (
    <>
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      {/* <RemoteComponent/>
      <AnotherComponent/> */}
      <WidgetLoader pluginId={"jsRemote/RemoteComponent"} />
      <WidgetLoader pluginId={"jsRemote/AnotherComponent"} />
      <WidgetLoader pluginId={"jsRemote/NonExistantComponent"} />
      <WidgetLoader pluginId={"jsRemoteTwo/App"} />
    </>
  );
};

export default App;
