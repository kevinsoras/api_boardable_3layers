export function filtering(
  query: string,
  filters: Record<string, any>,
  queryParams: (string | boolean | number|Date)[]
): string {
  Object.entries(filters).forEach(([key, value], index) => {
    if (value) {
      queryParams.push(value);
      if (index === 0) {
        query += ` WHERE ${key} = $${queryParams.length}`;
      } else {
        query += ` AND "${key}" = $${queryParams.length}`;
      }
    }
  });

  return query;
}

export function sorting(query: string, orderBy: string,order:string): string {
  
  query += ` ORDER BY ${orderBy} ${order.toUpperCase()}`;

  return query;
}