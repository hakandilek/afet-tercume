(function () {
  'use strict';
  importScripts('dexie.min.js');

  let searchLogApi;
  let dbVersion;

  const db = new Dexie('offline-db');

  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('sync', (event) => {
    if (searchLogApi && dbVersion) {
      event.waitUntil(serverSync(event.source));
    }
  });

  self.addEventListener('message', (event) => {
    if (!event?.data?.type) {
      // unexpected message data-model;
      return;
    }
    const message = event.data;
    switch (message.type) {
      case 'SwConfig':
        searchLogApi = message.searchLogApi;
        dbVersion = message.dbVersion;
        event.waitUntil(serverSync());
        break;

      default:
        break;
    }
  });

  async function serverSync() {
    if (!searchLogApi || !dbVersion) {
      return Promise.reject('sync failed: config missing in sw');
    }
    db.version(1).stores({
      searchLog: '&id, searchTerm, sourceLocale, targetLocale, created, synced',
      syncs: '&id, lastSync'
    });
    db.open();
    const toSend = await db.searchLog
      .filter(searchLog => !searchLog.synced).toArray();

    if (!toSend.length) {
      return notifyClients();
    }

    const reqRows = toSend.map(update => {
      return {
        trm: update.searchTerm,
        src: update.sourceLocale,
        trg: update.targetLocale
      };
    });

    // const response = await fetch('http://localhost:3007/searchLog', {
    const response = await fetch(searchLogApi, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: reqRows,
        mod: 'RAW',
        sheet: 'rawdata'
      })
    });

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      const syncTime = new Date();
      toSend.forEach(row => row.synced = syncTime.toISOString());
      await db.transaction('rw', db.searchLog, async () => {
        await db.searchLog.bulkDelete(toSend.map(n => n.id));
      });

      return notifyClients();
    }

    return Promise.reject('sync failed: ' + response.status);
  }

  async function notifyClients() {
    const clients = await self.clients.matchAll({includeUncontrolled: true});
    for (const client of clients) {
      client.postMessage('sync_finished');
    }
  }

}());
