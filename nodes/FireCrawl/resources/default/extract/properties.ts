import { INodeProperties } from 'n8n-workflow';

export const properties: INodeProperties[] = [
  {
    displayName: 'URLs',
    name: 'urls',
    type: 'string',
    typeOptions: {
      multipleValues: true,
      multipleValueButtonText: 'Add URL',
    },
    default: '',
    required: true,
    description: 'URLs to extract data from. Can include wildcards (e.g., example.com/*).',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['Extract'],
      },
    },
  },
  {
    displayName: 'Extract Type',
    name: 'extractType',
    type: 'options',
    options: [
      {
        name: 'Use Prompt',
        value: 'prompt',
      },
      {
        name: 'Use Schema',
        value: 'schema',
      },
    ],
    default: 'prompt',
    description: 'Whether to use a natural language prompt or a JSON schema for extraction.',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['Extract'],
      },
    },
  },
  {
    displayName: 'Prompt',
    name: 'prompt',
    type: 'string',
    typeOptions: {
      rows: 4,
    },
    default: '',
    description: 'Natural language prompt describing the data to extract.',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['Extract'],
        extractType: ['prompt'],
      },
    },
  },
  {
    displayName: 'Schema',
    name: 'schema',
    type: 'json',
    default: '{\n  "company_mission": "string",\n  "supports_sso": "boolean",\n  "is_open_source": "boolean"\n}',
    description: 'JSON schema defining the structure of data to extract.',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['Extract'],
        extractType: ['schema'],
      },
    },
  },
  {
    displayName: 'Enable Web Search',
    name: 'enableWebSearch',
    type: 'boolean',
    default: false,
    description: 'Whether extraction can follow links outside specified domain.',
    displayOptions: {
      show: {
        resource: ['Default'],
        operation: ['Extract'],
      },
    },
  },
];