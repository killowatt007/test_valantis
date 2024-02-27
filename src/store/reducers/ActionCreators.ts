import { AppDispatch } from "../store";
import { productSlice } from "./ProductSlice";

type IdsType = {
  result: string[]
}
type FilterType = {
  price?: number
  product?: string
}

const date = new Date()
const md5 = require('md5');

const timestamp = date.getUTCFullYear()+('0'+(date.getUTCMonth()+1)).slice(-2)+('0'+date.getUTCDate()).slice(-2)

const config: any = {
  link:' https://api.valantis.store:41000',
  method: 'post',
  headers: [
    ['X-Auth', md5('Valantis_'+timestamp)],
    ["Content-Type", "application/json"]
  ]
}

const get_ids = (offset: number, limit: number) => async (dispatch: AppDispatch) => {
  let result: IdsType | null = null

  try {
    const response = await fetch(config.link, {
      method: config.method,
      headers: config.headers,
      body: JSON.stringify({action: 'get_ids', params: {offset: offset, limit: limit}}),
    })

    result = await response.json()
  } catch (e: any) {
    console.log(e.message)
    dispatch(productSlice.actions.productsFetchingError('Ошибка загрузки данных'))
  }

  return result
}

const filter = (params: FilterType | undefined) => async (dispatch: AppDispatch) => {
  let result: IdsType | null = null

  try {
    const response = await fetch(config.link, {
      method: config.method,
      headers: config.headers,
      body: JSON.stringify({action: 'filter', params: params}),
    })

    result = await response.json()
  } catch (e: any) {
    console.log(e.message)
    dispatch(productSlice.actions.productsFetchingError('Ошибка загрузки данных'))
  }

  return result
}

export const fetchProducts = (offset: number, limit: number, filterParams?: FilterType) => async (dispatch: AppDispatch) => {
  try {
    let ids: IdsType | null

    dispatch(productSlice.actions.productsFetching())

    if (filterParams) {
      ids = await dispatch(filter(filterParams))
    }
    else {
      ids = await dispatch(get_ids(offset, limit))
    }

    if (ids) {
      const response = await fetch(config.link, {
        method: config.method,
        headers: config.headers,
        body: JSON.stringify({action: 'get_items', params: {ids: ids.result}}),
      })  
      const products = await response.json()
      const productsUnique: any = Object.values(products.result.reduce((acc: any, n: any) => (
        acc[n.id] = n.checked ? n : (acc[n.id] || n), acc
      ), {}))

      dispatch(productSlice.actions.productsFetchingSuccess(productsUnique))
    }
  } catch (e: any) {
    console.log(e.message)
    dispatch(productSlice.actions.productsFetchingError('Ошибка загрузки данных'))
  }
}