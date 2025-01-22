import { INodeProperties } from 'n8n-workflow';

export function runHooks(properties: INodeProperties[]): { properties: INodeProperties[] } {
	return {
		properties,
	};
}