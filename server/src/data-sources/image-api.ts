import BaseAPI from './base-api'
import { UploadImageResponse } from '../__generated__/schema-types'
import FormData from 'form-data'
import rawBody from 'raw-body'

export default class ImageAPI extends BaseAPI {
  constructor() {
    super()
  }

  async uploadImage(imageFile: any): Promise<UploadImageResponse> {
    try {
      const { createReadStream, filename, mimetype } = await imageFile

      // Key piece here https://github.com/form-data/form-data/issues/394
      const buffer = await rawBody(createReadStream())

      const formData = new FormData()

      formData.append('asset', buffer, {
        filename,
        contentType: mimetype,
        knownLength: buffer.length,
      })

      const response = await this.post('vx/asset/upload/9', formData)

      return {
        __typename: 'UploadImageSuccess',
        success: true,
        path: response.path,
      }
    } catch (e) {
      console.error(e, e.extensions.response)

      return {
        __typename: 'UploadImageFailure',
        success: false,
        message: e.extensions.response,
      }
    }
  }
}
