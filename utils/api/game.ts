import { GAME_API_URL, MAP_API_URL } from '~/consts/api'

interface FetchParam {
  method?: string
  body?: any
}
interface CustomFetch {
  <R>(_url: string, _param?: FetchParam): Promise<R>
}
export const customFetch: CustomFetch = async (_url: string, _param: any) => {
  const { method = 'GET', body } = _param || {}

  const fetchOption = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  }

  const res = await fetch(_url, fetchOption)
  switch (res.status) {
    case 200:
    case 201:
      return await res.json()

    default:
      console.log(res)
      break
  }
}

interface PostGameClearDataParam {
  center: string
  userName: string
  phone: string
  score: number
}
interface PostGameClearDataReturn extends PostGameClearDataParam {
  id: string
}
export const postGameClearData = async ({ center, userName, phone, score }: PostGameClearDataParam) => {
  return await customFetch<PostGameClearDataReturn>(GAME_API_URL, {
    method: 'POST',
    body: {
      center,
      userName,
      phone,
      score,
    },
  })
}

export interface CenterInfo {
  id: string
  data: string //number[][]
}
export const getCenterList = async () => {
  const _res = await customFetch<CenterInfo[]>(MAP_API_URL)

  return (_res || []).map((center) => center.id)
}

export const getGameMap = async (_centerId: string) => {
  const _res = await customFetch<CenterInfo>(`${MAP_API_URL}/${_centerId}`)

  return JSON.parse(_res.data)
}
