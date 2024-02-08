export class SuccessResponse {
  ok: boolean;
  data?: Record<string, string> | Record<string, any>[];
  pagination?: Record<string, any>;
  constructor(
    ok: boolean,
    data?: Record<string, any> | Record<string, string>[],
    pagination?:Record<string, any>
    ) {
    this.ok = ok;
    this.data = data;
    this.pagination=pagination
  }
}
