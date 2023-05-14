import config from "@/web/config.js"
import axios from "axios"
import deepmerge from "deepmerge"

const call =
  (method) =>
  async (path, data = null, options = {}) => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    options.headers = deepmerge(
      options.headers,
      jwt ? { authorization: jwt } : {}
    )

    const opts = {
      baseURL: config.api.baseURL,
      ...options,
    }

    return axios[method](path, method === "get" ? opts : data, opts)
  }

const api = {
  post: call("post"),
  get: call("get"),
  patch: call("patch"),
  delete: call("delete"),
}

export default api
