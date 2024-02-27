import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../store/reducers/ActionCreators';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import ProductItems from './ProductItems';
import { message } from 'antd';

const limit = 50
const getOffset = (page: number) => page ? limit * page : 0

type Props = {}

const ProductContainer: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState()
  const {products, isLoading, error} = useAppSelector(state => state.productReducer)

  const nextPage = () => setPage(page + 1)
  const prevPage = () => setPage(page - 1)

  useEffect(() => {
    dispatch(fetchProducts(getOffset(page), limit, filter))
  }, [page, filter])

  if (error) {
    message.error(error)
  }

  return (<>
    <ProductItems
      products={products}
      isLoading={isLoading}
      page={page}
      nextPage={nextPage}
      prevPage={prevPage}
      pagination={!Boolean(filter)}
      setFilter={setFilter}
    />
  </>)
};

export default ProductContainer;