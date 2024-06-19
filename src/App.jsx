// import RemoteComponent from 'jsRemote/RemoteComponent';
// import AnotherComponent from 'jsRemote/AnotherComponent';
import WidgetLoader from './WidgetLoader';
import './App.css';

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      {/* <RemoteComponent/>
      <AnotherComponent/> */}
      <WidgetLoader pluginId={'jsRemote/RemoteComponent'} />
      <WidgetLoader pluginId={'jsRemote/AnotherComponent'} />
      <WidgetLoader pluginId={'jsRemote/NonExistantComponent'} />
    </div>
  );
};

export default App;
