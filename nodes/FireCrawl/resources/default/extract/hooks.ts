import { IHookFunctions } from 'n8n-workflow';

export async function validateSingleURL(this: IHookFunctions): Promise<boolean> {
  const url = this.getNodeParameter('url', '') as string;
  
  if (!url) {
    throw new Error('URL must be provided');
  }

  try {
    new URL(url);
  } catch (error) {
    throw new Error(`Invalid URL format: ${url}`);
  }

  return true;
}

export async function validateExtractionParameters(this: IHookFunctions): Promise<boolean> {
  const extractType = this.getNodeParameter('extractType', '') as string;
  
  if (extractType === 'prompt') {
    const prompt = this.getNodeParameter('prompt', '') as string;
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Prompt must be provided for simple prompt extraction');
    }
  } else if (extractType === 'schema') {
    const schema = this.getNodeParameter('schema', '') as string;
    try {
      JSON.parse(schema);
    } catch (error) {
      throw new Error('Invalid JSON schema format');
    }
  }

  return true;
}

export async function validateParameters(this: IHookFunctions): Promise<boolean> {
  await validateSingleURL.call(this);
  await validateExtractionParameters.call(this);
  
  return true;
}