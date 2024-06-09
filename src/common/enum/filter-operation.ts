export enum FilterOperation {
  EQ = 'EQ',
  NOT = 'NOT',
  LT = 'LT',
  GT = 'GT',
  LTE = 'LTE',
  GTE = 'GTE',
}

export const AllowedBooleanOperations: FilterOperation[] = [
  FilterOperation.EQ,
  FilterOperation.NOT,
];

export const AllowedStringOperations: FilterOperation[] = [
  FilterOperation.EQ,
  FilterOperation.NOT,
];

export const AllowedTimeOperations: FilterOperation[] = [
  FilterOperation.EQ,
  FilterOperation.LT,
  FilterOperation.GT,
  FilterOperation.LTE,
  FilterOperation.GTE,
];