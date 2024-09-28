import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class FireCrawlApi implements ICredentialType {
	name = 'fireCrawlApi';

	displayName = 'FireCrawl API';

	documentationUrl = 'https://docs.firecrawl.dev/introduction#api-key';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.firecrawl.dev/v1',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
