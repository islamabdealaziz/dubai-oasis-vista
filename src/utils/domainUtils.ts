
export class DomainUtils {
  static isCustomDomain(): boolean {
    const hostname = window.location.hostname;
    console.log('Checking hostname for custom domain:', hostname);
    const isCustom = hostname === 'damac.dlleni.com';
    console.log('Is custom domain?', isCustom);
    return isCustom;
  }
}
