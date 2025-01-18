import { INodeProperties } from 'n8n-workflow'

export const properties: INodeProperties[] = [
  {
    displayName: 'POST /batch/scrape',
    name: 'operation',
    type: 'notice',
    typeOptions: {
      theme: 'info',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['Batch Scrape'],
      },
    },
  },
  {
    displayName: 'URLs',
    name: 'urls',
    type: 'string',
    typeOptions: {
      multipleValues: true,
    },
    default: [],
    description: 'The URLs to scrape',
    required: true,
    routing: {
      request: {
        body: {
          urls: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Default'],
        operation: ['Batch Scrape'],
      },
    },
  },
  {
    displayName: 'Webhook URL',
    name: 'webhook',
    type: 'string',
    default: '',
    description: 'URL to receive webhook notifications about batch scrape progress',
    routing: {
      request: {
        body: {
          webhook: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Default'],
        operation: ['Batch Scrape'],
      },
    },
  },
  {
    displayName: 'Formats',
    name: 'formats',
    type: 'multiOptions',
    default: [],
    description: 'Output format(s) for the scraped data',
    options: [
      {
        name: 'Markdown',
        value: 'markdown',
      },
      {
        name: 'HTML',
        value: 'html',
      },
      {
        name: 'Raw HTML',
        value: 'rawHtml',
      },
      {
        name: 'Links',
        value: 'links',
      },
      {
        name: 'Screenshot',
        value: 'screenshot',
      },
      {
        name: 'Full Page Screenshot',
        value: 'screenshot@fullPage',
      },
      {
        name: 'Extract',
        value: 'extract',
      },
    ],
    routing: {
      request: {
        body: {
          formats: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Default'],
        operation: ['Batch Scrape'],
      },
    },
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    options: [
      {
        displayName: 'Only Main Content',
        name: 'onlyMainContent',
        type: 'boolean',
        default: true,
        description: 'Whether to return only the main content of the page excluding headers, navs, footers, etc.',
      },
      {
        displayName: 'Include Tags',
        name: 'includeTags',
        type: 'string',
        default: '',
        description: 'Tags to include in the output (comma-separated)',
        routing: {
          request: {
            body: {
              includeTags: '={{ $value.split(",").map(tag => tag.trim()) }}',
            },
          },
        },
      },
      {
        displayName: 'Exclude Tags',
        name: 'excludeTags',
        type: 'string',
        default: '',
        description: 'Tags to exclude from the output (comma-separated)',
        routing: {
          request: {
            body: {
              excludeTags: '={{ $value.split(",").map(tag => tag.trim()) }}',
            },
          },
        },
      },
      {
        displayName: 'Headers',
        name: 'headers',
        type: 'json',
        default: '{}',
        description: 'Headers to send with the request. Can be used to send cookies, user-agent, etc.',
        routing: {
          request: {
            body: {
              headers: '={{ $value }}',
            },
          },
        },
      },
      {
        displayName: 'Wait For (ms)',
        name: 'waitFor',
        type: 'number',
        default: 0,
        description: 'Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load',
      },
      {
        displayName: 'Mobile',
        name: 'mobile',
        type: 'boolean',
        default: false,
        description: 'Whether to emulate scraping from a mobile device. Useful for testing responsive pages and taking mobile screenshots.',
      },
      {
        displayName: 'Skip TLS Verification',
        name: 'skipTlsVerification',
        type: 'boolean',
        default: false,
        description: 'Whether to skip TLS certificate verification when making requests',
      },
      {
        displayName: 'Timeout (ms)',
        name: 'timeout',
        type: 'number',
        default: 30000,
        description: 'Timeout in milliseconds for the request',
      },
      {
        displayName: 'Remove Base64 Images',
        name: 'removeBase64Images',
        type: 'boolean',
        default: true,
        description: 'Whether to remove base64 encoded images from the output, which may be overwhelmingly long',
      },
      {
        displayName: 'Ignore Invalid URLs',
        name: 'ignoreInvalidURLs',
        type: 'boolean',
        default: false,
        description: 'Whether to ignore invalid URLs and continue with valid ones instead of failing the entire request',
      },
    ],
    routing: {
      request: {
        body: {
          onlyMainContent: '={{ $value.onlyMainContent }}',
          waitFor: '={{ $value.waitFor }}',
          mobile: '={{ $value.mobile }}',
          skipTlsVerification: '={{ $value.skipTlsVerification }}',
          timeout: '={{ $value.timeout }}',
          removeBase64Images: '={{ $value.removeBase64Images }}',
          ignoreInvalidURLs: '={{ $value.ignoreInvalidURLs }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Default'],
        operation: ['Batch Scrape'],
      },
    },
  },
  {
    displayName: 'Extract',
    name: 'extract',
    type: 'fixedCollection',
    default: {},
    description: undefined,
    options: [
      {
        displayName: 'Items',
        name: 'items',
        values: [
          {
            displayName: 'Schema',
            type: 'string',
            default: '',
            description: 'The schema for structured data extraction',
            name: 'schema',
          },
          {
            displayName: 'System Prompt',
            type: 'string',
            default: '',
            description: 'The system prompt used for extraction',
            name: 'systemPrompt',
          },
          {
            displayName: 'Prompt',
            type: 'string',
            default: '',
            description: 'Extraction prompt without schema',
            name: 'prompt',
          },
        ],
      },
    ],
    routing: {
      request: {
        body: {
          extract: '={{$value.items}}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Default'],
        operation: ['Batch Scrape'],
        formats: ['extract'],
      },
    },
  },
]