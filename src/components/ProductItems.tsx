import React, { useState } from 'react';
import { Affix, Button, Input, Select, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { IProduct } from '../models/IProduct';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

interface DataType extends IProduct {
  key: React.Key
}

function currencyFormat(num: number) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Название',
    dataIndex: 'product',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    render: (text) => currencyFormat(Number(text))
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',
  },
];

type Props = {
  products: IProduct[]
  isLoading: boolean
  page: number
  setFilter: Function
  nextPage: Function
  prevPage: Function
  pagination: boolean
}

const ProductItems: React.FC<Props> = ({products, isLoading, page, setFilter, nextPage, prevPage, pagination}) => {
  const dataSource: DataType[] = products.map((product, i) => ({...product, key: i}))
  const [filterField, setFilterField] = useState('product')
  const [filterValue, setFilterValue] = useState('')

  const selectBefore = (
    <Select 
      onChange={setFilterField}
      defaultValue={filterField}
      value={filterField}
      style={{width: '110px'}}
    >
      <Option value="product">Название</Option>
      <Option value="price">Цена</Option>
      <Option value="brand">Бренд</Option>
    </Select>
  ); 

  const handleFilter = () => {
    if (filterValue) {
      const value = filterField == 'price' ? Number(filterValue) : filterValue

      setFilter({[filterField]: value})
    }
    else {
      setFilter(undefined)
    }
  }

  return (<>
    <Space.Compact style={{marginBottom: '20px'}}>
      <Input
        onChange={(value) => setFilterValue(value.target.value)}
        size="large"
        addonBefore={selectBefore}
        placeholder='Введите для поиска...'
        allowClear
      />
      <Button
        size="large"
        type="primary"
        onClick={handleFilter}
      >
        <SearchOutlined /> Найти
      </Button>
    </Space.Compact>
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      loading={isLoading}
    />
    {pagination &&
    <Affix
      key={String(isLoading)}
      offsetBottom={0}
      className='pagination'
    >
      <div className='layer'>
        <Button
          disabled={page ? false : true}
          onClick={() => prevPage()}
        >
          {'< Назад'}
        </Button>
        <Button
          disabled={products.length ? false : true}
          onClick={() => nextPage()}
        >
          {'Вперед >'}
        </Button>
      </div>
    </Affix>
    }
  </>)
};

export default ProductItems;