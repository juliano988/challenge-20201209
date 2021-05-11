import { DetailedHTMLProps, ImgHTMLAttributes } from "react"

export type User = {
  gender: string,
  name: {
    title: string,
    first: string,
    last: string
  },
  location: {
    street: {
      number: number,
      name: string
    },
    city: string,
    state: string,
    postcode: number,
    coordinates: {
      latitude: number,
      longitude: number
    },
    timezone: {
      offset: string,
      description: string
    }
  },
  email: string,
  login: {
    uuid: string,
    username: string,
    password: string,
    salt: string,
    md5: string,
    sha1: string,
    sha256: string
  },
  dob: {
    date: string,
    age: number
  },
  registered: {
    date: string,
    age: number
  },
  phone: string,
  cell: string,
  userId: {
    name: string,
    value: string
  },
  picture: {
    large: string,
    medium: string,
    thumbnail: string
  },
  nat: string
}

export type TableItem = {
  image: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  imageMin: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  title: string,
  fullName: string,
  email: string,
  gender: string,
  birthDate: string,
  phone: string,
  nationality: string,
  address: string,
  id: string
}

export type PaginationMeta = {
  page: number,
  pages: number,
  pageUsers: number,
  totalUsers: number,
}