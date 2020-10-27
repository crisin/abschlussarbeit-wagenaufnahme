self.addEventListener('sync', (event) => {
  console.log('sync event', event);
  if (event.tag === 'syncAttendees') {
    event.waitUntil(console.log('NOW IM DOING STUFF')); // sending sync request
  }
});

