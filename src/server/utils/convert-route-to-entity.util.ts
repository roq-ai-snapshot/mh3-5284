const mapping: Record<string, string> = {
  channels: 'channel',
  organizations: 'organization',
  'suggested-changes': 'suggested_change',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
