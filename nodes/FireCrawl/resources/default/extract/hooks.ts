import { IHookFunctions } from 'n8n-workflow';

export async function validateURLs(this: IHookFunctions): Promise<boolean> {
  const urls = this.getNodeParameter('urls.values', []) as Array<{ url: string }>;
  
  if (urls.length === 0) {
    throw new Error('At least one URL must be provided');
  }

  for (const { url } of urls) {
    try {
      new URL(url);
    } catch (error) {
      throw new Error(`Invalid URL format: ${url}`);
    }
  }

  return true;
}

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
  const urls = this.getNodeParameter('urls.values', []) as Array<{ url: string }>;
  const singleUrl = this.getNodeParameter('url', '') as string;
  
  if (urls.length > 0 && singleUrl) {
    throw new Error('Cannot use both single URL and multiple URLs. Please use one or the other.');
  }

  if (urls.length > 0) {
    await validateURLs.call(this);
  } else if (singleUrl) {
    await validateSingleURL.call(this);
  } else {
    throw new Error('At least one URL must be provided');
  }

  await validateExtractionParameters.call(this);
  
  return true;
}