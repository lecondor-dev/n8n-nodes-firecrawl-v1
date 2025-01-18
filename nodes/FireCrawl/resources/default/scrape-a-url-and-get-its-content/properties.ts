/* eslint-disable n8n-nodes-base/node-param-option-description-identical-to-name */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased-id */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased-id */
/* eslint-disable n8n-nodes-base/node-param-description-boolean-without-whether */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */

import { INodeProperties } from 'n8n-workflow'

// @ts-ignore
import * as helpers from '../../../helpers'

export const properties: INodeProperties[] = [
  {
    displayName: 'POST /scrape',
    name: 'operation',
    type: 'notice',
    typeOptions: {
      theme: 'info',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['Scrape A Url And Get Its Content'],
      },
    },
  },
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',
    default: '',
    description: 'The URL to scrape',
    required: true,
    routing: {
      request: {
        body: {
          url: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Default'],
        operation: ['Scrape A Url And Get Its Content'],
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
        name: 'Extract',
        value: 'extract',
      },
      {
        name: 'Full Page Screenshot',
        value: 'screenshot@fullPage',
      },
      {
        name: 'HTML',
        value: 'html',
      },
      {
        name: 'Links',
        value: 'links',
      },
      {
        name: 'Markdown',
        value: 'markdown',
      },
      {
        name: 'Raw HTML',
        value: 'rawHtml',
      },
      {
        name: 'Screenshot',
        value: 'screenshot',
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
        operation: ['Scrape A Url And Get Its Content'],
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
        description: 'Whether to return only the main content of the page excluding headers, navs, footers, etc',
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
        displayName: 'Wait for (MS)',
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
        displayName: 'Timeout (MS)',
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
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Default'],
        operation: ['Scrape A Url And Get Its Content'],
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
        operation: ['Scrape A Url And Get Its Content'],
        formats: ['extract'],
      },
    },
  },
  {
    displayName: 'Actions',
    name: 'actions',
    type: 'fixedCollection',
    default: [],
    typeOptions: {
      multipleValues: true,
    },
    description: 'List of actions to interact with dynamic content before scraping',
    placeholder: 'Add Action',
    options: [
      {
        displayName: 'Items',
        name: 'items',
        values: [
          {
            displayName: 'Type',
            type: 'options',
            default: 'wait',
            options: [
              {
                name: 'Wait',
                value: 'wait',
              },
              {
                name: 'Click',
                value: 'click',
              },
              {
                name: 'Write',
                value: 'write',
              },
              {
                name: 'Press',
                value: 'press',
              },
              {
                name: 'Screenshot',
                value: 'screenshot',
              },
            ],
            name: 'type',
          },
          {
            displayName: 'Selector',
            type: 'string',
            default: '',
            description: 'The CSS selector for `click` and `write` actions',
            name: 'selector',
          },
          {
            displayName: 'Milliseconds',
            type: 'number',
            default: 0,
            description: 'Milliseconds to wait for `wait` action',
            name: 'milliseconds',
          },
          {
            displayName: 'Text',
            type: 'string',
            default: '',
            description: 'Text for `write` action',
            name: 'text',
          },
          {
            displayName: 'Key',
            type: 'string',
            default: '',
            description: 'Key for `press` action',
            name: 'key',
          },
        ],
      },
    ],
    routing: {
      request: {
        body: {
          actions: '={{$value.items}}',
        },
      },
    },
    displayOptions: {
      hide: {
        useCustomBody: [true],
      },
      show: {
        resource: ['Default'],
        operation: ['Scrape A Url And Get Its Content'],
      },
    },
  },
]
