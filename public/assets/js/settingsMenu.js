document.addEventListener('DOMContentLoaded', () => {
    // Assume USER is globally available
    const dozyCheckbox = document.getElementById('toggle-dozy');
    const henCheckbox = document.getElementById('toggle-henrietta');
  
    // Unlock checkboxes based on level
    if (USER.level >= 1) dozyCheckbox.disabled = false;
    if (USER.level >= 2) henCheckbox.disabled = false;
  
    // Initialize checkboxes based on user data
    dozyCheckbox.checked = USER.animal=== 'dozy' || false;
    henCheckbox.checked = USER.animal==='henrietta' || false;
  
    // Toggle time format
    document.getElementById('toggle-format').addEventListener('click', () => {
      USER.timeFormat = USER.timeFormat === '12hr' ? '24hr' : '12hr';
      console.log('Time format set to:', USER.timeFormat);
    });
  
    // Save button
    document.getElementById('save-settings').addEventListener('click', () => {
      USER.animals ='dozy'
      fetch('/updateUserSettings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(USER)
      })
      .then(res => res.json())
      .then(data => {
        alert('Settings updated!');
        window.location.reload(); // Optional: Refresh game to reflect changes
      })
      .catch(err => {
        console.error('Update failed', err);
      });
    });
  });
  