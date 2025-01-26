import {
  BinaryFileType,
  IBinaryData,
  IDataObject,
  IExecuteSingleFunctions,
  IHttpRequestOptions,
  IN8nHttpFullResponse,
  INodeExecutionData,
  IPostReceiveBinaryData,
  IPostReceiveFilter,
  IPostReceiveLimit,
  IPostReceiveRootProperty,
  IPostReceiveSet,
  IPostReceiveSetKeyValue,
  IPostReceiveSort,
} from 'n8n-workflow'

export async function preSendActionCustonBody (
  this: IExecuteSingleFunctions,
  requestOptions: IHttpRequestOptions
): Promise<IHttpRequestOptions> {
  if (!requestOptions.body) {
    return Promise.resolve(requestOptions);
  }

  const body = requestOptions.body as IDataObject;
  const { customBody } = body;

  if (typeof body === 'object' && typeof customBody === 'object') {
    // Handle URLs collection
    if (body.urls && typeof body.urls === 'object') {
      const urlsCollection = body.urls as { values?: Array<{ url: string }> };
      if (urlsCollection.values && Array.isArray(urlsCollection.values)) {
        body.urls = urlsCollection.values.map(item => item.url || '').filter(url => url !== '');
      } else {
        body.urls = [];
      }
    }

    requestOptions.body = {
      ...body,
      ...customBody,
    };

    delete (requestOptions.body as IDataObject).customBody;
  }

  return Promise.resolve(requestOptions);
}

/* eslint-disable indent */
/* tslint:disable:indent */
export type PostReceiveAction =
  | ((
      this: IExecuteSingleFunctions,
      items: INodeExecutionData[],
      response: IN8nHttpFullResponse
    ) => Promise<INodeExecutionData[]>)
  | IPostReceiveBinaryData
  | IPostReceiveFilter
  | IPostReceiveLimit
  | IPostReceiveRootProperty
  | IPostReceiveSet
  | IPostReceiveSetKeyValue
  | IPostReceiveSort
/* eslint-enable indent */
/* tslint:enable:indent */

function getresponseContentType (response: IN8nHttpFullResponse): string {
  return response.headers['content-type'] as string
}

function getFileTypeFromContentType (contentType: string): string {
  const type = contentType.split(';')[0].trim()

  if (type.includes('/')) {
    return type.split('/')[0]
  }

  return type
}

function getFileExtensionFromContentType (contentType: string): string {
  const type = contentType.split(';')[0].trim()

  // any/thing -> thing
  if (typeof type === 'string' && type.includes('/')) {
    return type.split('/')[1]
  }

  return type
}

function isBinaryResponse (contentType: string): boolean {
  const textContentTypes = [
    /application\/json/,
    /application\/xml/,
    /application\/xhtml\+xml/,
    /application\/atom\+xml/,
    /application\/rss\+xml/,
    /application\/rdf\+xml/,
    /application\/ld\+json/,
    /application\/pdf/,
    /application\/ld\+json/,
    /^text\//,
  ]

  return !textContentTypes.some((regex) => regex.test(contentType))
}

export const postReceiveActionBinaryData: PostReceiveAction =
  async function postReceiveActionBinaryData (
    this: IExecuteSingleFunctions,
    items: INodeExecutionData[],
    response: IN8nHttpFullResponse
  ): Promise<INodeExecutionData[]> {
    const contentType = getresponseContentType(response)
    const isBinary = isBinaryResponse(contentType)

    const { binary } = items[0]

    if (
      isBinary &&
      binary &&
      binary.data &&
      binary.data.mimeType === 'text/plain'
    ) {
      const data = binary.data as IBinaryData

      // convert response body base64 to binary
      // @ts-ignore
      data.data = Buffer.from(response.body as string, 'binary')

      data.mimeType = contentType
      data.fileType = getFileTypeFromContentType(contentType) as BinaryFileType
      data.fileExtension = getFileExtensionFromContentType(contentType)
    }

    if (binary && binary.data && !binary.data.fileName) {
      binary.data.fileName = `data.${getFileExtensionFromContentType(
        contentType
      )}`
    }

    return items
  }
