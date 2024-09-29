/* eslint-disable n8n-nodes-base/node-param-option-description-identical-to-name */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased-id */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased-id */
/* eslint-disable n8n-nodes-base/node-param-description-boolean-without-whether */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */

import { INodeProperties } from 'n8n-workflow';

// @ts-ignore
import * as helpers from '../../../helpers';

export const properties: INodeProperties[] = [
	{
		displayName: 'POST /crawl',
		name: 'operation',
		type: 'notice',
		typeOptions: {
			theme: 'info',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['Default'],
				operation: ['Submit A Crawl Job'],
			},
		},
	},
	{
		displayName: 'Url',
		required: true,
		name: 'url',
		type: 'string',
		default: '',
		description: 'The URL to crawl',
		routing: {
			request: {
				body: {
					url: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			hide: {
				'/options.useCustomBody': [true],
			},
			show: {
				resource: ['Default'],
				operation: ['Submit A Crawl Job'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			request: {
				body: {
					limit: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			hide: {
				'/options.useCustomBody': [true],
			},
			show: {
				resource: ['Default'],
				operation: ['Submit A Crawl Job'],
			},
		},
	},
	{
		displayName: 'Exclude Paths',
		name: 'excludePaths',
		type: 'fixedCollection',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		description: 'List of paths to exclude from the crawl',
		placeholder: 'Add item',
		options: [
			{
				displayName: 'Items',
				name: 'items',
				values: [
					{
						displayName: 'Item',
						name: 'Item',
						type: 'string',
						default: '',
					},
				],
			},
		],
		routing: {
			request: {
				body: {
					excludePaths: '={{$value.items}}',
				},
			},
		},
		displayOptions: {
			hide: {
				'/options.useCustomBody': [true],
			},
			show: {
				resource: ['Default'],
				operation: ['Submit A Crawl Job'],
			},
		},
	},
	{
		displayName: 'Allow Backward Links',
		name: 'allowBackwardLinks',
		type: 'boolean',
		default: true,
		description: 'Allow crawling pages that are not direct descendants of the initial URL',
		routing: {
			request: {
				body: {
					allowBackwardLinks: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			hide: {
				'/options.useCustomBody': [true],
			},
			show: {
				resource: ['Default'],
				operation: ['Submit A Crawl Job'],
			},
		},
	},
	{
		displayName: 'Webhook',
		name: 'webhook',
		type: 'string',
		default: '',
		description: 'URL to send webhook events during the crawl process',
		routing: {
			request: {
				body: {
					webhook: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			hide: {
				'/options.useCustomBody': [true],
			},
			show: {
				resource: ['Default'],
				operation: ['Submit A Crawl Job'],
			},
		},
	},
	{
		displayName: 'Scrape Options',
		name: 'scrapeOptions',
		type: 'fixedCollection',
		default: {},
		description: 'Scraping options',
		options: [
			{
				displayName: 'Items',
				name: 'items',
				values: [
					{
						displayName: 'Formats',
						type: 'multiOptions',
						default: [],
						description: 'Output format(s) for the scraped data',
						options: [
							{
								name: 'Markdown',
								value: 'markdown',
							},
							{
								name: 'Html',
								value: 'html',
							},
							{
								name: 'Extract',
								value: 'extract',
							},
						],
						name: 'formats',
					},
					{
						displayName: 'Extract',
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
										displayName: 'systemPrompt',
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
						name: 'extract',
					},
				],
			},
		],
		routing: {
			request: {
				body: {
					scrapeOptions: '={{$value.items}}',
				},
			},
		},
		displayOptions: {
			hide: {
				'/options.useCustomBody': [true],
			},
			show: {
				resource: ['Default'],
				operation: ['Submit A Crawl Job'],
			},
		},
	},
	{
		displayName: 'Custom Body',
		name: 'customBody',
		type: 'json',
		default:
			'{\n  "url": "string",\n  "limit": 0,\n  "excludePaths": [\n    "string"\n  ],\n  "allowBackwardLinks": true,\n  "webhook": "string",\n  "scrapeOptions": {\n    "formats": [\n      "markdown"\n    ],\n    "extract": {\n      "schema": "string",\n      "systemPrompt": "string",\n      "prompt": "string"\n    }\n  }\n}',
		description: 'Custom body to send',
		routing: {
			send: {
				preSend: [helpers.hooks.preSendActionCustonBody],
			},
		},
		displayOptions: {
			show: {
				'/options.useCustomBody': [true],
				resource: ['Default'],
				operation: ['Submit A Crawl Job'],
			},
		},
	},
];
