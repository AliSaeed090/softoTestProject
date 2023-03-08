import { rest } from 'msw'
import {cartList} from './Data'
export const handlers = [
  rest.get('https://my-json-server.typicode.com/benirvingplt/products/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(cartList)
    )
  }),
]
 