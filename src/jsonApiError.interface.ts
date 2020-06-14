export interface JsonApiErrorSource {
  pointer?: string;
  parameter?: string;
}

export interface JsonApiError {
  id?: string;
  status: number;
  code?: string;
  title: string;
  detail?: string;
  source?: JsonApiErrorSource;
  meta?: any;
}

export interface JsonApiErrorDocument {
  errors: JsonApiError[];
}
