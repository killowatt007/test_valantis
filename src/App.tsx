import { Layout } from 'antd';
import './App.css';
import DataTable from './components/ProductItems';
import { Content } from 'antd/es/layout/layout';
import ProductContainer from './components/ProductContainer';

const md5 = require('md5');

function App() {
  return (
    <Layout style={{minHeight: '100vh', height: '100%'}}>
      <Content style={{ padding: '48px' }}>
        <ProductContainer/>
      </Content>
    </Layout>
  );
}

export default App;
