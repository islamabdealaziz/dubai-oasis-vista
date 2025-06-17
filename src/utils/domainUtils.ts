
export class DomainUtils {
  static getCurrentDomain(): string {
    return window.location.hostname;
  }
  
  static isDamacDomain(): boolean {
    const hostname = window.location.hostname;
    return hostname.includes('damac') || hostname.includes('dlleni');
  }
}
