export class MockOfflineService  {
  async initServiceWorker(): Promise<void> {
    return;
  }
  async checkForUpdate(): Promise<boolean> {
    return false;
  }
  serviceWorkerSupported(): boolean {
    return true;
  }
}
