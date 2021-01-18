type Environment = {
  apiUrl: string;
  apiKey: string;
  availableSchemas: string[];
};

export const environment: Environment = {
  apiUrl: process.env.REACT_APP_API_URL as string,
  apiKey: process.env.REACT_APP_API_KEY as string,
  availableSchemas: process.env.REACT_APP_AVAILABLE_SCHEMAS
    ? process.env.REACT_APP_AVAILABLE_SCHEMAS.split(',')
    : ([] as string[]),
};
